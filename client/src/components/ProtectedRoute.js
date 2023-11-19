import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authCheckComplete, setAuthCheckComplete] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/check_auth", {
          method: "GET",
          mode: "cors"
        });

        console.log(response);
        console.log(response.ok);

        if (response.ok) {
          setIsAuthenticated(true);
        }
      } catch (err) {
        throw err;
      } finally {
        setAuthCheckComplete(true);
      }
    };

    checkAuth();
  }, []);

  if (!authCheckComplete) {
    return null;
  }

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
