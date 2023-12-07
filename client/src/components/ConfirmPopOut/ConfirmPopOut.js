import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
// import "../SettingsPage/SettingsPage.module.css";

export default function ConfirmPopOut() {
    const [showModal, setShowModal] = useState(false);

    function handleDelete() {
        // Logic to delete the account goes here
        console.log('Account deleted');
        setShowModal(false);
    }

    return (
        <>
            <Button className="btn btn-danger"  onClick={() => setShowModal(true)}>
                Delete Account
            </Button>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this account?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button className="btn btn-danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
