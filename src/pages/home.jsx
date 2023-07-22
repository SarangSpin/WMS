import React, {useState, useEffect} from "react";
import Navbar from "./navbar";
import {useErrorBoundary } from "react-error-boundary";
import { Link, useNavigate } from "react-router-dom";
import  Axios from "axios";

const Home = () => {
    const {showBoundary} = useErrorBoundary()
  const [logUser, setloguser] = useState(null)
    const navigate = useNavigate()
    useEffect(()=>{
        Axios({
            method: 'GET',
            url: 'http://localhost:5000/user',
            withCredentials: true
        }).then((res)=>{
          if(res.data.err){
            showBoundary(res.data.err)
          }
            if(res.data){
                setloguser(res.data)
                console.log(res.data)
            }
            
        }, [])
        .catch((err)=> showBoundary(err))
       
    
        
    }, [])

    const Appl = () =>{
        return (<div><Link to={'/appl1'}>Apply for an event</Link></div>)
    }
    
    return(
        <>
        <Navbar loguser = {logUser} />
        <div>
            <div>Welcome to Home page!</div>
        <div>{Appl()}</div>
        
        </div>
        </>
        
        
    )
}

export default Home;
