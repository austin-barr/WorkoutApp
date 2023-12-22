import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import ImageUpload from '../ImageUpload/ImageUpload';
// import "../SettingsPage/SettingsPage.module.css";

const AddExercisePopOut = (props)  => {
    
    const [showModal, setShowModal] = useState(false);
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [muscleGroups, setMuscleGroups] = useState([])
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

    useEffect(() => {
        getMuscleGroups()
    }, [])

    const getMuscleGroups = async () => {
        try {
            console.log('get muscle group called')
            const muscleResponse = await fetch('/api/get/muscleGroups', {
                method: "GET"
            })
            console.log('after post')
            console.log(muscleResponse)
            if (!(muscleResponse.ok)) {
                return;
            }
            const muscleResult = await muscleResponse.json()
            setMuscleGroups(muscleResult.rows)
        }
        catch (err) {
            console.log(err)
        }
    }

    const uploadPic = async () => {
        const ext = image.name.slice((image.name.lastIndexOf(".") - 1 >>> 0) + 2);
        const renamedImage = new File([image], { type: image.type });
        console.log(renamedImage)
        const formData = new FormData();
        formData.append('file', renamedImage);

        try {
            const response = await fetch("/api/upload/user", {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: formData
            })
      
            if (!response.ok) {
              console.error(`Error: ${response.statusText}`);
            return;
            }
          
            const responseData = await response.json();
            console.log(responseData)
      
            } catch (error) {
              console.error("Error:", error);
            }
            setShowModal(false);
    }

    const handleSubmit = async () => {
        const data = {
            name: name,
            description: description,
            image: image,
            duration: duration,
            muscleGroups: selectedCheckboxes.map((x) => ({id:x}))
        }
        console.log(data)
        try {
            const response = await fetch("/api/add/exercise", {
                method: "POST",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (!response.ok) {
                console.error(`Error: ${response.statusText}`);
                return;
            }
            setShowModal(false);
        }
        catch (err) {
            console.error(err)
        }   
    }
    
    const handleCheckboxChange = (clickedId) => {
        const isSelected = selectedCheckboxes.includes(clickedId);
        setSelectedCheckboxes((prevSelected) =>
          isSelected
            ? prevSelected.filter((id) => id !== clickedId)
            : [...prevSelected, clickedId]
        );
      };

    const handleClose = () => {
        setShowModal(false)
        setName('')
        setDescription('')
        setDuration('')
        setSelectedCheckboxes([])
    }

    const handleOpen = () => {
        setShowModal(true)
    }

    return (
        <>
            <Button className="btn btn-primary" onClick={() => handleOpen()}>
                Add Exercise
            </Button>

            <Modal show={showModal} onHide={() => handleClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Exercise</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name of Exercise</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={name}
                                onChange={(event) => setName(event.target.value)}  
                            />
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={description} 
                                onChange={(event) => setDescription(event.target.value)}  
                            />
                            <Form.Label>Duration per Rep</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={duration}
                                onChange={(event) => setDuration(event.target.value.replace(/[^0-9]/g, ''))}  
                            />
                            <Form.Label>Muscle Group</Form.Label>
                            {muscleGroups.map((group, index) => (
                                <Form.Check 
                                    type="checkbox"
                                    label={group.name}
                                    value={group.id}
                                    onChange={() => handleCheckboxChange(group.id)}
                                    checked={selectedCheckboxes.includes(group.id)}
                                />
                            ))}
                            <Form.Label>Image upload</Form.Label>
                            <ImageUpload
                                className="form-control" id="image"
                                onUpload={(image) => {
                                    setImage(image)
                                }}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-primary" onClick={handleSubmit}>
                        Create
                    </Button>
                    <Button variant="secondary" onClick={() => handleClose()}>
                        Cancel
                    </Button>
                    
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddExercisePopOut;