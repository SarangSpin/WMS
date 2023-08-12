
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
        
        if(loguser.client == 'yes'){
            return loguser.username
        }
        else{
            return loguser.first_name
        }
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
       if(loguser.client == "no"){
        if(loguser.admin_status === "true")
        return (<a className="option" href="/admin">Admin</a> )
       }
       else{
        return null
       }
        
    }
}

let Planner = () => {
    if(loguser === null){
        return null
    }
    else{
        if(loguser.client == "no"){
            if(loguser.designation === "Planner")
            return (<a className="option" href="/planner">Applications</a> )
           }
           else{
            return null
           }
    }

}
let OsManager = () => {
    if(loguser === null){
        return null
    }
    else{
        if(loguser.client == "no"){
            if(loguser.designation === "osm")
            return (<a className="option" href="/operations">Your Assignments</a> )
           }
           else{
            return null
           }
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
          
            <li className="dropdown">
        <a href="#" className="dropbtn">{username()}</a>
        <div className="dropdown-content">
        {LoggedIn()}
        {AdminStatus()}
        {Planner()}
        {OsManager()}
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