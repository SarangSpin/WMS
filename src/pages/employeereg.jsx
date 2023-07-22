import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios'
import {useErrorBoundary } from "react-error-boundary";
import Navbar from './navbar';
import './Admin/employeereg.css';


const EmployeeReg = () =>{
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
          if(res.data.admin_status !== "true"){
            
            navigate('/')
            
          }
        }
        else{
          navigate('/login')    
            alert('You need to login first')
        }
    }, [])
    .catch((err)=> showBoundary(err))
   

    
}, [])



    const Logout = (e) => {
        e.preventDefault()
        
        
        Axios({
            method: 'POST',
            url: 'http://localhost:5000/logout',
            withCredentials: true
        }).then((res)=>{
            console.log(res.data.message)
            setloguser(null)
            
            navigate('/')})
        .catch((err)=> showBoundary(err))



    }

   

    return(
      <>
      <Navbar loguser = {logUser} />
        
        </>
      );

}

export default EmployeeReg