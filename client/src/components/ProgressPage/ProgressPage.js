import React from "react";
import { useState, useEffect } from "react";
import { startOfWeek, endOfWeek, format } from "date-fns";
import Navbar from "../Navbar/Navbar";
import WeightGraph from "../WeightGraph/WeightGraph";
import DurationGraph from "../DurationGraph/DurationGraph";
import UpdateWeightPopup from "../UpdateWeightPopup/UpdateWeightPopup";
import home from './ProgressPage.module.css'
import WokoutForm from './WorkoutForm';
import WorkoutPopup from "./WorkoutPopup";
import ProgressCalendar from '../ProgressCalendar/ProgressCalendar.js'


function ProgressPage() {
  const [changeToReloadCalendar, setChangeToReloadCalendar] = useState(false)
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

  const [log, setLog] = useState({
    id: 1,
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

  const onSave = () => {
    setChangeToReloadCalendar(!changeToReloadCalendar)
  }

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
          onSave={onSave}
        />
        <WorkoutPopup
          className="btn btn-primary form-control"
          title={`Edit Workout: ${editableWorkout.name}`}
          buttonText="Edit Workout"
          workout={editableWorkout}
          mode={"edit"}
          onSave={onSave}
        />
        <WorkoutPopup
          className="btn btn-primary form-control"
          title={`Edit Log: ${log.name} on ${log.date}`}
          buttonText="Edit Log"
          workout={log}
          mode={"edit-log"}
          onSave={onSave}
        />
        <WorkoutPopup
          className="btn btn-primary form-control"
          title={"Log a Workout"}
          buttonText="Log Workout"
          workout={log}
          mode={"log"}
          onSave={onSave}
        />
      </form>
      <ProgressCalendar changeToReload={changeToReloadCalendar}/>
    </div>
  );
}

export default ProgressPage;