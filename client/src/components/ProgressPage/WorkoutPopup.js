import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import DnDList from './DnDList';
import popup from './WorkoutPopup.module.css'
import { FormControl, FormGroup } from 'react-bootstrap';

export default function WorkoutPopup(props) {
  const curDate = new Date().toLocaleDateString('fr-CA')
  const [show, setShow] = useState(false);
  const [workoutList, setWorkoutList] = useState([])
  const [selectedWorkoutIndex, setSelectedWorkoutIndex] = useState("")
  const [editingExerciseIndex, setEditingExerciseIndex] = useState()
  const [workoutName, setWorkoutName] = useState('');
  const [date, setDate] = useState(props.defaultDate || curDate);
  const [dateError, setDateError] = useState('');
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
  const [title, setTitle] = useState('');
  
  const makeExerciseDnDElement = (exercise) => {
    return (
      <div>
        {`${exercise.name}\n(${exercise.weight} lbs, ${exercise.sets} x ${exercise.reps})`}
      </div>
    )
  }

  const clearExerciseInputs = () => {
    setSelectedExercise('');
    setWeight('');
    setSets('');
    setReps('');
  };

  const setExerciseInputs = (ex) => {
    setSelectedExercise(ex.id);
    setWeight(ex.weight);
    setSets(ex.sets);
    setReps(ex.reps);
  }

  const clearExerciseErrors = () => {
    setSelectedExerciseError('');
    setWeightError('');
    setSetsError('');
    setRepsError('');
  }

  const clearWorkoutInputs = () => {
    setWorkoutName('')
    setSelectedWorkoutIndex('')
  };

  const handleShow = () => {
    getExercises();
    getWorkouts();
    console.log('props workout')
    console.log(props.workout)
    if (props.workout !== undefined && Object.keys(props.workout).length !== 0) {
      loadWorkout(props.workout)
    }

    setShow(true);
  }

  const handleClose = () => {
    setShow(false);
    clearExerciseInputs();
    clearExerciseErrors();
    clearWorkoutInputs();
    setWorkoutNameError('');
    setAddedExerciseList([]);
  }
  
  const getExerciseName = (idx) => {
    for (let ex of exerciseList) {
      console.log(ex)
          if (ex.id == idx) {
            return ex.name
          }
      }
  };

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
  };

  const getWorkouts = async () => {
    try {
      const response = await fetch('/api/get/workouts', {
          method: "GET"
      });
  
      if (!response.ok) {
          console.error(`Error: ${response.statusText}`);
          return;
      }
      const responseData = await response.json();

      console.log(responseData)
      setWorkoutList(responseData.workouts)
    }
    catch (err) {
      console.log(err)
    }
  };
  

  const loadWorkout = (workout) => {
    console.log('set')
    console.log(workout)
    if (workout) {
      setAddedExerciseList([...workout.exercises]);
      if (props.mode!=='add') {
        setWorkoutName(workout.name)
      }
    }
    else {
      setAddedExerciseList([]);
      setWorkoutName('');
    }
  }

  const handleAddExercise = () => {
    console.log("add")
    if (!validateExerciseInput()) {
        return;
    }

    console.log(selectedExercise)
    const newExercise = {
      id: selectedExercise,
      name: getExerciseName(selectedExercise),
      weight: weight,
      sets: sets,
      reps: reps,
    };
    setAddedExerciseList([...addedExerciseList, newExercise]);

    clearExerciseInputs();
  };

  const handleEditExercise = () => {
    console.log("edit")
    console.log(addedExerciseList)
    if (!validateExerciseInput()) {
      return;
  }

  const modifiedExercise = {
    id: selectedExercise,
    name: getExerciseName(selectedExercise),
    weight: weight,
    sets: sets,
    reps: reps,
  };
  const updatedList = [...addedExerciseList]
  updatedList.splice(editingExerciseIndex, 1, modifiedExercise)
  setAddedExerciseList(updatedList);

  clearExerciseInputs();
  clearExerciseErrors();

  }

  const validateWorkoutInput = () => {
    let isValid = true
    if (!workoutName.trim()) {
        setWorkoutNameError('Workout name is required')
        isValid = false
    }
    // check if workout name exists in database for this user

    return isValid
  }

  const validateExerciseInput = () => {
    let isValid = true

    if (!selectedExercise) {
        setSelectedExerciseError('Select an exercise')
        isValid = false
    }

    if (!weight) {
        setWeightError('Weight is required')
        isValid = false
    }

    if (!sets) {
        setSetsError('Sets is required')
        isValid = false
    }

    if (!weight) {
        setRepsError('Reps is required')
        isValid = false
    }

    return true
  };

  const handleAddWorkout = async () => {
    if (!validateWorkoutInput()) {
      return;
    }
    
    const workout = {
      name: workoutName,
      exercises: [addedExerciseList.map((ex, index) => (
          {
            id: ex.id,
            step: index + 1,
            weight: ex.weight,
            sets: ex.sets,
            reps: ex.reps
          }
        ))
      ]
    };
    console.log(addedExerciseList)
    console.log(workout)

    try {
      const response = await fetch('/api/add/workout', {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(workout)
      });
  
      if (!response.ok) {
          console.error(`Error: ${response.statusText}`);
          return;
      }

      handleClose();

    }
    catch (err) {
      console.log(err)
    }

  };

  const handleEditWorkout = async () => {
    console.log(props.workout)
    if (!validateWorkoutInput()) {
      return;
    }
    
    const workout = {
      id: props.workout.id,
      name: workoutName,
      exercises: [addedExerciseList.map((ex, index) => (
          {
            id: ex.id,
            step: index + 1,
            weight: ex.weight,
            sets: ex.sets,
            reps: ex.reps
          }
        ))
      ]
    };
    console.log(addedExerciseList)
    console.log(workout)

    try {
      const response = await fetch('/api/update/workout', {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(workout)
      });
  
      if (!response.ok) {
          console.error(`Error: ${response.statusText}`);
          return;
      }

      handleClose();

    }
    catch (err) {
      console.log(err)
    }
  };

  const handleLogWorkout = () => {

  };

  const handleEditLogWorkout = () => {

  };

  const handleSelectWorkout = (index) => {
    const workout = workoutList[index]
    console.log(workout);
    handleExerciseUnselected();
    loadWorkout(workout);
    setEditingExerciseIndex();
  };

  const handlePopUpClicked = (event) => {
    
  };

  const handleExerciseSelected = (event, index) => {
    const ex = addedExerciseList[index]
    setExerciseInputs(ex);
    clearExerciseErrors();
  };

  const handleExerciseUnselected = () => {
    clearExerciseInputs();
    clearExerciseErrors();
  }

  const handleExerciseRemoved = (index) => {
    if (index===editingExerciseIndex) {
      handleExerciseUnselected();
    }
  }

    return (
      <>
        <Button variant="primary" onClick={handleShow} className={props.className}>
          {props.buttonText}
        </Button>

        <Modal show={show}
          onClick={(event) => handlePopUpClicked(event)}
          onHide={handleClose}
          className={popup.modal}
          contentClassName={popup.modalContent}
        >
          <Modal.Header closeButton>
            <Modal.Title>{props.title || ""}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className={popup.formGrid}>
              <div className={popup.left}>
                <FormGroup>
                  <Form.Label>Workout Name:</Form.Label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    value={workoutName}
                    onChange={(event) => {
                      setWorkoutName(event.target.value);
                      setWorkoutNameError('');
                    }}
                    //add conditional autofocus for this select workout
                    // depending on mode
                  />
                  <div className="form-error-container">
                      <small className="text-danger form-error-message">{workoutNameError}</small>
                  </div>
                </FormGroup>
                <Form.Group controlId="workout-select">
                  <Form.Label>Load from My Workouts</Form.Label>
                  <select
                    className="form-control"
                    value={selectedWorkoutIndex}
                    onChange={(event) => {
                      setSelectedWorkoutIndex(event.target.value)
                      handleSelectWorkout(event.target.value)
                    }}
                  >
                    <option value="">None</option>
                    {workoutList.map((workout, index) => (
                      <option value={index}>{workout.name}</option>
                    ))}
                  </select>
                  <div className="form-error-container">
                      <small className="text-danger form-error-message"></small>
                  </div>
                </Form.Group>
                <FormGroup className={popup.list}>
                  <Form.Label>Exercises:</Form.Label>
                  <DnDList
                    list={addedExerciseList}
                    setList={setAddedExerciseList}
                    makeListElement={makeExerciseDnDElement}
                    clickedIndex={editingExerciseIndex}
                    setClickedIndex={setEditingExerciseIndex}
                    onSelect={handleExerciseSelected}
                    onUnselect={handleExerciseUnselected}
                    onRemove={handleExerciseRemoved}
                  />
                </FormGroup>
              </div>
              <div className={popup.right} >
                <Form.Group controlId="date" className={(props.mode!=='log' && props.mode!=='edit-log') ? popup.hidden : ""}>
                  <Form.Label>Enter Date:</Form.Label>
                  <Form.Control
                    type="date"
                    value={date}
                    onChange={(event) => {
                      setDate(event.target.value);
                      setDateError('');
                    }}
                  />
                  <div className="form-error-container">
                    <small className="text-danger form-error-message">{dateError}</small>
                  </div>
                  <Form.Label>Enter Times</Form.Label>
                  <div className={popup.dates}>
                    <Form.Control
                      type="time"
                      // value={}
                      onChange={(event) => {
                        //set start time
                      }}
                    />
                    <Form.Control
                      type="time"
                      // value={}
                      onChange={(event) => {
                        //set end time
                      }}
                    />
                  </div>
                  <div className="form-error-container">
                    <small className="text-danger form-error-message">{dateError}</small>
                  </div>
                </Form.Group>
                <div className={popup.exerciseForm}>
                  <Form.Group controlId="select-exercise">
                    <Form.Label>{(editingExerciseIndex!==undefined ? "Edit " : "Add ") + "Exercise:"}</Form.Label>
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
                          <option value={exercise.id}>{exercise.name}</option>
                      ))}
                    </select>
                    <div className="form-error-container">
                      <small className="text-danger form-error-message">{selectedExerciseError}</small>
                    </div>
                  </Form.Group>
                  <Form.Group controlId="weight">
                    <Form.Control
                      type="text"
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
                  </Form.Group>
                  <Form.Group controlId="sets">
                    <Form.Control
                      type="text"
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
                  </Form.Group>
                  <Form.Group controlId="reps">
                    <Form.Control
                      type="text"
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
                  </Form.Group>
                  <Button variant="primary"
                    onClick={editingExerciseIndex!==undefined ? handleEditExercise : handleAddExercise}
                    className="btn btn-primary form-control"
                  >
                    {editingExerciseIndex!==undefined ? "Save Changes" : "Add to Workout"}
                  </Button>
                </div>
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {props.mode==="log" ?
                <Button variant="primary" onClick={handleLogWorkout} className="btn btn-primary form-control" >
                  Log
                </Button>
              : props.mode==="edit" ?
                <Button variant="primary" onClick={handleEditWorkout} className="btn btn-primary form-control" >
                  Save Changes
                </Button>
              : props.mode==='edit-log' ?
                <Button variant="primary" onClick={handleEditLogWorkout} className="btn btn-primary form-control" >
                  Update Log
                </Button>
              : props.mode==='add' &&
                <Button variant="primary" onClick={handleAddWorkout} className="btn btn-primary form-control" >
                  Save New Workout
                </Button>
            }
              
              
          </Modal.Footer>
        </Modal>
      </>
    );
}