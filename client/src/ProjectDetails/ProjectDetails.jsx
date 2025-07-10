import React from "react";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from "axios";
import './ProjectDetails.css';
import { useNavigate } from "react-router-dom";



const ProjectDetails = () => {
  const navigate = useNavigate();
    const {id} = useParams();
    const [tasks, setTasks] = useState([]);
    const [selectedTaskId, setselectedTaskId] = useState('');
    const[project, setProject] = useState({});
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const userRole = decoded.role;
  const userId = decoded.id;

  useEffect(()=>{
    const fetchData = async(req, res) => {
        try{
            const projectDetails = await axios.get(`http://localhost:5000/api/projects/${id}`, 
                {headers: {Authorization : `Bearer ${token}`}});

            
                setProject(projectDetails.data.project);
                console.log(project);
            

            const tasksRelated = await axios.get(`http://localhost:5000/api/projects/${id}/tasks`,
                {headers: {Authorization : `Bearer ${token}`}}
            );
            console.log(tasksRelated.data.response.rows);
            setTasks(tasksRelated.data.response.rows);
            

        }catch(err){
            console.log(err);
        }
    };

    fetchData();
  }, [id, token]);

  const markTaskCOmpleted = async(taskId)=>{
    const token = localStorage.getItem('token');

  try {
    const res = await axios.put(
      `http://localhost:5000/api/tasks/${taskId}/complete`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    alert(res.data.message);
    window.location.reload();

    
 
  } catch (err) {
    alert(err.response?.data?.message || "Error updating task");
    console.error(err);
  }
  }

    


  const formatEstimatedTime = (timeObj) => {
  if (!timeObj || typeof timeObj !== 'object') return 'N/A';

  const parts = [];
  if (timeObj.hours) parts.push(`${timeObj.hours}h`);
  if (timeObj.minutes) parts.push(`${timeObj.minutes}m`);
  if (timeObj.seconds) parts.push(`${timeObj.seconds}s`);

  return parts.length ? parts.join(' ') : `${timeObj.seconds}s`;
};

  return( 
  <div className="project-details">
    <h2>Project Name: {project.name}</h2>
    <p>Project description: {project.description}</p>
    
    <h3>Tasks</h3>
    {tasks.length === 0 && <p>No tasks yet.</p>}

    {tasks.map((task)=>(

        <div key = {task.id} className="task-card">
            
            <h4>{task.title}</h4>
            <h5>Task Id: {task.id}</h5>
            <p>Description: {task.description}</p>
            <p>Estimated Time: {formatEstimatedTime(task.estimated_time)}</p>
            <p>Assigned To: {task.assigned_to}</p>
            <p>Created At: {task.created_at}</p>
            <p>Parent Task Id : {task.parent_task_id ? task.parent_task_id : 'Independent Task'}</p>
          <p>Status: {task.is_completed ? '✅ Completed' : '❌ Not Completed'}</p>

          {userRole === 'Employee' && task.assigned_to===userId && !task.is_completed &&
          (<button onClick={()=> markTaskCOmpleted(task.id)}> mark as completed</button>)}

          {userRole === 'Manager' && (
        <button onClick={()=>{
          setselectedTaskId(task.id)
          navigate(`/projects/${id}/add-task?parent=${task.id}`)
        }}>Add Child Task</button>
    )}
         </div>   

    ))}

    {userRole === 'Manager' && (
        <button onClick={() => navigate(`/projects/${id}/add-task`)} >Add new Task</button>
    )}
  </div>
  );
};

export default ProjectDetails;
