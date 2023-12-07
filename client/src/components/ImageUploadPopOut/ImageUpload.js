import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
// import "../SettingsPage/SettingsPage.module.css";
import ImageUpload from '../ImageUpload/ImageUpload';


export default function ProfilePicUpload() {
    const [showModal, setShowModal] = useState(false);
    const [image, setImage] = useState(null)

   
    const handleSubmit = (event) => {
        event.preventDefault();
    }
    return (
        <>
            <Button className="btn btn-primary" onClick={() => setShowModal(true)}>
                Change Profile Pic
            </Button>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Phone Number</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-primary" onClick={handleSubmit}>
                    <ImageUpload className="form-control" id="image"
              onUpload={(image) => {
                setImage(image);
                console.log(image)
              }}
                     />
                    </Button>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    
                </Modal.Footer>
            </Modal>
        </>
    );
}