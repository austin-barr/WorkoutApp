import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenicated] = useState(false)
    const [res, setRes] = useState('')

    const checkAuth = async () => {
      console.log('check auth app')
      try {
        const response = await fetch("/api/check_auth", {
          method: "GET",
          mode: "cors"
        });

        setRes(response)

        if (response) {
            setIsAuthenicated(true)
        }
      }
      catch (err) {
        throw err
      }
    };

    checkAuth();
      
    console.log('isauthenicated')
    console.log(isAuthenticated)
    const result = isAuthenticated ? children : <Navigate to="/"/>
    return result;
};

export default ProtectedRoute;