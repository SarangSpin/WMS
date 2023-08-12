import Axios  from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import './htmlfiles/applications(css)/application3.css'


const SubEventForm = () => {

    const [subEvent, setsubEvent] = useState(null);
  const [description,setDescription]=useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [eventDate, seteventDate] = useState(null);
  const [population, setPopulation] = useState(0);
  const [flash, setflash] = useState(null);
  const [setapplid] = useSearchParams()
  var appl_id = null
  var stateVar = useLocation()
  const stateData = stateVar.state
  const navigate = useNavigate()

  useEffect(()=>{
    console.log(stateVar.state)
    
    if(stateVar.state == '' || stateVar.state == null){
      navigate('/appl1')
    }
  }, [])
  function formatDate(inputDate) {
    const dateParts = inputDate.split('-');
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];
    return `${year}-${month}-${day}`;
}

function formatTime(inputTime) {
  const timeParts = inputTime.split(':');
  const hour = timeParts[0];
  const minute = timeParts[1];
  return `${hour}:${minute}:00`;
}


  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any necessary actions with the form data
    
    
    let data3 = [
      subEvent,
      population,
      eventDate,
      startTime,
      endTime,
    ]
    
    console.log(data3)
    if (data3.includes(null)){
      setflash('Fill the required fields')
      navigate('/sub_event/form',{
        state:
          stateData
        
      })

    }
    else{
      const newAppl = {
        subEvent_: subEvent,
        
          description_: description,
          startTime: startTime,
          endTime: endTime,
          population: population,
          eventDate: eventDate,
          applid: stateData
        };
        Axios({
          method: 'POST',
          url: 'http://localhost:5000/sub_event',
          withCredentials: true,
          data: newAppl
      }).then(res=>{
        if(res.data.status){
          alert('Your SubEvent is successfully registered')
          navigate(`/sub_event`,{
            state:
              stateData
            
          })
        }
      })
    }
  };

    return(

        <div>
          
            <div style={{color: 'red'}}>{flash}</div>
            <h1 className="event-title">Sub-Event Details</h1>
            <form >
          {/* Event type */}
          <div className="input-container">
            <label htmlFor="subevent"><span className="bold-text">Choose the type of sub-event:</span></label>
            <select name="subevent" id="subevent" value={subEvent} onChange={(e) => setsubEvent(e.target.value)} required>
            <option value="custom">---</option>
            
              <option value="food">Food</option>
              <option value="muhurtham">Muhurtham</option>
              <option value="reception">Reception</option>
              <option value="custom">Custom</option>
              
              

            </select>
          </div>
          <br/>
          <br/>
          {/* Custom event */}
          {subEvent === 'custom' ? (
            <div>
            <div className="input-container">
              <label htmlFor="cus-event"><span className="bold-text">If Custom enter the type of event</span></label>
              <input type="text" name="cus-event" id="cus-event" value={subEvent} required onChange={(e) => setsubEvent(e.target.value)} />
            </div>
            {/* Event description */}
          <div className="input-container">
            <label htmlFor="description"><span className="bold-text">If Custom give some description of event</span></label><br/><br/>
            <input type="text" name="description" id="description" required value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
            </div>
            
          ): (<></>)}
          
          
          <br/><br/>
          {/* Event date */}
          <div className="input-container">
            <span className="bold-text">Enter Preferred dates of the event</span><br/>
            
            <input type="date" name="date" id="date" value={eventDate} defaultChecked={null} onChange={(e) => seteventDate(formatDate(e.target.value))} required/>
          </div>
          
          {/* Population */}
          <div className="input-container">
            <label htmlFor="population"><span className="bold-text">Enter rough Turn-Up</span><br/></label>
            <input type="number" name="population" id="population" value={population}  onChange={(e) => setPopulation(e.target.value)} required/>
          </div>
          <br/><br/>
          <div className="input-container">
            <label htmlFor="image"><span className="bold-text">Upload images for reference (optional)</span><br/></label>
            <input type="file" name="image" id="population" required/>
          </div>
          <br/><br/>
          {/* Event Timings */}
          <div className="input-container">
            <span className="bold-text">Enter Timings of the event</span><br/>
            <label htmlFor="s-time">From</label>
            <input type="time" name="s-time" id="s-time" defaultChecked={null} value={startTime} onChange={(e) => setStartTime(formatTime(e.target.value))} required/>
            <label htmlFor="e-time">To</label>
            <input type="time" name="e-time" id="e-time" defaultChecked={null} value={endTime} onChange={(e) => setEndTime(formatTime(e.target.value))} required/>
          </div>
          {/* Submit button */}
          <div className="input-container">
            <input type="submit" value="Submit" onClick={e=>handleSubmit(e)}/>
          </div>
        </form>
        </div>

    );
}

export default SubEventForm;