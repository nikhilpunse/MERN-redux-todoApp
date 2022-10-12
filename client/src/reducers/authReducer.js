import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { fetch2 } from "../helpers/fetch2";

const initialState = {
    token:"",
    loading:false,
    error:""
}

export const singnupUser = createAsyncThunk(
    'signupuser',
    async (body)=>{
      const result = await fetch2('/signup',body)
      return result
    }
)
export const singninUser = createAsyncThunk(
    'signinuser',
    async (body)=>{
      const result = await fetch2('/signin',body)
      return result
    }
)

const authReducer = createSlice({
    name:"user",
    initialState,
    reducers:{
        addToken:(state,action)=>{
            state.token = localStorage.getItem('token');
        },
        logOut:(state,action)=>{
            state.token = null;
            localStorage.removeItem('token');
        }
    },
    extraReducers:{
        [singnupUser.fulfilled]:(state,{payload:{error,message}})=>{
            state.loading = false;
            if(error){
                state.error = error;
            }else{
                state.error = message;
            }
        },
        [singnupUser.pending]:(state,action)=>{
            state.loading = true;
        },
        [singninUser.fulfilled]:(state,{payload:{error,token}})=>{
            state.loading = false;
            if(error){
                state.error = error;
            }else{
                state.token = token;
                localStorage.setItem('token',token);
            }
        },
        [singninUser.pending]:(state,action)=>{
            state.loading = true;
        }
    }
});

export const {addToken,logOut} = authReducer.actions;
export default authReducer.reducer;