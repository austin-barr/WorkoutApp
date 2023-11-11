import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import login from './LoginPage.module.css'
import Navbar from "../Navbar/Navbar";

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let data = {
        "username": username,
        "password": password
    };

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        mode: "cors",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        console.error(`Error: ${response.statusText}`);
        return;
      }

      const responseData = await response.json();
      console.log(responseData.token);
      localStorage["token"] = responseData.token;

      }
      catch (err) {
        console.error("Error:", err);
      }
    };

  return (
    <div className={"id-flex justify-content-center align-items-center " + login.body} >
    <form className="col-md-5" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px' }}>
    <h1>Big Fellas</h1>
    <div className="p-4">
      <div className="form-group">
        <label class = "text-primary">Username:</label>
        <input type="text" className="form-control" id="username" value={username} onChange={(event) => setUsername(event.target.value)} />
      </div>
      <div className="form-group">
        <label class = "text-primary">Password:</label>
        <input type="password" className="form-control" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </div>
      <p></p>
      <button onClick={handleSubmit} type="submit" className="btn btn-primary">Login</button>
      <div style={{ marginTop: '10px' }}>
        <Link to="/register">New user? Click here</Link>
      </div>
      </div>
    </form>
  </div>
);
}
export default LoginPage;