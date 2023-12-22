import React, { useEffect, useState } from "react";
import './htmlfiles/applications(css)/application3.css'
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import  axios from "axios";
import {useErrorBoundary } from "react-error-boundary";
import Navbar from "./navbar";
import  Axios  from "axios";
import DOMPurify from 'dompurify';

const Appln2 =() =>{
  function formatDate(inputDate) {
    const dateParts = inputDate.split('-');
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];
    return `${year}-${month}-${day}`;
}

  const {showBoundary} = useErrorBoundary()
  const [logUser, setloguser] = useState(null)
  const [selectedImage, setSelectedImage] = useState([]);
  const [images, setimages] = useState(null)

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    
    var selectedFilesArray = Array.from(selectedFiles);
    var flag=false;
    selectedFilesArray.forEach((x)=>{
      
      console.log(x)
      if(x.type == 'image/jpg' || x.type == 'image/jpeg'|| x.type == 'image/png'){
        flag=true
      }
      if(!flag){
        alert('Image formats supportd are jpeg, jpg and png')
      }
      else if(x.size > 1010000){
        alert('Image size greater than limit')
      }

      
         
    })
    selectedFilesArray = selectedFilesArray.filter((x)=>{
      return(x.size<1010000 && flag )
    })

    selectedFilesArray.map((x)=>{
      return new File([x], `${stateData}_${Date.now()}`, {
        type: "image/jpeg",
        lastModified: Date.now()
      } );
    })
    setimages(selectedFilesArray)
    
    
    var imagesArray = selectedFilesArray.map((file) => {
      console.log(file)
      console.log(URL.createObjectURL(file))
      return (
        <div>
          <img
            alt="not found"
            width={"250px"}
            src={URL.createObjectURL(file)}
          />
          <br />
          
        </div>
      );
    });
    console.log(imagesArray)

    setSelectedImage(imagesArray);

    // FOR BUG IN CHROME
    event.target.value = "";
  };
  
  var stateVar = useLocation();
  var appl_id = null
  const stateData = stateVar.state;

  const navigate = useNavigate()

  useEffect(()=>{

   console.log(stateVar.state)
    
    if(stateVar.state == '' || stateVar.state == null){
      navigate('/appl1')
    }

    Axios({
        method: 'GET',
        url: 'http://153.92.5.199:5000/user',
        withCredentials: true
    }).then((res)=>{
      if(res.data.err){
	      console.log(res.data.err)
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
      url: `http://153.92.5.199:5000/images_id?id=${stateData}`,
      withCredentials: true
  }).then((res)=>{
    console.log(res.status)
    })
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

    

  
    const handleSubmit = (e) => {
      e.preventDefault();
      
      
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
        navigate('/appl2',{
          state: stateData
          
        })
  
      }
      if (new Date(endDate) <= new Date(startDate)) {
        setflash('End date should be after start date');
        navigate('/appl2',{
          state: stateData
          
        })
  
      }
  
      // Check if population is positive
      if (parseInt(population) <= 0) {
        setflash('Invalid Population');
        navigate('/appl2',{
          state: stateData
          
        })
  
      }
      else{
        const newAppl = {
          event_: DOMPurify.sanitize(event),
          cusEvent: DOMPurify.sanitize(cusEvent),
          description_: DOMPurify.sanitize(description),
          startDate: DOMPurify.sanitize(startDate),
          endDate: DOMPurify.sanitize(endDate),
          population: DOMPurify.sanitize(population),
          budget: DOMPurify.sanitize(budget),
          cusLowBudget: DOMPurify.sanitize(cusLowBudget),
          cusHighBudget: DOMPurify.sanitize(cusHighBudget),
          applid: DOMPurify.sanitize(stateVar.state),
        };
          
          

          var formdata = new FormData();
          var i = 0;
          while(i != images.length){
            formdata.append('file', images[i])
            i = i+1;
          }
          // formdata.append('file', images[0])
          // formdata.append('file', images[1])
          // formdata.append('file', images[2])
          // formdata.append('event_', newAppl['event_'])
          for (const key in newAppl) {
            formdata.append(key, newAppl[key]);
          }
          
          
          

          

          
          axios.post('http://153.92.5.199:5000/appl2', formdata)
          .then(res=>{
              if(res.data.status){
                console.log(res.data.application_id)
                console.log(res)
                alert('Application part 2 successfully registered')
                console.log(stateData)
                
                navigate(`/select_venue`,{
                  state: 
                    stateData
                  
                } )
              }
            }).catch((err)=> showBoundary(err))
        
          
        //   Axios({
        //     method: 'POST',
        //     url: 'http://153.92.5.199:5000/appl2',
        //     withCredentials: true,
        //     data: formdata
        // }).then(res=>{

        //   if(res.data.status){
        //     console.log(res.data.application_id)
        //     alert('Application part 2 successfully registered')
        //     console.log(stateData)
            
        //     navigate(`/select_venue`,{
        //       state: 
        //         stateData
              
        //     } )
        //   }
        // }).catch((err)=> showBoundary(err))
      }
    };
  
    return (
      
      <>
      
      <Navbar loguser = {logUser} />
      <div>
        <div style={{color: 'red'}}>{flash}</div>
        <h1 className="event-title">Event Details</h1>
        <br/><br/>
        <form>
          {/* Event type */}
          <div className="input-container">
            <label htmlFor="event"><span className="bold-text">Choose the type of event:</span></label>
            <select name="event" id="event" value={event} onChange={(e) => setEvent(e.target.value)} required>
            <option value="custom">---</option>
              <option value="wedding">Wedding</option>
              <option value="corporate">Corporate Event</option>
              <option value="party">Party</option>
              
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
            <input type="date" name="s-date" id="s-date" defaultChecked={null} onChange={(e) => setStartDate(formatDate(e.target.value))} required/>
            <label htmlFor="e-date">To</label>
            <input type="date" name="e-date" id="e-date" defaultChecked={null} onChange={(e) => setEndDate(formatDate(e.target.value))} required/>
          </div>
          
          {/* Population */}
          <div className="input-container">
            <label htmlFor="population"><span className="bold-text">Enter rough Turn-Up</span><br/></label>
            <input type="number" name="population" id="population" value={population}  onChange={(e) => setPopulation(e.target.value)} required/>
          </div>
          <br/>
          <br/>
          <div className="input-container">
            <label htmlFor="image"><span className="bold-text">Upload images for reference (optional, Size of images should be less than 1MB)</span><br/></label>
            <div>
      

     <div>
     {selectedImage}</div> 
     <div>{ selectedImage.length !== 0 ? <button onClick={(e) => {
            e.preventDefault()
            
            setSelectedImage([]);
          }}>Remove</button> : <div></div> }</div>

      <br />
      <br />
      
      <input
        type="file"
        name="images"
        multiple
        accept="images/png, images/jpg, images/jpeg, images/webp"
        onChange={onSelectFile}
        size={200}
      />
    </div>
          </div>
          <br/>
          <br/>
          
          {/* Budget */}
          <div className="input-container">
            <label htmlFor="budget"><span className="bold-text">Choose the rough budget:</span></label>
            <select name="budget" id="budget"  value={budget} onChange={(e) => setBudget(e.target.value)} required>
            <option value="custom">----</option>
              <option value="0 to 5 lakhs">0-5 lakhs</option>
              <option value="5 to 10 lakhs">5-10 lakhs</option>
              <option value="10 to 25 lakhs">10-25 lakhs</option>
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
          <div>
            
          </div>
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
  
