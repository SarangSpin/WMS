import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './htmlfiles/existingEvents.css'
import 'bootstrap/dist/css/bootstrap.min.css';
const ExistingEvents = () => {
    const event=[{
        name:"Sarang Weds XDXDXD",
        date:"24-12-2023-30-12-2023",
        image:"https://cdn.pixabay.com/photo/2014/11/13/17/04/heart-529607_1280.jpg",
        venue:"Hyderabad",
        coordinator:"Sarang"
    }];
  return (
    <div className='existing'>
    {event.map((objectMapped)=>(
        <Card style={{ width: '18rem',background:"rgb(244, 241, 241)" }}>
      <Card.Img variant="top" src={objectMapped.image} />
      <Card.Body>
        <Card.Title>{objectMapped.name}</Card.Title>
        <Card.Text className='text'>
          <div>Location: {objectMapped.venue}</div>
          <div>Dates:{objectMapped.date}</div>
          <div>Coordinator:{objectMapped.coordinator}</div>
        </Card.Text>
        <Button variant="primary">More</Button>
      </Card.Body>
    </Card>
    ))}
    </div>
  )
}

export default ExistingEvents;
