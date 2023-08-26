import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import  Axios from "axios";
import {useErrorBoundary } from "react-error-boundary";
import Navbar from "./navbar";
import { Link } from "react-router-dom";
import 'react-lazy-load-image-component/src/effects/blur.css';
import StarRating from 'star-rating-react';



const PlannerView = ()=>{

    const {showBoundary} = useErrorBoundary()
    const [logUser, setloguser] = useState(null)
    const setvalue = useLocation()
    var value = {};
    const [venue, setvenue] = useState(null)

    var renderComp;
   
  
    const navigate = useNavigate()
    value = setvalue.state;
      console.log(value)
  
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
      })
      .catch((err)=> showBoundary(err))


      Axios({
        method: 'GET',
        url: `http://153.92.5.199:5000/venue?id=${value.venue_id}`,
        withCredentials: true
    }).then((res)=>{
      if(res.data.err){
        showBoundary(res.data.err)
      }
        if(res.data){
           
            console.log(res.data.data[0])
            var valueVenue = res.data.data[0]
            const renderComp = ()=>{
                return(
                    <div>

                    <div style={infoStyle}>{valueVenue.venues_name}</div>
                    <div >
                
                    <div>
                    <div style={infoStyle}>City: {valueVenue.city}</div>
                        
                        <div style={infoStyle}>Location: {valueVenue.location}</div>
                        <div style={infoStyle}>Rating: {valueVenue.rating}/10 
                        
                            </div>

                    </div>
                    
                        </div>
                        
                        {/* <div className="description">{subEvent.description !== null ? subEvent.description : ''}</div> */}
                        
                    
        
                </div>
                )
              }
              setvenue(renderComp(venue))
              console.log(venue)
        }
        
    })
    .catch((err)=> showBoundary(err))

      

      
      

        
    }, [])
    


    const containerStyle = {
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      };
    
      const titleStyle = {
        fontSize: '24px',
        marginBottom: '15px'
      };
    
      const sectionTitleStyle = {
        fontSize: '20px',
        marginTop: '15px',
        marginBottom: '10px'
      };
    
      const infoStyle = {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '5px'
      };
    
      const labelStyle = {
        flex: '0 0 150px',
        fontWeight: 'bold',
        color: 'blue'

      };
    
      const valueStyle = {
        flex: 1,
        color: 'black'
      };
    
      return (
        <>
        <Navbar loguser = {logUser} />
        <div style={containerStyle}>
          <h1 style={titleStyle}>Application Details</h1>
          <div style={sectionTitleStyle}>Event Details</div>
          <div style={infoStyle}>
            <p style={labelStyle}>Event Name:</p>
            <p style={valueStyle}>{value.event_}</p>
          </div>
          <div style={infoStyle}>
            <p style={labelStyle}>Event Description:</p>
            <p style={valueStyle}>{value.description_}</p>
          </div>
          {/* Add more event details here */}
          <div style={sectionTitleStyle}>Date and Budget</div>
          <div style={infoStyle}>
            <p style={labelStyle}>Start Date:</p>
            <p style={valueStyle}>{value.start_date.substring(0,10)}</p>
          </div>
          <div style={infoStyle}>
            <p style={labelStyle}>End Date:</p>
            <p style={valueStyle}>{value.end_date.substring(0, 10)}</p>
          </div>
          <div style={infoStyle}>
            <p style={labelStyle}>Population:</p>
            <p style={valueStyle}>{value.population}</p>
          </div>
          <div style={infoStyle}>
            <p style={labelStyle}>Budget:</p>
            <p style={valueStyle}>{value.budget}</p>
          </div>
          <div style={infoStyle}>
            <p style={labelStyle}>Custom Budget:</p>
            <p style={valueStyle}>{value.cus_low_budget}</p>
          </div>
          {/* Add more date and budget details here */}
          <div style={sectionTitleStyle}>Other Details</div>
          <div style={infoStyle}>
            <p style={labelStyle}>Custom Event:</p>
            <p style={valueStyle}>{value.cus_event}</p>
          </div>
          <div style={infoStyle}>
            <p style={labelStyle}>Status:</p>
            <p style={{
        flex: 1,
        color: 'red'
      }}>{value.status}</p>
          </div>
          <div style={infoStyle}>
            <p style={labelStyle}>Application Date:</p>
            <p style={{
        flex: 1,
        color: 'red'
      }}>{value.appln_date.substring(0, 10)}</p>
          </div>
          <div style={infoStyle}>
            <p style={labelStyle}>Project Manager:</p>
            <p style={valueStyle}>{value.osm}</p>
          </div>
          <div style={infoStyle}>
            <p style={labelStyle}>Venue:</p>
            <div>{venue}</div>
          </div>
          {/* Add more sections for other details */}
          <div>
            <Link to={'/planner/show/sub_events'} state={value.appl_id} >Show Sub-Events</Link>
          </div>
        </div>
        </>
      );
}

export default PlannerView;




