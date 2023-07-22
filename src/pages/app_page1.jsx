import React, { useEffect, useState } from "react";
import './htmlfiles/applications(css)/application1.css'
import { Link, useNavigate } from "react-router-dom";
import  Axios from "axios";
import {useErrorBoundary } from "react-error-boundary";
import Navbar from "./navbar";

const Appln1 = () => {

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



    const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [pincode, setPincode] = useState(null);
  const [flash, setflash] = useState(null);
  

  const [appl_id, setappl_id] = useState(null)
  
 
  

  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    let data1 = [
      firstName,
      lastName,
      email,
      phoneNumber,
      city,
      state,
      pincode,
    ];
    
    if (data1.includes(null)) {
      setflash('Fill the required fields');
      navigate('/appl1');
    }
    else{
      const newAppl = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        city: city,
        state: state,
        pincode: pincode,
        flash: flash
      };
      Axios({
        method: 'POST',
        url: 'http://localhost:5000/appl1',
        withCredentials: true,
        data: newAppl
    }).then(res=>{
      if(res.data.status){
        setappl_id(res.data.application_id)
        alert('Application part 1 successfully registered')

        
      }
    })
    }
  };

    return(
      <> 
      <Navbar loguser = {logUser} />
      <div>
      <div style={{color: 'red'}}>{flash}</div>
      <h1>Enter the details</h1>
      <br />
      <form action="application2.html" >
        <div className="input1">
          <label htmlFor="f-name">First Name</label>
          <input
            type="text"
            name="f-name"
            id="f-name"
            className="input-field"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <label htmlFor="l-name">Last Name</label>
          <input
            type="text"
            name="l-name"
            id="l-name"
            className="input-field"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <br />
        <div className="input2">
          <label htmlFor="email-id">Email id</label>
          <input
            type="email"
            name="email-id"
            id="email-id"
            className="input-field"
            placeholder="Email-id"
            value= {email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="phone">Phone number</label>
          <input
            type="number"
            name="phone"
            id="phone"
            className="input-field"
            placeholder="Phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <br />
        <div className="input3">
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            id="city"
            className="input-field"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <label htmlFor="state">State</label>
          <input
            type="text"
            name="state"
            id="state"
            className="input-field"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <label htmlFor="pincode">Pincode</label>
          <input
            type="number"
            name="pincode"
            id="pincode"
            className="input-field"
            placeholder="Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
        </div>
        <div className="submit">
          <input type="submit" onClick={e=>handleSubmit(e)} className="submit-button" />
          <button><Link to={`/appl2${appl_id ? `?applid=${appl_id}`: ''}`} >Next</Link></button>
        </div>

      </form>
    </div>

      </>

    


    )
}

export default Appln1