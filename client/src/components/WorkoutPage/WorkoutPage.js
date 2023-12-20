import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar.js";
import ScrollableButtonList from "./ScrollableButtonList.js";
import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import ModalTest from "../modal/modalTest.js";
import ScrollableList from '../ScrollableList/ScrollableList'
import workout from './WorkoutPage.module.css'
import WorkoutPopup from "../ProgressPage/WorkoutPopup.js";

const buttonData = [
  "Button 1",
  "Button 2",
  "Button 3",
  "Button 4",
  "Button 5",
  "Button 6",
  "Button 7",
];

const MyWorkouts = () => {
    const [workoutList, setWorkoutList] = useState([])
    const [selectedWorkout, setSelectedWorkout] = useState()

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
    }, [])
    
    const makeElement = (wo) => {
      return (
        <div className={"btn btn-primary form-control " + workout.workoutListItem}>
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

  const [modalShow, setModalShow] = React.useState(false);
  const [clicked, setClicked] = useState()

  const onSave = () => {

  }

  return (
    <div className={workout.body}>
      <Navbar />
      <form className={workout.container + " form-container"}>
        <h2>My Workouts</h2>
        <div className={workout.listContainer}>
          {workoutList[0] ?
            <ScrollableList
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
          {selectedWorkout ? 
            <WorkoutPopup
              className="btn btn-primary form-control"
              title="Add New Workout"
              buttonText="Add Workout"
              mode={"add"}
              workout={{}}
              onSave={onSave}
            />
          :
            <WorkoutPopup
              className="btn btn-primary form-control"
              title="Add New Workout"
              buttonText="Add Workout"
              mode={"add"}
              workout={{}}
              onSave={onSave}
            />
          }
        </div>
      </form>
    </div>
  );
}

export default MyWorkouts;
