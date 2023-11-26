import React, { useState } from 'react';
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {loginFail,clearError} from "./redux/eventSlice"
export default function Login(){
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()   
    const navigate =useNavigate()
    const dispatch=useDispatch(); 
    const {error}=useSelector(state=>state.events)
    useEffect(()=>{
        if(error){
            toast(error,{
                position:toast.POSITION.BOTTOM_CENTER,
                type:"error",
                onOpen:()=>{dispatch(clearError())}
                
            })
            return
        }
    },[error,dispatch])
    const onSubmit=(e)=>{
        e.preventDefault()
        axios.post("http://localhost:3002/login",{email,password})
        .then(result=>{console.log(result)
            toast(result.data ,{
                position:toast.POSITION.BOTTOM_CENTER,
                type:"error",
                
            })
        if(result.data === "Success"){
            navigate("/create")
        }})
        
        .catch(err=>{console.log(err) 
            toast(err,{
                position:toast.POSITION.BOTTOM_CENTER,
                type:"error",
                
            })
}
)
    }
    
    return(
        <>
        <form onSubmit={onSubmit}> 
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email"/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input name="password" type="password" className="form-control"  id="exampleInputPassword1" onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
        </>
    )
}