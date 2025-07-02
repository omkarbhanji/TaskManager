import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Navigate, useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();


  return (
    <div>
      <div>
       <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Project Dashboard</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary" onClick={()=>{navigate('/project-dashboard')}}>Go to Project Dashboard</Button>
      </Card.Body>
    </Card>
    </div>
    </div>
  )
}

export default Home
