import React from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    
    if(token) return true;
    
  } catch (e) {
    return false;
  }
};

const ProtectedRoute = ({ children, requiredRoles }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);

  const userRoles = Array.isArray(decoded.role) ? decoded.role : [decoded.role];

  console.log("User Roles:", userRoles);
  console.log("Required Roles:", requiredRoles);

  const hasAccess = userRoles.some(role => requiredRoles.includes(role));

  if (!hasAccess) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;