import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import  Axios from "axios";
import {useErrorBoundary } from "react-error-boundary";
import Navbar from "./navbar"
import './htmlfiles/applications(css)/sub_event_display.css'

const SubEventDisplay = ()=>{

    const[subEvent, setSubEvent] = useState({})
    const {showBoundary} = useErrorBoundary()
    const [logUser, setloguser] = useState(null)
   const setid = useLocation()
   
  
    const navigate = useNavigate()
  
    useEffect(()=>{
      Axios({
          method: 'GET',
          url: 'http://153.92.5.199:5000/user',
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

      const id = setid.state

      Axios({
        method: 'GET',
        url: `http://153.92.5.199:5000/sub_event/${id}`,
        withCredentials: true
      }).then(
        (res)=>{
          console.log(res.data.data)
          setSubEvent(res.data.data[0])
        }
      )
     
  
      
  }, [])

    return(

        <><Navbar loguser={logUser} /><div>

            <div className="header">{subEvent.name}</div>
            <div className="content">
                <div className="description">{subEvent.description !== null ? subEvent.description : ''}</div>
                <div className="pop">{subEvent.population}</div>
                <div className="eventDate">{subEvent.event_date}</div>
                <div className="time">{subEvent.start_time} - {subEvent.end_time}</div>
            </div>

        </div></>
    );
}

export default SubEventDisplay
