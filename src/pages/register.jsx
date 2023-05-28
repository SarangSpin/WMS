import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";


const Register = () => {
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
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f2f2f2' }}>
  <h2 style={{ textAlign: 'center' }}>User Registration</h2>
  <div style={{ marginBottom: '20px' }}>
    <label htmlFor="username" style={{ display: 'block', fontWeight: 'bold' }}>Username:</label>
    <input type="text" id="username" name="username" onChange={e => setusername(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} required />
  </div>
  <div style={{ marginBottom: '20px' }}>
    <label htmlFor="email" style={{ display: 'block', fontWeight: 'bold' }}>Email:</label>
    <input type="email" id="email" name="email" onChange={e => setemail(e.target.value)} placeholder="Enter your email" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} required />
  </div>
  <div style={{ marginBottom: '20px' }}>
    <label htmlFor="password" style={{ display: 'block', fontWeight: 'bold' }}>Password:</label>
    <input type="password" id="password" name="password" onChange={e => setpassword(e.target.value)} placeholder="Enter your password" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} required />
  </div>
  <button onClick={handleSubmit} style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', textAlign: 'center', textDecoration: 'none', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }} type="submit">Register</button>
  <div style={{color:'blue'}}>{flash}</div>
</div>
    )
}

export default Register;