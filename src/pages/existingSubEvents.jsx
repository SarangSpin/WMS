import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './htmlfiles/existingSubEvents.css'
import 'bootstrap/dist/css/bootstrap.min.css';
const ExistingSubEvents = () => {
    const sub_event=[{
        name:"Reception",
        date:"24-12-2023",
        time:"6pm-10pm",
        image:"https://cdn.pixabay.com/photo/2014/11/13/17/04/heart-529607_1280.jpg",
        sub_venue:"SSS Banquet Hall",
        field_coordinator:"Sarang"
        
    }];
  return (
    <div className='existing'>
    {sub_event.map((objectMapped)=>(
        <Card style={{ width: '18rem',background:"rgb(244, 241, 241)" }}>
      <Card.Img variant="top" src={objectMapped.image} />
      <Card.Body>
        <Card.Title>{objectMapped.name}</Card.Title>
        <Card.Text className='text'>
          <div>Sub-Venue: {objectMapped.sub_venue}</div>
          <div>Date:{objectMapped.date}</div>
          <div>Timing:{objectMapped.time}</div>
          <div>Coordinator:{objectMapped.field_coordinator}</div>
        </Card.Text>
        <Button variant="primary">More</Button>
        <Button variant="primary">Back</Button>
      </Card.Body>
    </Card>
    ))}
    </div>
  )
}

export default ExistingSubEvents;
