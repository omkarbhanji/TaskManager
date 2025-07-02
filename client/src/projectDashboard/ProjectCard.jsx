import React from 'react'
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Navigate, useNavigate } from 'react-router-dom';

const ProjectCard = ({project}) => {
  const navigate = useNavigate();

  const handleOpenProject = () => {
    navigate(`/projects/${project.id}`);
  };

  return (
    <div>
      <Card style={{ width: '18rem' }}>
      
      <Card.Body>
        <Card.Title>{project.name}</Card.Title>
        <Card.Text>
          {project.description}
        </Card.Text>
        <Button variant="primary" onClick={handleOpenProject}>Open</Button>
      </Card.Body>
    </Card>
    </div>
  )
}

export default ProjectCard
