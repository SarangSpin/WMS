import Axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = () => {

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
                navigate('/login')
            }
            else{
                console.log(res.data)
                navigate('/')
            }
        })

    }



    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f2f2f2' }}>
  <h2 style={{ textAlign: 'center' }}>User Login</h2>
  <form>
    <div style={{ marginBottom: '20px' }}>
      <label htmlFor="username" style={{ display: 'block', fontWeight: 'bold' }}>Username:</label>
      <input type="text" id="username" name="username" placeholder="Enter your username" onChange={e => setusername(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} required />
    </div>
    <div style={{ marginBottom: '20px' }}>
      <label htmlFor="password" style={{ display: 'block', fontWeight: 'bold' }}>Password:</label>
      <input type="password" id="password" name="password" onChange={e => setpassword(e.target.value)} placeholder="Enter your password" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} required />
    </div>
    <button onClick={handleSubmit} style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', textAlign: 'center', textDecoration: 'none', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }} type="submit">Login</button>
  </form>
</div>
    )
}

export default Login;