import React, { useEffect, useState } from "react";
import './htmlfiles/applications(css)/subeventPage.css'
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import  Axios from "axios";
import {useErrorBoundary } from "react-error-boundary";
import Navbar from "./navbar";
import { Link } from "react-router-dom";


const SubEvent = () => {


  const [subEvents, setSubEvents] = useState([]);

 const {showBoundary} = useErrorBoundary();
  const [logUser, setloguser] = useState(null);
  
  const [flash, setflash] = useState(null);
  var stateVar = useLocation()
  var appl_id = null
  const stateData = stateVar.state
  appl_id = stateData

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
            console.log(res.data.data)
            setSubEvents(res.data.data)
            const renderComp = res.data.data.map((value)=>{
              return(
                <div>
        <div className="card">
          <div className="img">
            <img src="" alt="" />
          </div>
          <div className="content">
            <div className="subEventname">{value.name}</div>
            <div className="eventDate">{value.event_date}</div>
            <div className="time">{value.start_time} - {value.end_time}</div>
          </div>
          <div>
            
            <Link to={`/sub_event/show`} state= {value.sub_event_id} >View More</Link>
            
          </div>
        </div>
        </div>
              )
            })
            setSubEvents(renderComp)
            
            
            
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
    <div className="main">
        <Navbar loguser = {logUser} />
        <div className="Container">
        <div className="title"><h1 className="titlename">Sub-Events</h1></div>
        <div>{subEvents}</div>
        

        <button onClick={handleSubmit}>Add Sub Event</button>
        </div>
        


    </div>
  )
}

export default SubEvent;