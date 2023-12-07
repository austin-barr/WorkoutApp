import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import login from './LoginPage.module.css'

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateInputs()) {
      console.log("input validaton failed")
      return
    }

    let data = {
        "username": username,
        "password": password
    };

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        mode: "cors",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      console.log("response here:")
      console.log(response)
      if (!response.ok) {
        console.error(`Error: ${response.statusText}`);
        setUsernameError('Incorrect username or password')
        setPasswordError('Incorrect username or password')
        return;
      }

      const responseData = await response.json();
      console.log(responseData.token);
      //localStorage["token"] = responseData.token

      window.location = "/home"

      }
      catch (err) {
        console.error("Error:", err);
      }
    };

    const validateInputs = () => {
      let isValid = true;

      if (!username.trim()) {
        setUsernameError('Enter username');
        isValid = false;
      }

      if (!password.trim()) {
        setPasswordError('Enter password')
        isValid = false;
      }
  
      return isValid
    }

  return (
    <div className={"id-flex justify-content-center align-items-center " + login.body} >
      <form className="form-container">
        <h1>Big Fellas</h1>
        <div className="p-4">
          <div className="form-group">
            <label class = "text-primary">Username:</label>
            <input type="text" className="form-control" id="username" value={username}
              onChange={(event) => {
                setUsername(event.target.value.replace(/\s/g, ''));
                setUsernameError('');
              }}
            />
            <div className="form-error-container">
              <small className="text-danger form-error-message">{usernameError}</small>
            </div>
          </div>
          <div className="form-group">
            <label class = "text-primary">Password:</label>
            <input type="password" className="form-control" id="password" value={password}
              onChange={(event) => {
                    setPassword(event.target.value.replace(/\s/g, ''));
                    setPasswordError('');
                  }}
            />
            <div className="form-error-container">
              <small className="text-danger form-error-message">{passwordError}</small>
            </div>
          </div>
          <button onClick={handleSubmit} type="submit" className="btn btn-primary form-control">Login</button>
          <div style={{ marginTop: '10px' }}>
            <Link to="/register">New user? Click here</Link>
          </div>
        </div>
      </form>
    </div>
);
}
export default LoginPage;