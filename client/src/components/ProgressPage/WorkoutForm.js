import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { StrictModeDroppable } from './StrictModeDroppable';
import form from './WorkoutForm.module.css'

const WorkoutForm = () => {
  const [workoutName, setWorkoutName] = useState('');
  const [selectedExercise, setSelectedExercise] = useState('');
  const [weight, setWeight] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [addedExerciseList, setAddedExerciseList] = useState([]);
  const [exerciseList, setExerciseList] = useState([]);

  const [workoutNameError, setWorkoutNameError] = useState('');
  const [selectedExerciseError, setSelectedExerciseError] = useState('');
  const [weightError, setWeightError] = useState('');
  const [setsError, setSetsError] = useState('');
  const [repsError, setRepsError] = useState('');

  const getExercises = async() => {
    try {
        const response = await fetch('/api/get/exercises', {
            method: "GET"
        });
    
        if (!response.ok) {
            console.error(`Error: ${response.statusText}`);
            return;
        }
        const responseData = await response.json();
        console.log(responseData.exercises);
        setExerciseList(responseData.exercises)
  
      }
      catch (err) {
        console.log(err)
      }
  }

  useEffect(() => {
    getExercises();
  }, [])

  const handleAddExercise = () => {
    if (!validateInput()) {
        return;
    }
    const newExercise = {
      selectedExercise,
      weight,
      sets,
      reps,
    };
    setAddedExerciseList([...addedExerciseList, newExercise]);
    setSelectedExercise('');
    setWeight('');
    setSets('');
    setReps('');
  };

  const validateInput = () => {
    let isValid = true
    if (!workoutName.trim()) {
        setWorkoutNameError('Workout name is required')
        isValid = false
    }
    // check if workout name exists in database for this user

    if (!selectedExercise) {
        setSelectedExerciseError('Select an exercise')
        isValid = false
    }

    if (!weight.trim()) {
        setWeightError('Weight is required')
        isValid = false
    }

    if (!sets.trim()) {
        setSetsError('Sets is required')
        isValid = false
    }

    if (!weight.trim()) {
        setRepsError('Reps is required')
        isValid = false
    }

    return true
  };

  const handleRemoveExercise = (index) => {
    const updatedList = [...addedExerciseList];
    updatedList.splice(index, 1);
    setAddedExerciseList(updatedList);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const updatedList = [...addedExerciseList];
    const [reorderedExercise] = updatedList.splice(result.source.index, 1);
    updatedList.splice(result.destination.index, 0, reorderedExercise);
    setAddedExerciseList(updatedList);
  };

  const handleSaveWorkout = async (event) => {
    event.preventDefault()
    console.log(addedExerciseList)
    
    const data = exerciseList.map((ex) => (
        {
            exercise: ex.selectedExercise,
            weight: ex.weight,
            sets: ex.sets,
            reps: ex.reps
        }
    ));

    try {
        const response = await fetch('/api/add/workout', {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
    
        if (!response.ok) {
            console.error(`Error: ${response.statusText}`);
            return;
        }
      }
      catch (err) {
        console.log(err)
      }

  };

  return (
    <form
      onSubmit={handleSaveWorkout}
      className="form-container"
    >
        <h1>Add New Workout:</h1>
        <input
          type="text"
          id="workout-name"
          className="form-control"
          placeholder="Workout Name"
          value={workoutName}
          onChange={(event) => {
            setWorkoutName(event.target.value.replace(/\s/g, ''));
            setWorkoutNameError('');
          }}
        />
        <div className="form-error-container">
            <small className="text-danger form-error-message">{workoutNameError}</small>
        </div>
        <select
          className="form-control"
          value={selectedExercise}
          onChange={(event) => {
            setSelectedExercise(event.target.value);
            setSelectedExerciseError('');
          }}
        >
          <option value="">Select an Exercise</option>
          {exerciseList.map((exercise) => (
            <option value={exercise.name}>{exercise.name}</option>
          ))}
        </select>
        <div className="form-error-container">
            <small className="text-danger form-error-message">{selectedExerciseError}</small>
        </div>
        <input
          type="text"
          id="exercise-weight"
          className="form-control"
          placeholder="Weight"
          value={weight}
          onChange={(event) => {
            setWeight(event.target.value.replace(/[^0-9]/g, ''));
            setWeightError('');
          }}
        />
        <div className="form-error-container">
            <small className="text-danger form-error-message">{weightError}</small>
        </div>
        <input
          type="text"
          id="sets"
          className="form-control"
          placeholder="Sets"
          value={sets}
          onChange={(event) => {
            setSets(event.target.value.replace(/[^0-9]/g, ''));
            setSetsError('');
          }}
        />
        <div className="form-error-container">
            <small className="text-danger form-error-message">{setsError}</small>
        </div>
        <input
          type="text"
          id="reps"
          className="form-control"
          placeholder="Reps"
          value={reps}
          onChange={(event) => {
            setReps(event.target.value.replace(/[^0-9]/g, ''));
            setRepsError('');
          }}
        />
        <div className="form-error-container">
            <small className="text-danger form-error-message">{repsError}</small>
        </div>
      <button type="button" onClick={handleAddExercise} className="btn btn-primary form-control">
        Add Exercise
      </button>

      <DragDropContext onDragEnd={handleDragEnd}>
        <StrictModeDroppable droppableId="exerciseList">
          {(provided) => (
            <ul
              className={form.dndContainer}
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ listStyleType: 'none', padding: 0, marginTop: '15px', width: '100%'}}
            >
              {addedExerciseList.map((exercise, index) => (
                <Draggable key={index} draggableId={`exercise-${index}`} index={index}>
                  {(provided, snapshot) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={form.draggableItem}
                      style={{
                        background: snapshot.isDragging ? "darkgrey" : "grey",
                        ...provided.draggableProps.style,
                    }}
                    >
                      <div className={form.exerciseDetails}>
                        {`${exercise.name} (${exercise.weight} lbs, ${exercise.sets} x ${exercise.reps})`}
                      </div>
                      <button
                        className={form.deleteButton}
                        type="button"
                        onClick={() => handleRemoveExercise(index)}
                      >
                        <svg className={form.trashIcon} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                        </svg>
                      </button>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </StrictModeDroppable>
      </DragDropContext>

      <button type="submit" className="btn btn-primary form-control" style={{ marginTop: '15px' }}>
        Save Workout
      </button>
    </form>
  );
};

export default WorkoutForm;
