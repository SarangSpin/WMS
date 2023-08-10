import React, { useEffect, useState } from "react";
import './htmlfiles/applications(css)/application3.css'
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import  Axios from "axios";
import {useErrorBoundary } from "react-error-boundary";
import Navbar from "./navbar";

const SubEvent = () => {

  

 const {showBoundary} = useErrorBoundary();
  const [logUser, setloguser] = useState(null);
  
  const [flash, setflash] = useState(null);
  var stateVar = useLocation()
  var appl_id = null
  const stateData = stateVar.state

    const navigate = useNavigate()
    useEffect(()=>{
      console.log(stateVar.state)
    
    if(stateVar.state == '' || stateVar.state == null){
      navigate('/appl1')
    }

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
            else{
              navigate('/login')    
                alert('You need to login first')
            }
        }, [])
        .catch((err)=> showBoundary(err))

        Axios({
          method: 'GET',
          url: `http://localhost:5000/sub_event?applid=${appl_id}`,
          withCredentials: true
        }).then(
          (res)=>{
            console.log(res)
          }
        )
       
    
        
    }, [])

    const handleSubmit = (e) => {
      e.preventDefault();
      
      navigate('/sub_event/form', {
        state:
          stateData
        
      });

    }

  

  
  return (
    <>
        <Navbar loguser = {logUser} />
        <div><h1>Sub-Events</h1></div>


        <div className="card">
          <div className="img">
            <img src="" alt="" />
          </div>
          <div className="content">
            <div className="subEventname"></div>
            <div className="eventDate"></div>
          </div>
        </div>

        <button onClick={handleSubmit}>Add Sub Event</button>
        


    </>
  )
}

export default SubEvent;