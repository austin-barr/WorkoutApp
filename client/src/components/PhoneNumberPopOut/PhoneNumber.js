import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
// import "../SettingsPage/SettingsPage.module.css";

export default function PhoneNumberPopOut() {
    const [showModal, setShowModal] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    }

    const handleSubmit = async () => {
        try {
            await axios.post('/api/phonenumber', { phoneNumber });
            console.log('Phone number updated');
        } catch (error) {
            console.error('Error updating phone number', error);
        }
        setShowModal(false);
    }

    return (
        <>
            <Button className="btn btn-primary" onClick={() => setShowModal(true)}>
                Change Phone Number
            </Button>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Phone Number</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>New Phone Number</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter new phone number" 
                            value={phoneNumber} 
                            onChange={handlePhoneNumberChange} 
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-primary" onClick={handleSubmit}>
                        Update
                    </Button>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    
                </Modal.Footer>
            </Modal>
        </>
    );
}

