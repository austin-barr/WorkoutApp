import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar.js";
import ScrollableButtonList from "./ScrollableButtonList.js";
import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import ModalTest from "../modal/modalTest.js";
import SelectableList from '../SelectableList/SelectableList'
import workout from './WorkoutPage.module.css'
import WorkoutPopup from "../ProgressPage/WorkoutPopup.js";
import WorkoutDetailsDisplay from "../WorkoutDetailsDisplay/WorkoutDetailsDisplay.js";

const MyWorkouts = () => {
    const [workoutList, setWorkoutList] = useState([])
    const [clicked, setClicked] = useState()
    const [changeToReload, setChangeToReload] = useState(false)

    const getWorkouts = async () => {
      console.log('get called')
      try {
        const response = await fetch('/api/get/workouts', {
            method: "GET"
        });
    
        if (!response.ok) {
            console.error(`Error: ${response.statusText}`);
            return;
        }
        const responseData = await response.json();
        
        console.log('workout response')
        console.log(responseData)
        setWorkoutList(responseData.workouts)
      }
      catch (err) {
        console.log(err)
      }
    };

    useEffect(() => {
      console.log('use effect')
      getWorkouts()
    }, [changeToReload])
    
    const makeElement = (wo) => {
      return (
        <div className={"form-control " +
          workout.workoutListItem + " " +
          (clicked !== undefined && workoutList[clicked].id === wo.id ? workout.selected : "")}
        >
          {wo.name}
        </div>
      )
    }
    
    const handleSelect = () => {
      console.log('select')
    }
    
    const handleUnselect = () => {
      console.log('unselect')
    }

  const onSave = () => {
    setChangeToReload(!changeToReload)
  }

  return (
    <div className={workout.body}>
      <Navbar />
      <form className={workout.leftContainer + " form-container"}>
        <h2>My Workouts</h2>
        <div className={workout.listContainer}>
          {workoutList[0] ?
            <SelectableList
              items={workoutList}
              makeListElement={makeElement}
              clickedIndex={clicked}
              setClickedIndex={setClicked}
              onSelect={handleSelect}
              onUnselect={handleUnselect}
            />
          :
            "No workouts saved"
          } 
        </div>
        <div className={workout.addContainer}>
          <WorkoutPopup
            className="btn btn-primary form-control"
            title="New Workout"
            buttonText="Create New Workout"
            mode={"add"}
            workout={{}}
            onSave={onSave}
          />
        </div>
      </form>
      <form className={workout.rightContainer + " form-container"}>
        {clicked !== undefined ? 
        <>
          <div className={workout.details}>
            <WorkoutDetailsDisplay workout={workoutList[clicked]} />
          </div>
          <WorkoutPopup
            className="btn btn-primary form-control"
            title={"Edit " + workoutList[clicked].name}
            buttonText={"Edit " + workoutList[clicked].name}
            mode={"edit"}
            workout={workoutList[clicked]}
            onSave={onSave}
          />
        </>
        :
          "Nothing clicked"
        }
      </form>
    </div>
  );
}

export default MyWorkouts;
