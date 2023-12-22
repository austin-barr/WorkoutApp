import React from "react";
import { useState, useEffect } from "react";
import { startOfWeek, endOfWeek, format } from "date-fns";
import Navbar from "../Navbar/Navbar";
import home from './ProgressPage.module.css'
import WorkoutPopup from "./WorkoutPopup";
import ProgressCalendar from '../ProgressCalendar/ProgressCalendar.js'


function ProgressPage() {
  const [changeToReloadCalendar, setChangeToReloadCalendar] = useState(false)
  const curDate = new Date().toLocaleDateString('fr-CA')

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
      <div
        className="form-container"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "25px",
        }}
      >
        <WorkoutPopup
          className="btn btn-primary form-control"
          title={"Log a Workout"}
          buttonText="Log Workout"
          workout={{}}
          mode={"log"}
          onSave={onSave}
        />
      </div>
      <ProgressCalendar changeToReload={changeToReloadCalendar}/>
    </div>
  );
}

export default ProgressPage;