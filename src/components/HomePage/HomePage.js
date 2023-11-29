// HomePage.js
import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { startOfWeek, endOfWeek, format } from "date-fns";
// import "./HomePage.css";
import "../bootstrap.css";
import Navbar from "../Navbar/Navbar.js";
import { Calendar } from "@fullcalendar/core";
import {myCalendar} from "../Calendar/DemoApp.js";
/// calendar
import { createRoot } from 'react-dom/client'
// import DemoApp from './DemoApp'
import { render } from 'react-dom'


class HomePage extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     username: "",
  //     password: "",
  //   };
  // }

  //myCalendar = new Calendar();

  handleUpdateWeight = (event) => {
    console.log("weight pressed");
  };

  handleLogWorkout = (event) => {
    console.log("workout pressed");
  };

  handleSignOut = (event) => {
    // handle signing out, send something to backend?

    window.location = "/";
  };

  formatDate(date) {
    let dd = String(date.getDate()).padStart(2, "0");
    let mm = String(date.getMonth() + 1).padStart(2, "0");
    let yy = String(date.getFullYear()).slice(-2);

    let fDate = mm + "/" + dd + "/" + yy;
    return fDate;
  }

  getDate = (date) => {
    let today = new Date();
    return this.formatDate(today);
  };

  getWeek = () => {
    let today = new Date();
    let start = startOfWeek(today);
    let end = endOfWeek(today);

    return this.formatDate(start) + " - " + this.formatDate(end);
  };

  getWeight = () => {
    return "150 lbs";
  };

  getDuration = () => {
    return "120 min";
  };

  getWeightGraph = () => {
    let today = new Date();
    let start = startOfWeek(today);
    let end = endOfWeek(today);
    // get weights from weight history
    let weights = [150, 150, 151, 152];
    
    // document.addEventListener('DOMContentLoaded', function() {
    //   createRoot(document.body.appendChild(document.createElement('div')))
    //     .render(<DemoApp />)
    // })

    const data = {
      labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      datasets: [
        {
          id: 1,
          label: "Weight (lbs)",
          data: weights,
          borderColor: 'rgb(0, 0, 0)',
          backgroundColor: 'rgba(0, 0, 0, 1)'
        },
      ],
    };
    const options = {
      scales: {
        yAxis: {
          min: Math.min(...weights) - 5,
          max: Math.max(...weights) + 5,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    };
    return <Line options={options} data={data} />;
  };

  getDurationGraph = () => {
    // get durations from weight history
    let durations = [90, 0, 90, 60];

    const data = {
      labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      datasets: [
        {
          id: 1,
          label: "Time Spent (min)",
          data: durations,
          borderColor: 'rgb(0, 0, 0)',
          backgroundColor: 'rgba(0, 0, 0, 1)'
        },
      ],
    };
    const options = {
      scales: {
        yAxis: {
          min: Math.max(Math.min(...durations) - 30, 0),
          max: Math.max(...durations) + 30,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    };
    return <Line options={options} data={data} />;
  };

  render() {
    return (
      <div className="d-flex justify-content-center align-items-center w-auto p-3">
        <Navbar />a{" "}
        {/* <nav>
          <a href="/home/" class="active">Home</a>
          <a href="/home/">My Progress</a>
          <a href="/home/">My Workouts</a>
          <a href="/home/">Find a Workout</a>
          <a href="/home/">Settings</a>
        </nav> */}
        <form
          className="h-100 d-flex flex-column justify-content-center align-items-center"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: "25px",
          }}
        >
          <div id="grid-container" className="p4" data-bs-theme="dark">
            <div id="header-container ">
              <h1 id="today-header" className="h-100 d-inline-block">
                Today ({this.getDate()}):
              </h1>
            </div>
            <div id="main-panel">
              <div id="table-container">
                <label class="text-primary">Weight:</label>
                <input
                  className="form-control"
                  id="weight"
                  style={{ color: "black" }}
                />
                <div id="weight-button-container" class="table-item">
                  <button
                    onClick={this.handleUpdateWeight}
                    id="weight-button"
                    className="btn btn-primary"
                  >
                    Update Weight
                  </button>
                </div>
                <label class="text-primary">Duration:</label>
                <input
                  className="form-control"
                  id="duration"
                  style={{ color: "black" }}
                />
                <myCalendar />
                {/* <div id="duration" class="table-item">
                  {this.getDuration()}
                </div> */}
                <div id="workout-button-container" class="table-item">
                  <button
                    onClick={this.handleLogWorkout}
                    id="workout-button"
                    className="btn btn-primary"
                  >
                    Log a Workout
                  </button>
                </div>
              </div>
              <h1 id="week-header">This week ({this.getWeek()}):</h1>
              <div id="graphs-container">
                <div id="weight-graph-container">{this.getWeightGraph()}</div>
                <div id="duration-graph-container">
                  {this.getDurationGraph()}
                </div>
              </div>
            </div>
            {/* <div id="sign-out-container">
              <button onClick={this.handleSignOut} id="sign-out-button" className="btn btn-secondary">
                Sign Out
              </button> */}
            {/* </div> */}
          </div>
        </form>
      </div>
    );
  }
}

export default HomePage;
