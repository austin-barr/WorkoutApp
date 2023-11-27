import React from "react";
import { useState, useEffect } from "react";
import { startOfWeek, endOfWeek, format } from "date-fns";
import Navbar from "../Navbar/Navbar";
import WeightGraph from "../WeightGraph/WeightGraph";
import DurationGraph from "../DurationGraph/DurationGraph";
import UpdateWeightPopup from "../UpdateWeightPopup/UpdateWeightPopup";
import home from './ProgressPage.module.css'
import WokoutForm from './WorkoutForm'
import WorkoutForm from "./WorkoutForm";


function ProgressPage() {
  const [date, setDate] = useState('');
  const [dateError, setDateError] = useState('')
  const [duration, setDuration] = useState('');
  const [durationError, setDurationError] = useState('')
  const [workout, setWorkout] = useState('');
  const [workoutError, setWorkoutError] = useState('')
  const curDate = new Date().toLocaleDateString('fr-CA')

  const handleLogWorkout = (event) => {
    event.preventDefault()
    console.log('handle log workout')
  };

  const formatDate = (date) => {
    let dd = String(date.getDate()).padStart(2, "0");
    let mm = String(date.getMonth() + 1).padStart(2, "0");
    let yy = String(date.getFullYear()).slice(-2);

    let fDate = mm + "/" + dd + "/" + yy;
    return fDate;
  };

  const getWeek = () => {
    let today = new Date();
    let start = startOfWeek(today);
    let end = endOfWeek(today);

    return formatDate(start) + " - " + formatDate(end);
  };

  return (
    <div className={"d-flex justify-content-center align-items-center w-auto p-3 " + home.body}>
      <Navbar />
      <form
        onSubmit={handleLogWorkout}
        className="h-100 d-flex flex-column justify-content-center align-items-center"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "25px",
        }}
      >
        <input
            type="date"
            className="form-control"
            id="date"
            value={date}
            onChange={(event) => {
            setDate(event.target.value);
            setDateError('');
            }}
        />
        <input
            type="text"
            className="form-control"
            id="duration"
            value={duration}
            onChange={(event) => {
            setDuration(event.target.value);
            setDurationError('');
            }}
        />
        <select
            className="form-control"
            value="workoutName"
            onChange={(event) => {
            setWorkout(event.target.value);
            setWorkoutError('');
            }}
        >
        <option >
            text
        </option>
        {/* generate list of workouts from retrieved list */}
        </select>
        <button type="submit" className="btn btn-primary form-control">
            Log Workout
        </button>
      </form>
      <WorkoutForm/>
    </div>
  );
}

export default ProgressPage;