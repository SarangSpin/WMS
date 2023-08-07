import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './htmlfiles/existingTasks.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const ExistingTasks = () => {
    const task=[{
        name:"Flower Decoration",
        vendor:"Satish",
        endtime:"5pm",
        image:"https://cdn.pixabay.com/photo/2014/11/13/17/04/heart-529607_1280.jpg",
        status: "Not Started"
        
    }];
  return (
    <div className='existing'>
    {task.map((objectMapped)=>(
        <Card style={{ width: '18rem',background:"rgb(244, 241, 241)" }}>
      <Card.Img variant="top" src={objectMapped.image} />
      <Card.Body>
        <Card.Title>{objectMapped.name}</Card.Title>
        <Card.Text className='text'>
          <div>Vendor: {objectMapped.vendor}</div>
          
          <div>End-Timing:{objectMapped.endtime}</div>
          <div>Current Status:{objectMapped.status}</div>
        </Card.Text>
        <Button variant="primary">Back</Button>
      </Card.Body>
    </Card>
    ))}
    </div>
  )
}

export default ExistingTasks;
