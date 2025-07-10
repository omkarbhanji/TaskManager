import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './NewTask.css';

const AddNewTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const parentIdFromQuery = queryParams.get('parent');

  console.log(parentIdFromQuery);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assigned_to: '',
    estimated_hours: '',
    estimated_minutes: '',
    parent_task_id: parentIdFromQuery || ''
  });

  useEffect(() => {
    if (parentIdFromQuery) {
      setNewTask(prev => ({ ...prev, parent_task_id: parentIdFromQuery }));
    }
  }, [parentIdFromQuery]);

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    // const estimated_time = {
    //   hours: Number(newTask.estimated_hours),
    //   minutes: Number(newTask.estimated_minutes)
    // };

    try {
      await axios.post(
        `http://localhost:5000/api/projects/${id}/tasks`,
        {
        
          title: newTask.title,
          description: newTask.description,
          assigned_to: newTask.assigned_to,
          estimated_time: newTask.estimated_hours,
          parent_task_id: newTask.parent_task_id || null
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Task created successfully!");
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Error creating task");
    }
  };

  return (
    <div className="add-task-page">
      <h2>Add New Task</h2>
      <form onSubmit={handleAddTask} className="add-task-form">
        <input type="text" name="title" placeholder="Title" value={newTask.title} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={newTask.description} onChange={handleChange} required />
        <input type="text" name="assigned_to" placeholder="Assigned To (User ID)" value={newTask.assigned_to} onChange={handleChange} required />
        <input type="time" name="estimated_hours" placeholder="Estimated Hours" value={newTask.estimated_hours} onChange={handleChange} />
        {/* <input type="number" name="estimated_minutes" placeholder="Estimated Minutes" value={newTask.estimated_minutes} onChange={handleChange} /> */}
        <input type="number" name="parent_task_id" placeholder="Parent Task ID" value={newTask.parent_task_id} onChange={handleChange} readOnly={!!parentIdFromQuery} />
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default AddNewTask;
