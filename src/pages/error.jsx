import React from "react";


const ErrorPage = (props) => {
    const {error, resetErrorBoundary } = props
    console.log(error)
    return(
        <div>
        <p>Error: {(error.status) ? error.status : 503}:</p>
        <p>{error.message} {(error.status === 500)? '': ', Server unavailable'}</p>
        <button onClick={resetErrorBoundary}>Reload Page</button>
        <button onClick={window.history.back()}>Previous Page</button>
      </div>
    )
}

export default ErrorPage;