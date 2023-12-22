import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
// import "../SettingsPage/SettingsPage.module.css";
import ImageUpload from '../ImageUpload/ImageUpload';


 const ProfilePicUpload = () => {
    const [showModal, setShowModal] = useState(false);
    const [image, setImage] = useState()

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
    
    const handleSubmit = () => {
       
    }
    
    return (
        <>
            <Button className="btn btn-primary" onClick={() => setShowModal(true)}>
                Change Profile Pic
            </Button>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Profile Pic</Modal.Title>
                    
                </Modal.Header>
                <Modal.Body>
                <p style={{color: "red"}}>WORK IN PROGRESS</p>
                </Modal.Body>
                
                <Modal.Footer>
                <ImageUpload
                    className="form-control" id="image"
                    onUpload={(image) => {
                        setImage(image)
                        console.log(image)
                    }}
                />
                    <Button onClick={() => handleSubmit()}> Submit </Button>
                
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ProfilePicUpload;