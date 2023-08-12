import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import  Axios from "axios";
import {useErrorBoundary } from "react-error-boundary";
import Navbar from "./navbar";
import { Link } from "react-router-dom";


const PlannerSubEvent = ()=>{

    const {showBoundary} = useErrorBoundary()
    const [logUser, setloguser] = useState(null)
    const [subEvents, setSubEvents] = useState([]);
    const setvalue = useLocation()
    var appl_id;
    appl_id = setvalue.state;

   
  
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
            if(res.data.client == "no"){
              if(res.data.designation !== "Planner"){
                navigate('/')
              }
            }
            else{
              navigate('/')
            }
            
          }
          else{
            navigate('/login')    
              alert('You need to login first')
          }
      })
      .catch((err)=> showBoundary(err))


      

      
      Axios({
        method: 'GET',
        url: `http://localhost:5000/sub_event?applid=${appl_id}`,
        withCredentials: true
      }).then(
        (res)=>{
          console.log(res.data.data)
          setSubEvents(res.data.data)
          
          const renderComp = res.data.data.map((valueSub)=>{

            return(
              <div>
      <div className="card">
        <div className="img">
          <img src="" alt="" />
        </div>
        
        <div className="content">
        <div className="subEventname">{valueSub.sub_event_id}</div>
          <div className="subEventname">Event-{valueSub.name}</div>
          <div className="eventDate">Date - {valueSub.event_date.substring(0,10)}</div>
          <div>Description - {valueSub.description}</div>
          <div>Turn Up(Approx) - {valueSub.population}</div>
          <div className="time">Timings: {valueSub.start_time} - {valueSub.end_time}</div>
        </div>
        <div className="tasks"> 
        <Link to={'/planner/show/sub_events/tasks'} state={valueSub.sub_event_id}>View Tasks</Link>
        </div>
        <div>
            <Link to={'/planner/show/sub_events/add_task'} state={valueSub.sub_event_id}>Add Task</Link>
        </div>
        <div>
          
          
        </div>
      </div>
      </div>
            )
          })
          setSubEvents(renderComp)
          
          
          
        }
      )

      

      
      

        
    }, [])
    
      console.log(appl_id)
    
      return (
        <>
        <Navbar loguser = {logUser} />
        <h1>Sub-Events</h1>
        <div>{subEvents}</div>

        </>
      );
}

export default PlannerSubEvent;