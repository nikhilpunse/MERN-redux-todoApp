import React, { useEffect, useState } from 'react'
import { createTodo,fetchTodo,deleteTodo } from '../reducers/todoReducer';
import { useSelector,useDispatch } from 'react-redux/es/exports';
import {logOut} from '../reducers/authReducer';

const Todo = () => {
    const [myTodo,setMyTodo] = useState('');
    const dispatch = useDispatch();
    const todos = useSelector(state=>state.todos);
    const addTodo = ()=>{
        dispatch(createTodo({todo:myTodo}))
        setMyTodo('');
    }

    useEffect(()=>{
        dispatch(fetchTodo());
    },[]);

    
  return (
    <div className='main_div'>
        <input 
            type="text"
            placeholder='Enter todo here'
            value={myTodo}
            
            onChange={(e)=>setMyTodo(e.target.value)}
        /> <br />
        <button 
            className='btn' 
            onClick={()=>addTodo()}>Add Todo
        </button>
        
        <button
        onClick={()=>dispatch(logOut())} 
        style={{marginLeft:'20px'}}
        className='btn'>Log out</button>

        <ul className="collection">
            { todos.map(item=>{
                return <li className="collection-item"
                onClick={()=>dispatch(deleteTodo(item._id))} key={item._id}>{item.todo}</li>
            })}
        </ul>
        
    </div>
  )
}

export default Todo