import React from 'react';
import './App.css';
import {Link, Outlet, RouterProvider, createBrowserRouter} from 'react-router-dom'
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from './pages/error';
import Register from './pages/Register/Register'
import Navbar from './pages/navbar';
import Login from './pages/Login/Login'
import Home from './pages/home';
import Appln1 from './pages/Application/app_page1';
import Appln2 from './pages/Application/app_page2';


function App() {
  
  
  const Layout = () => {
    return(
      <ErrorBoundary FallbackComponent={ErrorPage}>
      <Navbar />
      <Outlet />
      
      </ErrorBoundary>

    )
  }
  const router = createBrowserRouter([{
    path: '/',
    element: <Layout />,
    children: [{
      path: '/',
      element: <Home />

    }]
  },
  {
    path: '/login',
    element: <ErrorBoundary FallbackComponent={ErrorPage}><Login /></ErrorBoundary>
  },
  {
    path: '/register',
    element: <ErrorBoundary FallbackComponent={ErrorPage}><Register /></ErrorBoundary>
  },
{
  path:'/appl1',
  element: <ErrorBoundary FallbackComponent={ErrorPage}><Appln1 /></ErrorBoundary>
},
{
  path:'/appl2',
  element: <ErrorBoundary FallbackComponent={ErrorPage}><Appln2 /></ErrorBoundary>
},
{
  path: '*',
  element: <div>
    <p>Error: 404</p>
    <p>Page not found</p>
    <Link to={'/'}>Return to home Page</Link>
  </div>
}
]
  )



  return (
    <div className="App">
       
     <div className="container">
    <RouterProvider router={router} />
    
      
     
      
        
      </div>
      
      
    </div>
  );
}






export default App;
