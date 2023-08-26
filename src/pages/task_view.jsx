import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import  Axios from "axios";
import {useErrorBoundary } from "react-error-boundary";
import Navbar from "./navbar";
import { Link } from "react-router-dom";


const TaskView = () =>{
    const setvalue = useLocation()
    var sub_event_id;
    sub_event_id = setvalue.state;
    const {showBoundary} = useErrorBoundary()
    const [logUser, setloguser] = useState(null)
    const [tasks, settasks] = useState([])
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
        url: `http://153.92.5.199:5000/tasks?id=${sub_event_id}`,
        withCredentials: true
      }).then(
        (res)=>{
            console.log(res.data.data)
          settasks(res.data.data)
          
          const renderComp = res.data.data.map((valueSub)=>{
            return(
              <div>
      <div className="card">
        <div className="img">
          <img src="" alt="" />
        </div>
        
        <div className="content">
        <div className="subEventname">{valueSub.task_id}</div>
          <div className="subEventname">Name - {valueSub.task_name}</div>
          <div>Description - {valueSub.description}</div>
          <div className="time">Deadline: {valueSub.deadline}</div>
          <div className="time">Status: {valueSub.status}</div>
        </div>
      </div>
      </div>
            )
          })
          settasks(renderComp)
          
        }
      )
    }, [])

    return(
        <>
        <Navbar loguser = {logUser} />
        <h1>Tasks</h1>
        <div>{tasks}</div>
        </>
    );
}

export default TaskView;