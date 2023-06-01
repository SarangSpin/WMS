import React from 'react'
import {Link} from "react-router-dom"
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './Login.css'
const Login = () => {

  const[flash, setflash] = useState('')
  const navigate = useNavigate() 
  const [username, setusername] = useState(null)
  const [password, setpassword] = useState(null)

  const handleSubmit = (e) => {
      e.preventDefault()
     const inputs = {
          username: username,
          password: password
      }
      Axios({
          method: 'POST',
          url: 'http://localhost:5000/login',
          withCredentials: true,
          data: inputs
      }).then(res => {
          
          console.log(res.data)
          if(res.data.status === 404){
              console.log('Wrong credentials')
              setflash(res.data.flash)
              navigate('/login')
          }
          else if(res.data.status === 500){
            console.log(res.data.message)
            setflash(res.data.flash)
          }
          else{
              console.log(res.data.result)
              setflash(res.data.flash)
              alert('Login Successful')
              navigate('/')
          }
      })

  }
  return (
    <section className="l-wrapper">
      <div className="center">
        <h1 >
          Login
        </h1>
        <h2>
          Have an Account?
        </h2>
        <form className='form'>
          <input type="text" placeholder='UserName' id='username' required name='username' onChange={e => setusername(e.target.value)}/>
          <input type="password" placeholder='password' id="password" required name="password" onChange={e => setpassword(e.target.value)} />
          <button type="submit" className='button' onClick={e=>handleSubmit(e)}>Sign In</button>
          <p>{flash}</p>
            <span>Dont't have an account? <Link to={"/register"}>Register</Link>
            </span>
        </form>
      </div>
    </section>
  )
}

export default Login