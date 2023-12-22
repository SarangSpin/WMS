import {Link} from "react-router-dom"
import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import './htmlfiles/Register.css'
import {useErrorBoundary } from "react-error-boundary";
const Register = () => {

  const {showBoundary} = useErrorBoundary()
  const navigate = useNavigate() 
    const [username, setusername] = useState(null)
    const [email, setemail] = useState(null)
    const [password, setpassword] = useState(null)
    const[flash, setflash] = useState('')
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
          url: 'http://153.92.5.199:5000/register',
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
          navigate('/login')
        }
        else{
          console.log(res.data.message)
          setflash(res.data.flash)
        }}
      }).catch((err)=>showBoundary(err))
    
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
          
          <p>{flash}</p>
          
            <span>Have an account? <Link to={"/login"}>Login</Link>
            </span>
            <span><Link to={"/"}>Back to Home</Link>
            </span>
        </form>
      </div>
    </section>
  )
}

export default Register;