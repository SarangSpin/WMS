import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from 'axios'


const Home = () => {
    const [loguser, setloguser] = useState(null)
    const navigate = useNavigate()
    useEffect(()=>{
        const user = async() => {
        await Axios({
            method: 'GET',
            url: 'http://localhost:5000/user',
            withCredentials: true
        }).then((res)=>{
            if(res.data == null){
                setloguser(null)
            }
            else{
                setloguser(res.data)
                
            }
        })
        }
        user()
    }, [])

    const Login = () =>{
        if(loguser == null){
            
            return( <div><Link to={'/login'}>Login</Link></div>)
        }
        else{
            
            return null
        }
    }

    const Logout = (e) => {
        e.preventDefault()
        setloguser(null)
        
        Axios({
            method: 'POST',
            url: 'http://localhost:5000/logout',
            withCredentials: true
        }).then((res)=>{
            console.log(res)
            navigate('/')})


    }

    const logOut = () =>{
        
        if(loguser == null){
            
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
        if(loguser == null){
            
            return null
        }
        else{
            return loguser.username
            
        }
    }
    return(
        <div>
            <div>Welcome to Home page! {Showuser()}</div>
        <div>{Login()}</div>
        <div>{Register()}</div>
        <div>{logOut()}</div>
        </div>
        
    )
}

export default Home;
