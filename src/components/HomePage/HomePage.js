// HomePage.js
import React, { Component } from "react";
import { startOfWeek, endOfWeek, format } from "date-fns";
import home from "./HomePage.module.css"
import WeightGraph from "./WeightGraph";
import DurationGraph from "./DurationGraph";
import UpdateWeightPopup from "./UpdateWeightPopup";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleUpdateWeight = (event) => {
    // show weight popup
    console.log("weight pressed")
    return UpdateWeightPopup
  }

  handleLogWorkout = (event) => {
    // handle redirect to progress page
    console.log("workout pressed")
  }

  handleSignOut = (event) => {

    // handle signing out, send something to backend?

    window.location = "/";
  }

  formatDate(date) {
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0');
    let yy = String(date.getFullYear()).slice(-2);

    let fDate = mm + '/' + dd + '/' + yy;
    return fDate
  }

  getDate = (date) => {
    let today = new Date();
    return this.formatDate(today)
  }

  getWeek = () => {
    let today = new Date()
    let start = startOfWeek(today)
    let end = endOfWeek(today)
    
    return this.formatDate(start) + " - " + this.formatDate(end)
  }

  getWeight = () => {
    // get to api/home
    return "150 lbs"
  }

  getDuration = () => {
    // get to api/home
    return "120 min"
  }

  render() {
    return (
      <div>
        <nav>
          <a href="/home/" class="active">Home</a>
          <a href="/home/">My Progress</a>
          <a href="/home/">My Workouts</a>
          <a href="/home/">Find a Workout</a>
          <a href="/home/">Settings</a>
        </nav>
        <div id={home.gridContainer}>
          <div id={home.leftPanel}>
            left
          </div>
          <div id={home.headerContainer}>
            <h1 id={home.todayHeader}>Today ({this.getDate()}):</h1>
          </div>
          <div id={home.mainPanel}>
            <div id={home.tableContainer}>
              <div id={home.weightLabel} class={home.tableItem}>Weight:</div>
              <div id={home.weight} class={home.tableItem}>{this.getWeight()}</div>
              <div id={home.weightButtonContainer} class={home.tableItem}>
                <UpdateWeightPopup />
              </div>
              <div id={home.durationLabel} class={home.tableItem}>Time Spent:</div>
              <div id={home.duration} class={home.tableItem}>{this.getDuration()}</div>
              <div id={home.workoutButtonContainer} class={home.tableItem}>
                <button onClick={this.handleLogWorkout} id={home.workoutButton}>Log a Workout</button>
              </div>
            </div>
            <h1 id={home.weekHeader}>This week ({this.getWeek()}):</h1>
            <div id={home.graphsContainer}>
              <div id={home.weightGraphContainer}>
                <WeightGraph />
              </div>
              <div id={home.durationGraphContainer}>
                <DurationGraph />
              </div>
            </div>
          </div>
          <div id={home.signOutContainer}>
            <button onClick={this.handleSignOut} id={home.signOutButton}>Sign Out</button>
          </div>
          <div id={home.rightPanel}>
            right
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
