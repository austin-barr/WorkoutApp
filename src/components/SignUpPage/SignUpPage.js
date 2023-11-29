// SignUpPage.js
import photo from "../../static/huge.png";
import React, { Component } from "react";
import "../bootstrap.css";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
class SignUpPage extends Component {
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

  handleSignUp = () => {
    const {
      username,
      password,
      confirmPassword,
      phoneNumber,
      birthday,
      email,
    } = this.state;

    //POST TO login.JS
    try {
      const response = fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          confirmPassword,
          phoneNumber,
          birthday,
          phoneNumber,
          email,
        }),
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
    console.log("Phone Number:", phoneNumber);
    console.log("birthday:", birthday);
  };

  render() {
    return (
      <div
        class="page-sup"
        className="h-100 d-flex flex-column justify-content-center align-items-center"
        style={{padding: "50px" }}
      >
        <Navbar />
        {/* call an image */}
        <form
          class="SignUpContainer"
          className="h-100 d-flex flex-column justify-content-center "
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: "25px",
          }}
        >
          <div class="UpperSignIn">
            <h2>So, you wanna become a Big Fella©</h2>
            <p> You better not be slacking, SIGN UP NOW! </p>
          </div>
          <div>
            <label>Username:</label>
            <input
              className="form-control"
              name="username"
              value={this.state.username}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label> Confirm Password:</label>
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              value={this.state.confrimPassword}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Phone Number:</label>
            <input
              className="form-control"
              type="tel"
              name="PhoneNumber"
              value={this.state.phoneNumber}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Birthday:</label>
            <input
              type="date"
              className="form-control"
              name="Birthday"
              value={this.state.birthday}
              onChange={this.handleInputChange}
            />
          </div>
          <button onClick={this.handleSignUp} className="btn btn-primary">
            Sign Up
          </button>
          <div class="LowerSignUp">
            <p>
              {" "}
              Already a Big Fella? click here to prove your{" "}
              <Link to="/"> Swoleness</Link>{" "}
            </p>
            <p> Big Fellas Inc© </p>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUpPage;
