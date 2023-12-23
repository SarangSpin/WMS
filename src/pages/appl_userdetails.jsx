import React, { useEffect, useState } from "react";
import './htmlfiles/applications(css)/application1.css'
import { Link, useNavigate } from "react-router-dom";
import  Axios from "axios";
import {useErrorBoundary } from "react-error-boundary";
import Navbar from "./navbar";
import DOMPurify from 'dompurify';

const Appln1 = () => {

  const {showBoundary} = useErrorBoundary()
  const [logUser, setloguser] = useState(null)
 

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
    .catch((err)=>console.log(err))
   

    
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
      logUser.user_id
    ];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const pincodeRegex = /^\d{6}$/;

    if (data1.includes(null)) {
      alert('Fill the required fields');
      navigate('/appl1');
    }
    
    
    else if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      navigate('/appl1');
    }
  
    
    else if (!phoneRegex.test(phoneNumber)) {
      setflash('Please enter a 10-digit phone number');
      navigate('/appl1');
    }
    
    else if (!pincodeRegex.test(pincode)) {
      alert('Please enter a 6-digit pincode');
      navigate('/appl1');
    }
    else{
      const newAppl = {
        firstName: DOMPurify.sanitize(firstName),
        lastName: DOMPurify.sanitize(lastName),
        email: DOMPurify.sanitize(email),
        phoneNumber: DOMPurify.sanitize(phoneNumber),
        city: DOMPurify.sanitize(city),
        state: DOMPurify.sanitize(state),
        pincode: DOMPurify.sanitize(pincode),
        flash: DOMPurify.sanitize(flash),
        user_id: DOMPurify.sanitize(logUser.user_id),
      };
      Axios({
        method: 'POST',
        url: 'http://153.92.5.199:5000/appl1',
        withCredentials: true,
        data: newAppl
    }).then(res=>{
      if(res.data.status){
        console.log(res.data.application_id)
        alert('Application part 1 successfully registered')
        const url = '/appl2'
        //window.history.pushState({data: res.data.application_id} , "" , url);
        navigate(`/appl2`,{
          state: res.data.application_id
        } )

       
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
          
        </div>

      </form>
    </div>

      </>

    


    )
}

export default Appln1
