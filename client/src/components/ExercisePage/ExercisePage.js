import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar.js";
import SelectableList from '../SelectableList/SelectableList'
import exercise from './ExercisePage.module.css'

const ExercisePage = () => {
  const [exerciseList, setExerciseList] = useState([])
  const [clicked, setClicked] = useState()

  const getExercises = async () => {
    console.log('get called')
    try {
      const response = await fetch('/api/get/exercises', {
          method: "GET"
      });
  
      if (!response.ok) {
          console.error(`Error: ${response.statusText}`);
          return;
      }
      const responseData = await response.json();
      
      console.log('exercise response')
      console.log(responseData)
      setExerciseList(responseData.exercises)
    }
    catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    console.log('use effect')
    getExercises()
  }, [])
  
  const makeElement = (ex) => {
    return (
      <div
        className={"form-control " +
          exercise.exerciseListItem + " " +
          ((clicked !== undefined && ex.id == exerciseList[clicked].id) ? exercise.selected : "")
        }
      >
        {ex.name}
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

  }

  const toSeconds = (timeString) => {
    const date = new Date('2000-01-01 ' + timeString)
    return date.getSeconds()
  }

  return (
    <div className={exercise.body}>
      <Navbar />
      <form className={exercise.exerciseContainer + " form-container"}>
        <h2>Exercises</h2>
        <div className={exercise.listContainer}>
          {exerciseList[0] ?
            <SelectableList
              items={exerciseList}
              makeListElement={makeElement}
              clickedIndex={clicked}
              setClickedIndex={setClicked}
              onSelect={handleSelect}
              onUnselect={handleUnselect}
              listClass={exercise.list}
            />
          :
            "No exercises"
          } 
        </div>
      </form>
      <form className={exercise.container + " form-container"}>
        {clicked !== undefined ? 
        <>
          <h2>{exerciseList[clicked].name}:</h2>
          <div className={exercise.details}>
            <p>{exerciseList[clicked].description}</p>
            <p>Estimated duration: {toSeconds(exerciseList[clicked].duration)} seconds per rep</p>
          </div>
          <div className={exercise.muscles}>
            <p>Works these muscle groups:</p>
            <ul>
              {exerciseList[clicked].muscleGroups.map((mg, index) => (
                <li>{mg}</li>
              ))}
            </ul>
          </div>
        </>
        :
          "Nothing clicked"
        }
      </form>
    </div>
  );
}

export default ExercisePage;