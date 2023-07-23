import React, { useEffect, useState } from "react";
import './htmlfiles/applications(css)/application3.css'
import { useNavigate, useSearchParams } from "react-router-dom";
import  Axios from "axios";
import {useErrorBoundary } from "react-error-boundary";
import Navbar from "./navbar";

const Appln2 =() =>{

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
        else{
          navigate('/login')    
            alert('You need to login first')
        }
    }, [])
    .catch((err)=> showBoundary(err))
   

    
}, [])

    const [event, setEvent] = useState(null);
    const [cusEvent, setCusEvent] = useState(null);
    const [description, setDescription] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [population, setPopulation] = useState(0);
    const [budget, setBudget] = useState(null);
    const [cusLowBudget, setCusLowBudget] = useState(0);
    const [cusHighBudget, setCusHighBudget] = useState(0);
    const [flash, setflash] = useState(null);

    const [setapplid] = useSearchParams()
    const appl_id = setapplid.get('applid')

    //const [data2, setdata2] = useState(null)
    
    // Function to handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      // Perform any necessary actions with the form data
      
      let data2 = [
        event,
        population,
        budget,
        startDate,
        endDate
      ]
      
      console.log(data2)
      if (data2.includes(null)){
        setflash('Fill the required fields')
        navigate('/appl2')
  
      }
      else{
        const newAppl = {
            event_: event,
            cusEvent: cusEvent,
            description_: description,
            startDate: startDate,
            endDate: endDate,
            population: population,
            budget: budget,
            cusLowBudget: cusLowBudget,
            cusHighBudget: cusHighBudget,
            applid: appl_id
          };
          Axios({
            method: 'POST',
            url: 'http://localhost:5000/appl2',
            withCredentials: true,
            data: newAppl
        }).then(res=>{
          if(res.data.status){
            alert('Application part 2 successfully registered, if part 1 is missing, please fill in the same')
            
          }
        })
      }
    };
  
    return (
      <>
      <Navbar loguser = {logUser} />
      <div>
        <div style={{color: 'red'}}>{flash}</div>
        <h1 className="event-title">Event Details</h1>
        <br/><br/>
        <form >
          {/* Event type */}
          <div className="input-container">
            <label htmlFor="event"><span className="bold-text">Choose the type of event:</span></label>
            <select name="event" id="event" value={event} onChange={(e) => setEvent(e.target.value)} required>
              <option value="wedding">Wedding</option>
              <option value="corporate">Corporate Event</option>
              <option value="party">Party</option>
              <option value="custom">---</option>
              <option value="custom">Custom</option>

            </select>
          </div>
          <br/>
          <br/>
          {/* Custom event */}
          {event === 'custom' ? (
            <div>
            <div className="input-container">
              <label htmlFor="cus-event"><span className="bold-text">If Custom enter the type of event</span></label>
              <input type="text" name="cus-event" id="cus-event" value={event} required onChange={(e) => setCusEvent(e.target.value)} />
            </div>
            {/* Event description */}
          <div className="input-container">
            <label htmlFor="description"><span className="bold-text">If Custom give some description of event</span></label><br/><br/>
            <input type="text" name="description" id="description" required value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
            </div>
            
          ): (<></>)}
          
          
          <br/><br/>
          {/* Event dates */}
          <div className="input-container">
            <span className="bold-text">Enter Preferred dates of the event</span><br/>
            <label htmlFor="s-date">From</label>
            <input type="date" name="s-date" id="s-date" defaultChecked={null} onChange={(e) => setStartDate(e.target.value)} required/>
            <label htmlFor="e-date">To</label>
            <input type="date" name="e-date" id="e-date" defaultChecked={null} onChange={(e) => setEndDate(e.target.value)} required/>
          </div>
          
          {/* Population */}
          <div className="input-container">
            <label htmlFor="population"><span className="bold-text">Enter rough Turn-Up</span><br/></label>
            <input type="number" name="population" id="population" value={population}  onChange={(e) => setPopulation(e.target.value)} required/>
          </div>
          <br/>
          <br/>
          {/* Budget */}
          <div className="input-container">
            <label htmlFor="budget"><span className="bold-text">Choose the rough budget:</span></label>
            <select name="budget" id="budget"  value={budget} onChange={(e) => setBudget(e.target.value)} required>
              <option value="0-5">0-5 lakhs</option>
              <option value="5-10">5-10 lakhs</option>
              <option value="10-25">10-25 lakhs</option>
              <option value="custom">Custom</option>
            </select>
            <br/>
            <br/>
            {/* Custom budget */}
            {budget === 'custom' ? (
              <div>
                <span className="bold-text">If custom enter the rough custom budget (in lakhs)<br/><br/></span>
                <input type="number" required name="cus-l-budget" id="cus-l-budget" value={cusLowBudget} onChange={(e) => setCusLowBudget(e.target.value)} />
                -
                <input type="number" name="cus-h-budget" id="cus-h-budget" value={cusHighBudget} onChange={(e) => setCusHighBudget(e.target.value)} />
              </div>
            ): (<></>)}
          </div>
          <br/>
          <br/>
          {/* Submit button */}
          <div className="input-container">
            <input type="submit" value="Submit" onClick={e=>handleSubmit(e)}/>
          </div>
        </form>
      </div>
      </>
    );
  }

  export default Appln2;
  
