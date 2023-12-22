import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios'
import {useErrorBoundary } from "react-error-boundary";
import Navbar from './navbar';
import './Admin/employeereg.css';


const AddVendor = () =>{
    const {showBoundary} = useErrorBoundary()
  const [logUser, setloguser] = useState(null)
  const [pricing, setpricing] = useState('');
  const [vendorName, setvendorName] = useState('');
  const [description, setdescription] = useState('');
  const [type, settype] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [phone_vendor, setPhoneVendor] = useState('');
  const [address, setAddress] = useState('');
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('')
  const [confpassword, setconfpassword] = useState('')


  
  const[flash, setflash] = useState('')

 

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
            if(res.data.admin_status !== "true"){
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
    }, [])
    .catch((err)=> showBoundary(err))
   

    
}, [])

const handleSubmit = (e) => {
    e.preventDefault()
    if(password !== confpassword){
        alert('Password is incorrect')
        navigate('admin/vendor')
    }
   let inputs = {
    vendorName: vendorName,
        description: description,
        pricing: pricing,
        type: type,
        email: email,
        phone: phone,
        phone_vendor: phone_vendor,
        address: address,
        username: username,
        password: password,
        
        

    }

    Axios({
      method: 'POST',
      url: 'http://153.92.5.199:5000/add_vendor',
      withCredentials: true,
      data: inputs
  }).then( res => {
    console.log(res.data)
    if(res.data.status === 500){
      console.log(res.data)
      showBoundary(res.data)
      
    }
    else{
    if(res.data.status === true){
      console.log('Submitted successfully')
      setflash(res.data.flash)
      alert('Successfully registered')
      navigate('/admin')
    }
    else{
      console.log(res.data.message)
      setflash(res.data.flash)
      
    }}
  }).catch((err)=>showBoundary(err))

}



    const Logout = (e) => {
        e.preventDefault()
        
        
        Axios({
            method: 'POST',
            url: 'http://153.92.5.199:5000/logout',
            withCredentials: true
        }).then((res)=>{
            console.log(res.data.message)
            setloguser(null)
            
            navigate('/')})
        .catch((err)=> showBoundary(err))



    }

   

    return(
      <>
      <Navbar loguser = {logUser} />
      <div class="Container">
        
        <div className="box">
        <form action="" method="POST">
        <h3>Vendor Registration</h3>
            <div class="form-group">
                <label for="vendor_name">Vendor Name:</label>
                <input type="text" id="vendor_name" name="vendor_name" value={vendorName} onChange={e=>setvendorName(e.target.value)} required/>
            </div>
            <div class="form-group">
                <label for="description">Description:</label>
                <input type="text" id="description" name="description" value={description} onChange={e=>setdescription(e.target.value)} required/>
            </div>
            <div class="form-group">
                <label for="type">Service type:</label>
                
                <select name="type" id="type" value={type} onChange={(e) => settype(e.target.value)} required>
               
                  <option value="catering">Catering and Dining</option>
                  <option value="housekeeping">Housekeeping</option>
                  <option value="gardening">Gardening</option>
                  <option value="flower">Flowers</option>
                  <option value="photo_videography">Photo/Videography</option>
                  <option value="chairs_tables">Chairs and Tables</option>
                  <option value="bartender">Bartender</option>
                  <option value="music">DJ/Music</option>

                </select>
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
            </div>
            <div class="form-group">
                <label for="phone">Main Contact:</label>
                <input type="tel" id="phone" name="phone" value={phone} onChange={e=>setPhone(e.target.value)} required/>
            </div>
            <div class="form-group">
                <label for="phone_vendor">Vendor Contact:</label>
                <input type="tel" id="phone_vendor" name="phone_vendor" value={phone_vendor} onChange={e=>setPhoneVendor(e.target.value)} required/>
            </div>
            <div class="form-group">
                <label for="pricing">Pricing Description:</label>
                <input type="text" id="pricing" name="pricing" value={pricing} onChange={e=>setpricing(e.target.value)} required/>
            </div>
            <div class="form-group">
                <label for="address">Address:</label>
                <input type="text" id="address" name="address" value={address} onChange={e=>setAddress(e.target.value)} required/>
            </div>
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" value={username} onChange={e=>setusername(e.target.value)} required/>
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" value={password} onChange={e=>setpassword(e.target.value)} required/>
            </div>
            <div class="form-group">
                <label for="conf_password">Confirm Password:</label>
                <input type="password" id="conf_password" name="confpassword" value={confpassword} onChange={e=>setconfpassword(e.target.value)} required/>
            </div>
           
            <input type="submit" onClick={e=>handleSubmit(e)} value="Submit"/>
            <div><h2>{flash}</h2></div>
        </form>
        </div>
    </div>
        </>
      );

}

export default AddVendor;
