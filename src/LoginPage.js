// LoginPage.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './bootstrap.css';
import axios from 'axios';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://192.168.57.6:3001/api/login', { username, password });
      localStorage.setItem('token', response.data.token);
      // Redirect to protected route
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundImage: "url('barbell.png')", backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
    <form onSubmit={handleSubmit} className="col-md-5" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px' }}>
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
      <button type="submit" className="btn btn-primary">Login</button>
      <div style={{ marginTop: '10px' }}>
        <Link to="/register">New user? Click here</Link>
      </div>
      </div>
    </form>
  </div>
);
}
export default LoginPage;


