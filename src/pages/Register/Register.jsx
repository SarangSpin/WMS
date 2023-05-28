import {Link} from "react-router-dom"
import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import './Register.css'
const Login = () => {

  const navigate = useNavigate() 
    const [username, setusername] = useState(null)
    const [email, setemail] = useState(null)
    const [password, setpassword] = useState(null)
    const[flash, setflash] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
       const inputs = {
            username: username,
            email: email,
            password: password
        }

        Axios({
            method: 'POST',
            url: 'http://localhost:5000/register',
            withCredentials: true,
            data: inputs
        }).then( res => {
          if(res.data.status === true){
            console.log('Submitted successfully')
            setflash(res.data.flash)
            navigate('/login')
          }
          else{
            console.log(res.data.message)
            setflash(res.data.flash)
          }
        })

    }
  return (
    <section className="l-wrapper">
      <div className="center">
        <h1 >
          Register
        </h1>
        <h2>
          Don't have an Account?
        </h2>
        <form className='form'>
          <input type="text" placeholder='UserName' id="username" name="username" onChange={e => setusername(e.target.value)}/>
          <input type="password" placeholder='Password' id="password" name="password" onChange={e => setpassword(e.target.value)} />
          <input type="email" placeholder='Email-id' id="email" name="email" onChange={e => setemail(e.target.value)} />
          <button type="submit" className='button'>Register</button>
          <p>This is an error</p>
            <span>Dont't have an account? <Link to="/Register">Register</Link>
            </span>
        </form>
      </div>
    </section>
  )
}

export default Login