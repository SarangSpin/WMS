import React from 'react';
import './App.css';
import {Link, Outlet, RouterProvider, createBrowserRouter} from 'react-router-dom'
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from './pages/error';
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/home';
import Appln1 from './pages/appl_userdetails';
import Appln2 from './pages/appl_main_event';
import AdminPage from './pages/admin';
import EmployeeReg from './pages/employeereg';
import DbInfo from './pages/dbinfo';
import Planner from './pages/planner';
import OsManager from './pages/osm';
import SubEvent from './pages/appl_subEvent';
import TaskForm from './pages/add_task';
import TaskView from './pages/task_view';
import SubEventForm from './pages/subEvent_Form';
import SubEventDisplay from './pages/sub_event_display';
import PlannerView from './pages/planner_view';
import PlannerSubEvent from './pages/planner_sub_events';
import Venues from './pages/venues';
import AddVendor from './pages/add_vendor';

function App() {
  
  
  const Layout = () => {
    return(
      <ErrorBoundary FallbackComponent={ErrorPage}>
      
      <Outlet />
      
      </ErrorBoundary>

    )
  }
  const router = createBrowserRouter([
    {
      path: '/admin',
      element: <ErrorBoundary FallbackComponent={ErrorPage}><AdminPage/></ErrorBoundary>
    }
    ,
    {
      path: '/admin/info',
      element: <ErrorBoundary FallbackComponent={ErrorPage}><DbInfo /></ErrorBoundary>
    },
    {
      path: '/admin/vendor',
      element: <ErrorBoundary FallbackComponent={ErrorPage}><AddVendor /></ErrorBoundary>
    },
    {
      path: '/admin/employee_register',
      element: <ErrorBoundary FallbackComponent={ErrorPage}><EmployeeReg /></ErrorBoundary>
      
    },
    {
    path: '/',
    element: <ErrorBoundary FallbackComponent={ErrorPage}><Home /></ErrorBoundary>

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
    path: '/sub_event',
    element: <ErrorBoundary FallbackComponent={ErrorPage}><SubEvent /></ErrorBoundary>
  },
  {
    path: '/sub_event/form',
    element: <ErrorBoundary FallbackComponent={ErrorPage}> <SubEventForm /> </ErrorBoundary>
  },
  {
    path: 'sub_event/show',
    element: <ErrorBoundary FallbackComponent={ErrorPage}> <SubEventDisplay /> </ErrorBoundary>
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
    path: '/operations',
    element: <ErrorBoundary FallbackComponent={ErrorPage}><OsManager /></ErrorBoundary>
  },
  {
    path: '/planner',
    element: <ErrorBoundary FallbackComponent={ErrorPage}><Planner /></ErrorBoundary>
  },
  {
    path: 'planner/show',
    element: <ErrorBoundary FallbackComponent={ErrorPage}><PlannerView /></ErrorBoundary>
  },
  {
    path: 'planner/show/sub_events',
    element: <ErrorBoundary FallbackComponent={ErrorPage}><PlannerSubEvent /></ErrorBoundary>
  },
  {
    path: 'planner/show/sub_events/add_task',
    element: <ErrorBoundary FallbackComponent={ErrorPage}><TaskForm /></ErrorBoundary>
  },
  {
    path: 'planner/show/sub_events/tasks',
    element: <ErrorBoundary FallbackComponent={ErrorPage}><TaskView /></ErrorBoundary>
  },
  {
    path: '/select_venue',
    element: <ErrorBoundary FallbackComponent={ErrorPage}><Venues /></ErrorBoundary>
  },


  {
    path: '*',
    element: 
    <ErrorBoundary FallbackComponent={ErrorPage}><div>
    <p>Error: 404</p>
    <p>Page not found</p>
    <Link to={'/'}>Return to home Page</Link>
  </div></ErrorBoundary>
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
