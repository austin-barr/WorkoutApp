import React from "react";
import { useState, useEffect } from "react";
import { startOfWeek, endOfWeek, format } from "date-fns";
import Navbar from "../Navbar/Navbar";
import WeightGraph from "../WeightGraph/WeightGraph";
import DurationGraph from "../DurationGraph/DurationGraph";
import UpdateWeightPopup from "../UpdateWeightPopup/UpdateWeightPopup";
import home from './HomePage.module.css'


function HomePage() {
  const [weight, setWeight] = useState('');
  const [weightInput, setWeightInput] = useState({})
  const [duration, setDuration] = useState('');
  const [durationInput, setDurationInput] = useState({})
  const curDate = new Date().toLocaleDateString('fr-CA')

  const getWeight = async () => {
    console.log("getWeight called")
    console.log(curDate)
    const data = {
      date: curDate
    }
    console.log(data)
    try {
      const response = await fetch('/api/get/recent-weight', {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage["token"]}`,
          },
          body: JSON.stringify(data)
      });
  
      if (!response.ok) {
          console.error(`Error: ${response.statusText}`);
          return;
      }
      const responseData = await response.json();
      console.log(responseData.rows);

      setWeight(responseData.rows[0].weight + " lbs")

    }
    catch (err) {
      console.log(err)
    }
  };

  const getDuration = async () => {
    const data = {
      startDate: curDate,
      endDate: curDate
    }
    console.log(data)
    try {
      const response = await fetch('/api/get/durations', {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage["token"]}`,
          },
          body: JSON.stringify(data)
      });
  
      if (!response.ok) {
          console.error(`Error: ${response.statusText}`);
          return;
      }
      const responseData = await response.json();
      console.log(responseData.rows);
      if (responseData[0] !== undefined)
        setDuration(responseData.rows[0].duration + " min")
      else
        setDuration(0 + " min")

    }
    catch (err) {
      console.log(err)
    }
  };

  useEffect( () => {
    console.log("useeffect called");
    getWeight();
    getDuration();
  }, [weight, duration]);

    const handleUpdateWeight = (formData) => {
      console.log('handle weight')
      console.log(formData)
      console.log(curDate)
      setWeightInput(formData)
      if (formData.date === curDate) {
        setWeight(formData.weight + " lbs")
      }
    };

  const handleLogWorkout = (formData) => {
    setDurationInput(formData)

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

  return (
    <div className={"d-flex justify-content-center align-items-center w-auto p-3 " + home.body}>
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
                value={weight}
                style={{ color: "black" }}
              />
              <div id="weight-button-container" class="table-item">
                <UpdateWeightPopup
                  onClick={(formData) => {
                    handleUpdateWeight(formData)
                  }}
                />
              </div>
              <label className="text-primary">Duration:</label>
              <input
                className="form-control"
                id="duration"
                value={duration}
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
                <WeightGraph weightInput={weightInput}/>
              </div>
              <div id="duration-graph-container">
                <DurationGraph durationInput={durationInput}/>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default HomePage;
