import React from 'react';
import './App.css';
import {Outlet, RouterProvider, createBrowserRouter} from 'react-router-dom'

import Register from './pages/Register/Register'
import Navbar from './pages/navbar';
import Login from './pages/Login/Login'
import Home from './pages/home';
import Appln1 from './pages/Application/app_page1';
import Appln2 from './pages/Application/app_page2';

function App() {
  
  
  const Layout = () => {
    return(
      <>
      <Navbar />
      <Outlet />
      </>

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
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
{
  path:'/appl1',
  element: <Appln1 />
},
{
  path:'/appl2',
  element: <Appln2 />
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
