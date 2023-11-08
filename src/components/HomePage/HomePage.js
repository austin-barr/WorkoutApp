// HomePage.js
import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { startOfWeek, endOfWeek, format } from "date-fns";
// import "./HomePage.css";
import "../bootstrap.css";
import Navbar from "../SettingsBar/SettingsBar";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

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

    const data = {
      labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      datasets: [
        {
          id: 1,
          label: "Weight (lbs)",
          data: weights,
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
      <div>
        <Navbar />a{" "}
        {/* <nav>
          <a href="/home/" class="active">Home</a>
          <a href="/home/">My Progress</a>
          <a href="/home/">My Workouts</a>
          <a href="/home/">Find a Workout</a>
          <a href="/home/">Settings</a>
        </nav> */}
        <div id="grid-container" className="p4" data-bs-theme="dark">
          <div id="left-panel">left</div>
          <div id="header-container">
            <h1 id="today-header" className="h-100 d-inline-block">
              Today ({this.getDate()}):
            </h1>
          </div>
          <div id="main-panel">
            <div id="table-container">
              <div id="weight-label" class="table-item">
                Weight:
              </div>
              <div id="weight" class="table-item">
                {this.getWeight()}
              </div>
              <div id="weight-button-container" class="table-item">
                <button onClick={this.handleUpdateWeight} id="weight-button">
                  Update Weight
                </button>
              </div>
              <div id="duration-label" class="table-item">
                Time Spent:
              </div>
              <div id="duration" class="table-item">
                {this.getDuration()}
              </div>
              <div id="workout-button-container" class="table-item">
                <button onClick={this.handleLogWorkout} id="workout-button">
                  Log a Workout
                </button>
              </div>
            </div>
            <h1 id="week-header">This week ({this.getWeek()}):</h1>
            <div id="graphs-container">
              <div id="weight-graph-container">{this.getWeightGraph()}</div>
              <div id="duration-graph-container">{this.getDurationGraph()}</div>
            </div>
          </div>
          <div id="sign-out-container">
            <button onClick={this.handleSignOut} id="sign-out-button">
              Sign Out
            </button>
          </div>
          <div id="right-panel">right</div>
        </div>
      </div>
    );
  }
}

export default HomePage;
