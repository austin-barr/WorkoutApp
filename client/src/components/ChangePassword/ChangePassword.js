import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
//import "../SettingsPage/SettingsPage.module.css";

export default function ChangePasswordPopOut() {
    const [showModal, setShowModal] = useState(false);
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [newPassword, setNewPassword] = useState('');
    
    const [confirmError, setConfirmError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [NewPassowrdError, setNewPasswordError] = useState('');


    const [confirmPassword, setConfirmPassword] = useState('');
    const handlePasswordChange = (event) => {
        setPassword(event.target.value.replace(/\s/g, ''));
        setPasswordError('');
    }
    const handlePasswordConfirm = (event) => {
        setNewPassword(event.target.value.replace(/\s/g, ''));
        setConfirmError('');
    }
    const handleCurrentPasswordChange = (event) => {
        setConfirm(event.target.value.replace(/\s/g, ''));
        setConfirmError('');
    }
    const handleSignOut = async () => {
        try {
    
          const data = {
            "token": localStorage["token"]
          };
    
          const response = await fetch("/api/signout", {
            method: "POST",
            mode: "cors",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
          });
    
          if (!response.ok) {
            console.error(`Error: ${response.statusText}`);
          }
        }
        catch (err) {
          console.log(err)
        }
    
        window.location = "/";
      };

    const validateInputs = () => {
        let isValid = true;
        
        if (!newPassword.trim()) {
            setNewPasswordError('Password is required')
            isValid = false;
          }
          else if (newPassword.trim().length < 8) {
            setNewPasswordError('Password must be at least 8 characters')
            isValid = false;
          }
          // more password stuff here
      
          if (confirm !== newPassword) {
            setNewPasswordError('Passwords must match')
            isValid = false;
          }
          return isValid
        }
        
    const handleSubmit = async () => {
        console.log("handle");

        if (!validateInputs()) {
            console.log("input validaton failed")
            return
          }
          const textData = {
            "password": password,
            "NewPassword": newPassword
,
        }
        try {
            const response = await fetch("/api/changePassword", {
              method: "POST",
              mode: "cors",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(textData)
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
        
      
          handleSignOut();
    }

        

    return (
        <>
            <Button className="btn btn-primary" onClick={() => setShowModal(true)}>
                Change Password
            </Button>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control 
                        type="password"
                        className="form-control"
                        id="current-password"
                        value={password}
                        onChange={handlePasswordChange}
                        />
                        
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                                type="password"
                                className="form-control"
                                id="password"
                                value={newPassword}
                                onChange={handlePasswordConfirm}
                                />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control
                    type="password"
                    className="form-control"
                    id="confirm"
                    value={confirm}
                    onChange={handleCurrentPasswordChange}
                    />
                    <div className="form-error-container">
                    <small className="text-danger form-error-message">{NewPassowrdError}</small>
                    </div>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-primary" onClick={handleSubmit}>
                        Change Password
                    </Button>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    
                </Modal.Footer>
            </Modal>
        </>
    );
}
