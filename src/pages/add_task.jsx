import Axios  from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {useErrorBoundary } from "react-error-boundary";
import Navbar from "./navbar";


const TaskForm = () => {
  const stateData = useLocation();
  const sub_event_id = stateData.state;

  const {showBoundary} = useErrorBoundary()
    const [logUser, setloguser] = useState(null)

   const [flash, setflash] = useState('');
    const [task_name, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [task_status, setTaskStatus] = useState('');

  
  function formatTime(inputTime) {
    const timeParts = inputTime.split(':');
    const hour = timeParts[0];
    const minute = timeParts[1];
    return `${hour}:${minute}:00`;
  }

    const handleTaskNameChange = (event) => {
      setTaskName(event.target.value);
    };
  
    const handleDescriptionChange = (event) => {
      setDescription(event.target.value);
    };
  
    const handleDeadlineChange = (event) => {
      setDeadline(formatTime(event.target.value));
    };

  
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
    

    
  }, [])
  


  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any necessary actions with the form data
    
    
    let data3 = [
      sub_event_id,
      task_name,
      description,
      deadline,
      task_status
    ]
    
    console.log(data3)
    if (data3.includes(null)){
      setflash('Fill the required fields')
      navigate('/planner/show/sub_events/add_task', {
        state: sub_event_id
      })

    }
    else{
      const newAppl = {
        sub_event_id: sub_event_id,
        task_name: task_name,
      description: description,
      deadline: deadline,
      task_status: task_status
        
        };
        Axios({
          method: 'POST',
          url: 'http://153.92.5.199:5000/add_task',
          withCredentials: true,
          data: newAppl
      }).then(res=>{
        if(res.data.status){
          alert('Task is successfully registered')
          navigate(`/planner`)
        }
      })
    }
  };

    return(

        <>
        <Navbar loguser = {logUser} />
        <div>
          <div>{flash}</div>
      <label>Task Name:</label>
      <input type="text" value={task_name} onChange={handleTaskNameChange} />

      <label>Description:</label>
      <textarea value={description} onChange={handleDescriptionChange} />

      <label>Deadline:</label>
      <input type="time" value={deadline} onChange={handleDeadlineChange} />

      <input type="submit" value="Submit" onClick={e=>handleSubmit(e)}/>
      

  
    </div>
        </>

    );
}

export default TaskForm;
