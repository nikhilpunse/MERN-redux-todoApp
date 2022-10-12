import React, { useEffect } from 'react';
import './App.css';
import Auth from './components/Auth';
import Todo from './components/Todo';
import { addToken } from './reducers/authReducer';
import { useSelector,useDispatch } from 'react-redux';

function App() {
const condition = '';
const token = useSelector(state=>state.user.token);
const dispatch = useDispatch();

useEffect(()=>{
  dispatch(addToken());
},[condition]);


  return (
    <div className="App">
      {token?<Todo/>:<Auth/>} 
      
    </div>
  );
}

export default App;
