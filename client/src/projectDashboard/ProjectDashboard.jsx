import axios from "axios";
import React from "react";
import './ProjectDashboard.css';
import ProjectCard from "./ProjectCard";
import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";

const ProjectDashboard =  (req, res) => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get('http://localhost:5000/api/projects', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log(response.data);
        setProjects(response.data.rows); 
      } catch (error) {
        console.error('Error fetching projects:',error.message);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectClick = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  return (
    <div className="dashboard-container">
      <h2>All Projects</h2>
<div className="project-cards-grid">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project ={project}
          onClick = {handleProjectClick}
        />
      ))}
  </div>
    </div>
  );
};

export default ProjectDashboard;
