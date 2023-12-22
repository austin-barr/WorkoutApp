import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
// import "../SettingsPage/SettingsPage.module.css";
import confirm from './ConfirmPopOut.module.css'
const ConfirmPopOut = (props) => {
    const [showModal, setShowModal] = useState(false);

    function handleDelete() {
        // Logic to delete the account goes here
        console.log('Account deleted');
        setShowModal(false);
        props.setOnOpen(false)
    }

    const onShow = () => {
        setShowModal(true)
        props.setIsOpen(true)
    }

    const onClose = () => {
        setShowModal(false)
        props.setIsOpen(false)
    }

    return (
            <>
            <Button className="btn btn-danger "  onClick={() => onShow()}>
                Delete Account
            </Button>
            

            <Modal show={showModal} onHide={() => onClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this account?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => onClose()}>
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

export default ConfirmPopOut;