import React from "react";
import { startOfWeek, endOfWeek, format } from "date-fns";
import Navbar from "../Navbar/Navbar";
import WeightGraph from "../WeightGraph/WeightGraph";
import DurationGraph from "../DurationGraph/DurationGraph";
import UpdateWeightPopup from "../UpdateWeightPopup/UpdateWeightPopup";
import workout from './WorkoutPage.module.css'


function WorkoutPage() {

  const handleUpdateWeight = (event) => {
    event.preventDefault()

    console.log("weight pressed");
  };

  const handleLogWorkout = (event) => {
    event.preventDefault()

    console.log("workout pressed");
  };

  const formatDate = (date) => {
    let dd = String(date.getDate()).padStart(2, "0");
    let mm = String(date.getMonth() + 1).padStart(2, "0");
    let yy = String(date.getFullYear()).slice(-2);

    let fDate = mm + "/" + dd + "/" + yy;
    return fDate;
  };

  const getDate = (date) => {
    let today = new Date();
    return formatDate(today);
  };

  const getWeek = () => {
    let today = new Date();
    let start = startOfWeek(today);
    let end = endOfWeek(today);

    return formatDate(start) + " - " + formatDate(end);
  };

  const getWeight = () => {
    return "150 lbs";
  };

  const getDuration = () => {
    return "120 min";
  };

  return (
    <div className={"d-flex justify-content-center align-items-center w-auto p-3 " + workout.body}>
      <Navbar />
      <form
        className="h-100 d-flex flex-column justify-content-center align-items-center"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "25px",
        }}
      >
        <div id="grid-container" className="p4" data-bs-theme="dark">
          <div>
            <h1 id="today-header" className="h-100 d-inline-block">
              Today ({getDate()}):
            </h1>
          </div>
          <div id="main-panel">
            <div id="table-container">
              <label className="text-primary">Weight:</label>
              <input
                className="form-control"
                id="weight"
                style={{ color: "black" }}
              />
              <div id="weight-button-container" class="table-item">
                <UpdateWeightPopup
                  onClick={(event) => {
                    handleUpdateWeight(event)
                  }}
                />
              </div>
              <label className="text-primary">Duration:</label>
              <input
                className="form-control"
                id="duration"
                style={{ color: "black" }}
              />
              <div id="workout-button-container" class="table-item">
                <button
                  onClick={(event) => {
                    handleLogWorkout(event)
                  }}
                  id="workout-button"
                  className="btn btn-primary"
                >
                  Log a Workout
                </button>
              </div>
            </div>
            <h1 id="week-header">This week ({getWeek()}):</h1>
            <div id="graphs-container">
              <div id="weight-graph-container">
                <WeightGraph />
              </div>
              <div id="duration-graph-container">
                <DurationGraph />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default WorkoutPage;