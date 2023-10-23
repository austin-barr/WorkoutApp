// SignUpPage.js
import photo from "../../static/huge.png";
import React, { Component } from "react";
import "./SignUpPage.css";
import { Link } from "react-router-dom";
class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  handleInputChange = (event) => {
    const { name, value, confirmPassword, phoneNumber, birthday, email } =
      event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSignUp = () => {
    const {
      username,
      password,
      confirmPassword,
      phoneNumber,
      birthday,
      email,
    } = this.state;

    //POST TO SignUp.JS
    try {
      const response = fetch("/api/SignUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        console.log("SignUp Successful");
      } else {
        console.log("SignUp Failed");
      }
    } catch (error) {
      console.log(error);
    }

    console.log("Username:", username);
    console.log("Password:", password);
    console.log("confrim Password:", confirmPassword);
    console.log("Email:", email);
    console.log("Phone Number:", toString());
    console.log("birthday:", Date.toString(birthday));
  };

  render() {
    return (
      <div class="page-sup">
        {/* call an image */}
        <div class="SignUpContainer">
          <div class="UpperSignIn">
            <h2>So, you wanna become a Big Fella©</h2>
            <p> You better not be slacking, SIGN UP NOW! </p>
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
          <div>
            <label> Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={this.state.confrimPassword}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Phone Number:</label>
            <input
              type="text"
              name="PhoneNumber"
              value={this.state.phoneNumber}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Birthday:</label>
            <input
              type="date"
              name="Birthday"
              value={this.state.birthday}
              onChange={this.handleInputChange}
            />
          </div>
          <button onClick={this.handleSignUp}>SignUp</button>
          <div class="LowerSignUp">
            <p>
              {" "}
              Already a new Big Fella? click here to prove your{" "}
              <Link to="/"> Swoleness</Link>{" "}
            </p>
            <p> Big Fellas Inc© </p>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUpPage;
