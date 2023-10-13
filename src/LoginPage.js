// LoginPage.js
import React, { Component } from 'react';
import './LoginPage.css'
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleLogin = () => {
    const { username, password } = this.state;
    
   //POST TO LOGIN.php

    console.log('Username:', username);
    console.log('Password:', password);
  }

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
       	<div class = "LowerLogin">
	    <p>  Are you a new Big Fella? click here to get SWOLE </p>
	    <p> Big Fellas Inc© </p>
	 </div>
	</div>
      </div>
    );
  }
}

export default LoginPage;
