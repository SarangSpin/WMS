import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";


const ErrorPage = (props) => {
    const {error, resetErrorBoundary } = props
    const [details, showdetails] = useState(false)
    console.log(error)

    const handleClick = (e) =>{
      e.preventDefault()
      if(details){
        showdetails(false)
      }
      else{
        showdetails(true)
      }
    }
    return(
        <div>
        <p>Error: {(error.status) ? error.status : 503}:</p>
        <p>{error.message} {(error.status === 500)? '': ', Server unavailable'}</p>
        <button onClick={resetErrorBoundary}>Reload Page</button>
        <Link onClick={handleClick}>Show details</Link>
        {/* <button onClick={window.history.back()}>Previous Page</button> */}
        <div>{details? <div>{error}</div> : <div></div> }</div>
      </div>
    )
}

export default ErrorPage;