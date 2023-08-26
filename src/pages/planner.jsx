
import './Admin/planner.css';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios'
import {useErrorBoundary } from "react-error-boundary";
import Navbar from './navbar';
import { Link } from 'react-router-dom';


const Planner = () => {

  const {showBoundary} = useErrorBoundary()
  const [logUser, setloguser] = useState(null)
  const [appln, setappln] = useState([])
 

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
            if(res.data.designation !== "Planner"){
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

    Axios({
      method: 'GET',
      url: 'http://153.92.5.199:5000/planner/applications',
      withCredentials: true
  }).then((res)=>{
    if(res.data.err){
      showBoundary(res.data.err)
    }
      if(res.data){
        console.log(res.data.data)
        setappln(res.data.data)
        console.log(appln)

        

        const renderComp = res.data.data.map((value)=>{
          var statusColor = '';
        
          if(value.status == 'unassigned'){
            statusColor = 'red'
          }
          else if(value.status == 'assigned'){
            statusColor ='orange'
          }
          else if(value.status == 'completed'){
            statusColor = 'green'
          }
        
          return(
            <div style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '20px',
              backgroundColor: '#f5f5f5',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}>
              <div style={{
                fontSize: '1.5em',
                fontWeight: 'bold',
                marginBottom: '10px',
              }}>
                
              </div>
              <div>
              <div style={{ color: '#888', marginBottom: '8px'}}>{value.appl_id}</div>
              <div style={{  marginBottom: '8px'}}>{value.event_}</div>
              <div style={{ color: `${statusColor}`, marginBottom: '8px'}}>{value.status}</div>
                <div style={{ color: '#888', marginBottom: '8px' }}>Deadline - {value.start_date.substring(0, 10)}</div>
                <div><Link  to={'/planner/show'} state={value} >Check Progress</Link></div>
                
                
              </div>
              
            </div>
          )
        }
          )
          setappln(renderComp);

        }})
        .catch((err)=> showBoundary(err))
        
      
      
  }, [])
  

    
   

    




    const Logout = (e) => {
        e.preventDefault()
        
        
        Axios({
            method: 'POST',
            url: 'http://localhost:5000/logout',
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
     <div className="head">Client Applications</div>
     <div>{appln}</div>
        </>
      );
}

export default Planner;