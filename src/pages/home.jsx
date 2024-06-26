import React, {useState, useEffect} from "react";
import Navbar from "./navbar";
import {useErrorBoundary } from "react-error-boundary";
import { Link, useNavigate } from "react-router-dom";
import  Axios from "axios";
import './htmlfiles/home.css'

const Home = () => {
    const {showBoundary} = useErrorBoundary()
  const [logUser, setloguser] = useState(null)
    const navigate = useNavigate()
    useEffect(()=>{
        Axios({
            method: 'GET',
            url: 'http://153.92.5.199:5000/user',
            withCredentials: true
        }).then((res)=>{
          if(res.data.err){
		  console.log(res.data.err)
            showBoundary(res.data.err)
          }
            if(res.data){
                setloguser(res.data)
                console.log(res.data)
            }
            
        }, [])
        .catch((err)=>showBoundary(err))
       
    
        
    }, [])

    const Appl = () =>{
        return (<div><Link className="link" to={'/appl1'}>Apply for an event</Link></div>)
    }
    
    return(
        <>
        <Navbar loguser = {logUser} />
        <div className="content">
        <div className="title">Welcome to Home page!</div>
        <div className="apply">{Appl()}</div>
        
        </div>
        </>
        
        
    )
}

export default Home;
