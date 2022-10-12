const express = require('express');
const mongoose = require('mongoose');
const PORT = 5000;
const app = express();
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'hello';
const Todo = require('./models/todo');

mongoose.connect('mongodb+srv://Nikhilpunse:9RUYkG8PoRlsZO2n@cluster1.vua4q4o.mongodb.net/tododb?retryWrites=true&w=majority');

mongoose.connection.on('connected',()=>{
    console.log('conected to db successfuly')
});
mongoose.connection.on('error',(err)=>{
    console.log('error',err);
})



app.get('/',(req,res)=>{
    res.json({massage: 'hello world'})
});

app.use(express.json());

//middleware for login
const loginRequire = (req,res,next)=>{
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({message:'you must loggin'})
    }
    const userId = jwt.verify(authorization,JWT_SECRET);
    req.user = userId;
    next();
}

app.get('/test',loginRequire,(req,res)=>{
    res.json({massage:req.user});
});

app.post('/createtodo',loginRequire,async (req,res)=>{
    const todo =await req.body.todo;
    
    if(!todo){
        return res.status(404).json({message:'pls provide some input.'})
    }
    const data = await new Todo({
        todo:req.body.todo,
        todoBy:req.user.userId
    }).save();
    res.status(200).json({message:data});
})

app.get('/gettodo',loginRequire,async (req,res)=>{
    
    const data =await Todo.find({todoBy:req.user.userId})
    res.status(200).json({message:data});
})

app.delete('/removeTodo/:id',loginRequire,async (req,res)=>{
    try {
        const data =await Todo.findByIdAndDelete({
            _id:req.params.id
        })
        res.status(200).json({message:data})
        
    } catch (error) {
        console.log(error);
    }
    
})


app.post('/signup', async (req,res)=>{
    const {email,password} = req.body;
    console.log(req.body);

    try {
        
        if(!email || !password){
            return res.status(422).json({message : 'please enter all field.'})
        }
        const user = await User.findOne({email});
        if(user){
        return res.status(200).json({message : 'user already present with this email.'});
        }

        const hashPass = await bcrypt.hash(password,12);
        
        await new User({
            email,
            password: hashPass
        }).save();
        res.status(200).json({message:'user signup successful. you can login'})
        
    } catch (error) {
        console.log('error',error);
    }
});


app.post('/signin',async (req,res)=>{
    const {email,password} = req.body;

    try{

        if(!email || !password){
        return res.status(422).json({message: 'please enter all field'});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message:'user not exist with this email'})
        }
        const doMatch = await bcrypt.compare(password,user.password);
        
        if(doMatch){
            const token = jwt.sign({userId:user._id},JWT_SECRET);
            res.status(201).json({token});

        }else{
            return res.status(123).json({message:'user or password does not match.'})
        }

    }catch(err){
        console.log('error',err);
    }
});



app.listen(PORT,()=>{
    console.log(`listening to port ${PORT}`);
})