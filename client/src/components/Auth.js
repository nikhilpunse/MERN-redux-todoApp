import React, { useState } from 'react';
import { singnupUser,singninUser } from '../reducers/authReducer';
import { useDispatch,useSelector } from 'react-redux';


const Auth = () => {
    const [email,setEmail] = useState('');
    const [password,sePassword] = useState('');
    const dispatch = useDispatch();
    const {loading,error} = useSelector(state=>state.user);
    const [auth,setAuth] = useState('Sign in');
    const authentication = ()=>{
         if(auth === 'Sign in'){
            dispatch(singninUser({email,password}))
         }else{
            dispatch(singnupUser({email,password}))
         }
    }

  return (
    <div>
      {loading &&  
      <div className="progress">
         <div className="indeterminate"></div>
      </div>}

        <h1> Please {auth}</h1>
        {error && 
        <h5>{error}</h5>}
        <input style={{width:'40%'}}
            type="text"
            name='email'
            placeholder='Enter Email'
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
         /> <br />
         <input  style={{width:'40%'}}
            type="text"
            name='password'
            placeholder='Enter Password'
            onChange={(e)=>sePassword(e.target.value)}
            value={password}
         />
         {auth === 'Sign in' ?
            <h6 onClick={()=>setAuth('Sign up')} >Dont have Account?</h6> :
            <h6 onClick={()=>setAuth('Sign in')} >Already have Account?</h6>
         }
         <button onClick={()=>authentication()} className='btn'>{auth}</button>
    </div>
  )
}

export default Auth;