const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const todoSchema = mongoose.Schema({
    todo:{
        type:String,
        required:true
    },
    todoBy:{
        type:ObjectId,
        required:true
    }
})

module.exports = mongoose.model('Todo',todoSchema);