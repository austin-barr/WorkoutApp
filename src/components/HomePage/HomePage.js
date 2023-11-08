import React, { useState } from 'react';
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import { startOfWeek, endOfWeek, format } from 'date-fns'
import './HomePage.css'

function HomePage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUpdateWeight = (event) => {
    console.log("weight pressed");
  }

  const handleLogWorkout = (event) => {
    console.log("workout pressed");
  }

  const handleSignOut = (event) => {
    // handle signing out, send something to backend?
    window.location = "/";
  }

  const formatDate = (date) => {
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0');
    let yy = String(date.getFullYear()).slice(-2);

    let fDate = mm + '/' + dd + '/' + yy;
    return fDate;
  }

  const getDate = (date) => {
    let today = new Date();
    return formatDate(today);
  }

  const getWeek = () => {
    let today = new Date()
    let start = startOfWeek(today)
    let end = endOfWeek(today)

    return formatDate(start) + " - " + formatDate(end);
  }

  const getWeight = () => {
    return "150 lbs";
  }

  const getDuration = () => {
    return "120 min";
  }

  const getWeightGraph = () => {
    let today = new Date()
    let start = startOfWeek(today)
    let end = endOfWeek(today)
    // get weights from weight history
    let weights = [150, 150, 151, 152]

    const data = {
      labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      datasets: [
        {
          id: 1,
          label: 'Weight (lbs)',
          data: weights,
        },
      ],
    };
    const options = {
      scales: {
        yAxis: {
          min: Math.min(...weights) - 5,
          max: Math.max(...weights) + 5,
        }
      },
      responsive: true,
      maintainAspectRatio: false
    };
    return <Line options={options} data={data} />;
  }

  const getDurationGraph = () => {
    // get durations from weight history
    let durations = [90, 0, 90, 60]

    const data = {
      labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      datasets: [
        {
          id: 1,
          label: 'Time Spent (min)',
          data: durations,
        },
      ],
    };
    const options = {
      scales: {
        yAxis: {
          min: Math.max(Math.min(...durations) - 30, 0),
          max: Math.max(...durations) + 30,
        }
      },
      responsive: true,
      maintainAspectRatio: false
    };
    return <Line options={options} data={data} />;
  }

  return (
    <div>
      <nav>
        <a href="/home/" className="active">Home</a>
        <a href="/home/">My Progress</a>
        <a href="/home/">My Workouts</a>
        <a href="/home/">Find a Workout</a>
        <a href="/home/">Settings</a>
      </nav>
      <div id="grid-container">
        <div id="left-panel">
          left
        </div>
        <div id="header-container">
          <h1 id="today-header">Today ({getDate()}):</h1>
        </div>
        <div id="main-panel">
          <div id="table-container">
            <div id="weight-label" className="table-item">Weight:</div>
            <div id="weight" className="table-item">{getWeight()}</div>
            <div id="weight-button-container" className="table-item">
              <button onClick={handleUpdateWeight} id="weight-button">Update Weight</button>
            </div>
            <div id="duration-label" className="table-item">Time Spent:</div>
            <div id="duration" className="table-item">{getDuration()}</div>
            <div id="workout-button-container" className="table-item">
              <button onClick={handleLogWorkout} id="workout-button">Log a Workout</button>
            </div>
          </div>
          <h1 id="week-header">This week ({getWeek()}):</h1>
          <div id="graphs-container">
            <div id="weight-graph-container">
              {getWeightGraph()}
            </div>
            <div id="duration-graph-container">
              {getDurationGraph()}
            </div>
          </div>
        </div>
        <div id="sign-out-container">
          <button onClick={handleSignOut} id="sign-out-button">Sign Out</button>
        </div>
        <div id="right-panel">
          right
        </div>
      </div>
    </div>
  );
}

export default HomePage;
