import React from 'react';
import { Route, Navigate } from 'react-router-dom';


const checkAuth = async () => {
    const response = await fetch("/api/check_auth");
    if (response.isAuthenticated === true) {
        return true;
    }
  };


const ProtectedRoute = ({ children }) => {
    const isAuthenticated = checkAuth(); // Implement checkAuth to verify authentication

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default Route;