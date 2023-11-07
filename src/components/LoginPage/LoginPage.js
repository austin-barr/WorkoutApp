// LoginPage.js
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";
// import SignUpPage from '../SignUpPage/SignUpPage';
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSettings = () => {
    window.location.href = "/SettingsPage";
    console.log("Settings Clicked");
  };

  handleLogin = () => {
    const { username, password } = this.state;

    //POST TO LOGIN.JS
    try {
      const response = fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        console.log("Login Successful");
      } else {
        console.log("Login Failed");
      }
    } catch (error) {
      console.log(error);
    }

    console.log("Username:", username);
    console.log("Password:", password);
  };

  render() {
    return (
      <div>
        <div class="loginContainer">
          <div class="UpperSignIn">
            <h2>Big Fellas</h2>
            <p> You gonna sign in or just sit there? </p>
          </div>
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </div>
          <button onClick={this.handleLogin}>Login</button>
          <button onClick={this.handleSettings}>Settings</button>
          <div class="LowerLogin">
            <p> Big Fellas Inc© </p>
            So You want to become a be fella? Click here to get{" "}
            <Link to="SettingsPage"> Swole</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
