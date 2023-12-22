import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AuthorizeUserPopup = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getUsers()
  }, [])

  const handleClose = () => {
    setShowModal(false)
  }

  const handleOpen = () => {
    setShowModal(true)
  }

  const getUsers = async () => {
    try {
      const response = await fetch('/api/get/users', {
        method: "GET"
      })
      console.log(response)
      if (!response.ok) {
        return
      }
    }
    catch (err) {
      console.error(err)
    }
  }
  
  return (
    <>
      <Button className="btn btn-primary" onClick={() => handleOpen()}>
        Authorize Users
      </Button>

      <Modal show={showModal} onHide={() => handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Add Exercise</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AuthorizeUserPopup;