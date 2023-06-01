import {Link} from "react-router-dom"
import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import './Register.css'
const Register = () => {

  const navigate = useNavigate() 
    const [username, setusername] = useState(null)
    const [email, setemail] = useState(null)
    const [password, setpassword] = useState(null)
    const[flash, setflash] = useState('')
    const [otp, setotp] = useState(null)
    const [otpS, setotpS] = useState(null)
    let inputs = null
    const handleSubmit = (e) => {
        e.preventDefault()
       inputs = {
            username: username,
            email: email,
            password: password
        }

        Axios({
          method: 'POST',
          url: 'http://localhost:5000/otpmail',
          withCredentials: true,
          data: {email: inputs.email}
      }).then(res=>{
        if(res.data.status){
          setotpS(res.data.OTP)
          
        }
      })
    }

   


    const finalSubmit = (e) => {
      e.preventDefault()
      if(otp === null){
        setflash('Please enter OTP to verify')

      }
      if(otp === otpS){
        setflash(null)
        Axios({
            method: 'POST',
            url: 'http://localhost:5000/register',
            withCredentials: true,
            data: inputs
        }).then( res => {
          if(res.data.status === true){
            console.log('Submitted successfully')
            setflash(res.data.flash)
            alert('Successfully registered')
            navigate('/login')
          }
          else{
            console.log(res.data.message)
            setflash(res.data.flash)
          }
        })
      }

    }

    const OTP = () => {
      if(inputs !== null){
      return (
        <div>
        <input type="text" placeholder='Enter the OTP sent to your mail'  name="otp" required onChange={e => setotp(e.target.value)}/>
        <button type="submit" className='button' onClick={e=>finalSubmit(e)}>Submit</button>
        </div>
      )
      }
    }

  return (
    <section className="l-wrapper">
      <div className="center">
        <h1 >
          Register
        </h1>
        
        <form className='form'>
          <input type="text" placeholder='UserName' id="username" name="username" required onChange={e => setusername(e.target.value)}/>
          <input type="email" placeholder='Email-id' id="email" name="email" required onChange={e => setemail(e.target.value)} />
          <input type="password" placeholder='Password' id="password" name="password" required onChange={e => setpassword(e.target.value)} />
          
          <button type="submit" className='button' onClick={e=>handleSubmit(e)}>Register</button>
          <div>{OTP()}</div>
          <p>{flash}</p>
          
            <span>Have an account? <Link to={"/login"}>Login</Link>
            </span>
        </form>
      </div>
    </section>
  )
}

export default Register