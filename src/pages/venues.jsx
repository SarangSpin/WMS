import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import  Axios from "axios";
import {useErrorBoundary } from "react-error-boundary";
import Navbar from "./navbar";
import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import './htmlfiles/venues.css';
import MyImage from "./imageloader";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import StarRating from 'star-rating-react';

const Venues = ()=>{


    const [venues, setvenues] = useState([])
    const {showBoundary} = useErrorBoundary()
    const [logUser, setloguser] = useState(null)
    var stateVar = useLocation();
    var appl_id = null
    const stateData = stateVar.state;
   
  
    const navigate = useNavigate()
  
    useEffect(()=>{

        console.log(stateVar.state)
    
        if(stateVar.state == '' || stateVar.state == null){
          navigate('/appl1')
        }

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
              console.log(res.data)
          }
          else{
            navigate('/login')    
              alert('You need to login first')
          }
      }, [])
      .catch((err)=> showBoundary(err))
    }, [])



    useEffect(()=>{
        Axios({
            method: 'GET',
            url: 'http://153.92.5.199:5000/venues',
            withCredentials: true
        }).then((res)=>{
          if(res.data.err){
            showBoundary(res.data.err)
          }
            if(res.data){
                setvenues(res.data)
                console.log(res.data)
                const renderComp = res.data.data.map((value)=>{


                    return(
                        <div className="compo">

                        <div className="venue">{value.venues_name}</div>
                        <div className="content-loc">
                        
                            <div className="images">
                            <Carousel animationHandler={'fade'}  dynamicHeight={false}>
                            
                            <div className="image-com">
                           
                                
                                <img src= {require(`../../server/assets/images/venues/${value.venues_id}/img1.jpg`)} loading={'lazy'}/>
                                
                            </div>
                            <div className="image-com">
                                <img src={require(`../../server/assets/images/venues/${value.venues_id}/img2.jpg`) } loading={'lazy'}/>
                                
                            </div>
                            <div className="image-com">
                                <img src={require(`../../server/assets/images/venues/${value.venues_id}/img3.jpg`)} loading={'lazy'}/>
                                
                            </div>
                            
                            
                           

                        </Carousel>
                        
                        </div>
                        <div className="details-loc">
                        <div className="city">City: {value.city}</div>
                            
                            <div className="location">Location: {value.location}</div>
                            <div className="rating">Rating: {value.rating}/10 
                            <StarRating
                               
                                size={10}
                                value={value.rating}
                                 />
                                </div>

                        </div>
                        <div>
                            <input type="submit" value="Select Venue" onClick={e=>handleSubmit(e, value.venues_id)} />
                        </div>
                            </div>
                            
                            {/* <div className="description">{subEvent.description !== null ? subEvent.description : ''}</div> */}
                            
                        
            
                    </div>
                    )
                  })
                  setvenues(renderComp)
            }
            
        })
        .catch((err)=> showBoundary(err))

}, [])


const handleSubmit = (e, id) => {
    e.preventDefault();

    const dataVenue = {
        venue_id: id,
        appl_id: stateData
    }
      

        Axios({
          method: 'POST',
          url: 'http://153.92.5.199:5000/add_venue',
          withCredentials: true,
          data: dataVenue
      }).then(res=>{

        if(res.data.status){
          
          alert('Venue successfully selected')
          console.log(stateData)
          
          navigate(`/sub_event`,{
            state: 
              stateData
            
          } )
        }
      }).catch((err)=> showBoundary(err))
    }

  


    return(
        <><Navbar loguser={logUser} />
        <div><h1>Select Venue: </h1></div>
        <div>{venues}</div>

        </>
    );


};


export default Venues;