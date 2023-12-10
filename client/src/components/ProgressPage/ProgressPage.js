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
import WorkoutPopup from "./WorkoutPopup";
import ProgressCalendar from './ProgressCalendar.js'


function ProgressPage() {
  const [date, setDate] = useState('');
  const [dateError, setDateError] = useState('')
  const [duration, setDuration] = useState('');
  const [durationError, setDurationError] = useState('')
  const [workout, setWorkout] = useState('');
  const [workoutError, setWorkoutError] = useState('')
  const curDate = new Date().toLocaleDateString('fr-CA')

  const [editableWorkout, setEditableWorkout] = useState({
    id: 13,
    name: "name",
    exercises: [
      {
        id: 1,
        name: "Bench Press",
        weight: "150",
        sets: "3",
        reps: "10"
      },
      {
        id: 2,
        name: "Squats",
        weight: "180",
        sets: "3",
        reps: "8"
      }
    ]
  });

  const [loggedWorkout, setLoggedWorkout] = useState({
    id: 13,
    name: "name",
    date: '12/06/23',
    exercises: [
      {
        id: 1,
        name: "Bench Press",
        weight: "150",
        sets: "3",
        reps: "10"
      },
      {
        id: 2,
        name: "Squats",
        weight: "180",
        sets: "3",
        reps: "8"
      }
    ],
  });

  const [emptyWorkout, setEmptyWorkout] = useState({})

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
    <div className={"d-flex justify-content-center align-items-center p-3 " + home.body}>
      <Navbar />
      <form
        className="h-100 d-flex flex-column justify-content-center align-items-center"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "25px",
        }}
      >
        <WorkoutPopup
          className="btn btn-primary form-control"
          title="Add New Workout"
          buttonText="Add Workout"
          mode={"add"}
          workout={emptyWorkout}
          setWorkout={setEmptyWorkout}
        />
        <WorkoutPopup
          className="btn btn-primary form-control"
          title={`Edit Workout: ${editableWorkout.name}`}
          buttonText="Edit Workout"
          workout={editableWorkout}
          setWorkout={setEditableWorkout}
          mode={"edit"}
        />
        <WorkoutPopup
          className="btn btn-primary form-control"
          title={`Edit Log: ${loggedWorkout.name} on ${loggedWorkout.date}`}
          buttonText="Edit Logged Workout"
          workout={loggedWorkout}
          setWorkout={setLoggedWorkout}
          mode={"edit-log"}
        />
        <WorkoutPopup
          className="btn btn-primary form-control"
          title={"Log a Workout"}
          buttonText="Log Workout"
          workout={editableWorkout}
          setWorkout={setLoggedWorkout}
          mode={"log"}
        />
      </form>
    </div>
  );
}

export default ProgressPage;