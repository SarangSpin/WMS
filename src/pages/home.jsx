import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from 'axios'
import {useErrorBoundary } from "react-error-boundary";

const Home = () => {
const {showBoundary} = useErrorBoundary()

    const [loguser, setloguser] = useState(null)
    const[flash, setflash] = useState(null)
    const navigate = useNavigate()
    useEffect(()=>{
        const user = async() => {
        Axios({
            method: 'GET',
            url: 'http://localhost:5000/user',
            withCredentials: true
        }).then((res)=>{
            if(res.data.err){
                showBoundary(res.data.err)
              }else{
            if(res.data){
                
                setloguser(res.data)
            }
            else{
                setloguser(null)
                
            }}
        })
        .catch((err)=> showBoundary(err))
        }
        user()
    }, [])

    const Login = () =>{
        if(loguser === null){
            
            return( <div><Link to={'/login'}>Login</Link></div>)
        }
        else{
            
            return null
        }
    }

    const Logout = (e) => {
        e.preventDefault()
        
        
        Axios({
            method: 'POST',
            url: 'http://localhost:5000/logout',
            withCredentials: true
        }).then((res)=>{
            console.log(res.data.message)
            setloguser(null)
            setflash(res.data.flash)
            navigate('/')})
        .catch((err)=> showBoundary(err))



    }

    const logOut = () =>{
        
        if(loguser === null){
            
            return null
        }
        else{

            return (<div><a href = '/' onClick={e=>Logout(e)}>Logout</a></div>)
        }
    }

    const Register = () => {
        return (<div><Link to={'/register'}>Register</Link></div>)
    }

    const Showuser = () => {
        if(loguser === null){
            
            return null
        }
        else{
            return loguser.username
            
        }
    }

    const Appl = () =>{
        return (<div><Link to={'/appl1'}>Apply for an event</Link></div>)
    }
    
    return(
        <div>
            
            <div>Welcome to Home page! {Showuser()}</div>
        <div>{Login()}</div>
        <div>{Register()}</div>
        <div>{logOut()}</div>
        <div>{Appl()}</div>
        <div style={{color:'blue'}}>{flash}</div>
        </div>
        
    )
}

export default Home;
