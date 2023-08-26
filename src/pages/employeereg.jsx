import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios'
import {useErrorBoundary } from "react-error-boundary";
import Navbar from './navbar';
import './Admin/employeereg.css';


const EmployeeReg = () =>{
    const {showBoundary} = useErrorBoundary()
  const [logUser, setloguser] = useState(null)

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [designation, setDesignation] = useState('');
  const [password, setpassword] = useState('')
  const [confpassword, setconfpassword] = useState('')
  const [admin, setadmin] = useState(false)

  
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
        navigate('admin/employee_reg')
    }
   let inputs = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        address: address,
        designation: designation,
        password: password,
        admin_status: admin,
        client: "no"
        

    }

    Axios({
      method: 'POST',
      url: 'http://153.92.5.199:5000/employee_reg',
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
        <h3>Employee Registration</h3>
            <div class="form-group">
                <label for="first_name">First Name:</label>
                <input type="text" id="first_name" name="first_name" value={firstName} onChange={e=>setFirstName(e.target.value)} required/>
            </div>
            <div class="form-group">
                <label for="last_name">Last Name:</label>
                <input type="text" id="last_name" name="last_name" value={lastName} onChange={e=>setLastName(e.target.value)} required/>
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
            </div>
            <div class="form-group">
                <label for="phone">Phone:</label>
                <input type="tel" id="phone" name="phone" value={phone} onChange={e=>setPhone(e.target.value)} required/>
            </div>
            <div class="form-group">
                <label for="address">Address:</label>
                <input type="text" id="address" name="address" value={address} onChange={e=>setAddress(e.target.value)} required/>
            </div>
            <div class="form-group">
                <label for="designation">Designation:</label>
                <input type="text" id="designation" name="designation" value={designation} onChange={e=>setDesignation(e.target.value)} required/>
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" value={password} onChange={e=>setpassword(e.target.value)} required/>
            </div>
            <div class="form-group">
                <label for="conf_password">Confirm Password:</label>
                <input type="password" id="conf_password" name="confpassword" value={confpassword} onChange={e=>setconfpassword(e.target.value)} required/>
            </div>
            <div class="form-group">
                <label for="admin">Admin Status (true or false):</label>
                <input type="text" id="admin" name="admin_status" value={admin} onChange={e=>setadmin(e.target.value)} required/>
            </div>
            <input type="submit" onClick={e=>handleSubmit(e)} value="Submit"/>
            <div><h2>{flash}</h2></div>
        </form>
        </div>
    </div>
        </>
      );

}

export default EmployeeReg;
