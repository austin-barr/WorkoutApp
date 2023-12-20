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
    const data = {
      date: curDate
    }
    console.log(data)
    try {
      const response = await fetch('/api/get/recent-weight', {
          method: "POST",
          mode: "cors",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });
  
      if (!response.ok) {
          console.error(`Error: ${response.statusText}`);
          return;
      }
      const responseData = await response.json();
      if (responseData.rows[0] !== undefined)
        setWeight(responseData.rows[0].weight + " lbs")
      else
        setWeight("Not tracked")

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
          mode: "cors",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });
  
      if (!response.ok) {
          console.error(`Error: ${response.statusText}`);
          return;
      }
      const responseData = await response.json();
      console.log(responseData.rows);
      if (responseData.rows[0] !== undefined)
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
  }, [weight, duration, weightInput]);

    const handleUpdateWeight = (formData) => {
      console.log('handle weight')
      console.log(formData)
      console.log(curDate)
      setWeightInput(formData)
      if (formData.date === curDate) {
        setWeight(formData.weight + " lbs")
      }
    };

  const handleLog = (event) => {
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

  return (
    <div className={"d-flex justify-content-center align-items-center w-auto p-3 " + home.body}>
      <Navbar />
      <form
        className="h-100 d-flex flex-column justify-content-center align-items-center form-group"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "25px",
        }}
      >
        <div className="p4" data-bs-theme="dark">
          <div>
            <h1 id="today-header" className="h-100 d-inline-block">
              Today ({getDate()}):
            </h1>
          </div>
          <div id="main-panel">
            <div className={home.tableContainer}>
              <label className="text-primary">Weight:</label>
              <p className="text-primary">{weight ? weight : "loading"}</p>
              <div>
                <UpdateWeightPopup
                  onClick={(formData) => {
                    handleUpdateWeight(formData)
                  }}
                  className={"btn btn-primary form-control " + home.tableItem}
                />
              </div>
              <label className="text-primary">Duration:</label>
              <p className="text-primary" id="duration">{duration ? duration : "loading"}</p>
              <div>
                <button 
                  onClick={(event) => {
                    handleLog(event)
                  }}
                  id="workout-button"
                  className={"btn btn-primary form-control " + home.tableItem}
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
