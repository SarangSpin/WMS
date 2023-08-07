import React from 'react'
import  { useEffect, useState } from "react";
import './htmlfiles/applications(css)/application3.css'
import { useNavigate, useSearchParams } from "react-router-dom";
import  Axios from "axios";
import {useErrorBoundary } from "react-error-boundary";
import Navbar from "./navbar";
const Task = () => {
    const {showBoundary} = useErrorBoundary();
    const [logUser, setloguser] = useState(null);
    const [task, setTask] = useState(null);
    const [description,setDescription]=useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [taskDate, settaskDate] = useState(null);
    
    const [flash, setflash] = useState(null);
    const [setapplid] = useSearchParams();
      const appl_id = setapplid.get('applid')
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
              else{
                navigate('/login')    
                  alert('You need to login first')
              }
          }, [])
          .catch((err)=> showBoundary(err))
         
      
          
      }, [])
  
    
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Perform any necessary actions with the form data
      
      let data4 = [
        task,
        startTime,
        endTime,
        description
        
      ]
      
      console.log(data4)
      if (data4.includes(null)){
        setflash('Fill the required fields')
        navigate('/appl4')
  
      }
      else{
        const newAppl = {
          task: task,
            description: description,
            startTime: startTime,
            endTime: endTime,
            applid: appl_id

          };
          Axios({
            method: 'POST',
            url: 'http://localhost:5000/appl3',
            withCredentials: true,
            data: newAppl
        }).then(res=>{
          if(res.data.status){
            alert('Your SubEvent is successfully registered')
            
          }
        })
      }
    };
    return (
      <>
          <Navbar loguser = {logUser} />
          <div>
              <div style={{color: 'red'}}>{flash}</div>
              <h1 className="event-title">Task Details</h1>
              <form >
            {/* Event type */}
            <div className="input-container">
              <label htmlFor="subevent"><span className="bold-text">Choose the type of task:</span></label>
              <select name="subevent" id="subevent" value={task} onChange={(e) => setTask(e.target.value)} required>
                {/* <option value="food">Food</option>
                <option value="muhurtham">Muhurtham</option>
                <option value="reception">Reception</option>
                <option value="custom">---</option> */}
                <option value="custom">Custom</option>
  
              </select>
            </div>
            <br/>
            <br/>
            {/* Custom event */}
            {task === 'custom' ? (
              <div>
              <div className="input-container">
                <label htmlFor="cus-task"><span className="bold-text">If Custom enter the type of task</span></label>
                <input type="text" name="cus-task" id="cus-task" value={task} required onChange={(e) => setTask(e.target.value)} />
              </div>
              {/* Event description */}
            <div className="input-container">
              <label htmlFor="description"><span className="bold-text">If Custom give some description of task</span></label><br/><br/>
              <input type="text" name="description" id="description" required value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
              </div>
              
            ): (<></>)}
            
            
           
            
            <br/><br/>
            {/* Event Timings */}
            <div className="input-container">
              <span className="bold-text">Enter Timings of the task</span><br/>
              <label htmlFor="s-time">From</label>
              <input type="time" name="s-time" id="s-time" defaultChecked={null} value={startTime} onChange={(e) => setStartTime(e.target.value)} required/>
              <label htmlFor="e-time">To</label>
              <input type="time" name="e-time" id="e-time" defaultChecked={null} value={endTime} onChange={(e) => setEndTime(e.target.value)} required/>
            </div>
            {/* Submit button */}
            <div className="input-container">
              <input type="submit" value="Submit" onClick={e=>handleSubmit(e)}/>
            </div>
          </form>
          </div>
  
      </>
    )
}

export default Task;