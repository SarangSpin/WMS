import React, { useState } from "react";
import  Axios  from "axios";
import { useNavigate } from "react-router-dom";

const EmailOTP = (value) => {
    const [otp, setotp] = useState(null)
    navigate = useNavigate()

    handleSubmit = (e) => {
        e.preventDefault()
        if (otp === value){
            console.log('OTP validated')
            return(true)
        }
        else{
            return(false)
        }

    }
    return(
       
        <div>
    <h1>Authentication</h1>
    <br/>
        <form action="application3.html">
        <div style={{textAlign: "center"}}>
            <label for="otp">Enter the OTP </label>
            <input type="text" name="otp" onChange={e=>setotp(e.target.value)} id="otp" required/>
        </div>
        <br/><br/>
        <div style={{textAlign: "center"}}>
           <input type="submit" value="Submit" onClick={e=>handleSubmit(e)}/>
        </div>
        </form>
    </div>
    
    )
}

export default EmailOTP