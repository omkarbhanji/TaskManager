import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login/login';
import SignUp from './SignUp/SignUp';
import ProjectDashboard from './projectDashboard/ProjectDashboard';
import Home from './Home';
import Unauthorized from './ErrorPages/Unauthorized';
import ProtectedRoute from './ProtectedRoutes';
import ProjectDetails from './ProjectDetails/ProjectDetails';

function App() {
  

  return (
   <div className='App'>
    <Router>
      <Routes>
        <Route path = '/signup' element = {<SignUp/>} />
        <Route path = '/login' element = {<Login/>} />
        <Route path='/project-dashboard' element = {<ProtectedRoute requiredRoles={['Manager', 'Employee']}><ProjectDashboard/></ProtectedRoute>} />
        <Route path = '/unauthorized' element = {<Unauthorized/>} />
        <Route path='/projects/:id' element = {<ProjectDetails/>} />
        <Route path='/' element = {<Home/>} />
      </Routes>
    </Router>
   </div>
  )
}

export default App
