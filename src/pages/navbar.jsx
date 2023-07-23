
import "./htmlfiles/Navbar.css"
import React, { useEffect, useState } from "react";
import { Await, Link, useNavigate } from "react-router-dom";
import Axios from 'axios'
import {useErrorBoundary } from "react-error-boundary";




const Navbar = ({loguser}) => {

const navigate = useNavigate()
const {showBoundary} = useErrorBoundary()

const Logout = (e) => {
    e.preventDefault()
    Axios({
        method: 'POST',
        url: 'http://localhost:5000/logout',
        withCredentials: true
    }).then((res)=>{
        navigate('/login')})
    .catch((err)=> showBoundary(err))

   
}

let username = () => {
    if(loguser === null){
        return "Profile"
    }
    else{
        
        return loguser.username
    }
}

let LoggedIn = () =>{
    if(loguser === null){
        return(<a className="option" href="/login">Sign In</a>)
    }
    else{
        return (<a className="option" href = '/' onClick={e=>Logout(e)}>Logout</a>)
    }
}

let AdminStatus = () =>{
    if(loguser === null){
        return null
    }
    else{
        if(loguser.admin_status === "true")
        return (<a className="option" href="/admin">Admin</a> )
    }
}



        
        return(
            <nav>
    <div className="navbar">
      <div className="navbar-logo"><a className="logo" href="/">WMS</a></div>
      <div className="navbar-menu">
        <ul>
          <li><a href="#">Home</a></li>
          
          <li><a href="#">About</a></li>
          <li><a href="#">Help</a></li>
          
            <li class="dropdown">
        <a href="#" class="dropbtn">{username()}</a>
        <div className="dropdown-content">
        {LoggedIn()}
        {AdminStatus()}
        {/* { loguser.result.is_employee === true ? <a href="/details">Your Details</a>: null } */}
          <a className="option" href="#">Settings</a>
        </div>
      </li> 
      </ul>
      </div>
    </div>
  </nav>
        )
        
    // else{
    // return <li>{logOut()}</li> 
    // }
    
 }



    

export default Navbar;