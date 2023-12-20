import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
// import "../SettingsPage/SettingsPage.module.css";
import confirm from './ConfirmPopOut.module.css'
const ConfirmPopOut = async (props) => {
    const [showModal, setShowModal] = useState(false);

    function handleDelete() {
        // Logic to delete the account goes here
        console.log('Account deleted');
        setShowModal(false);
        props.setOnOpen(false)
    }

    const onShow = () => {
        props.setOnOpen(true)
        console.log('open')
    }

    return (
            <div className = {confirm.body}>
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
        </div>
    );
}

export default ConfirmPopOut;