import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function UpdateWeightPopup(props) {
    const [show, setShow] = useState(false);
    const [weight, setWeight] = useState('');
    const [date, setDate] = useState('');
    const [weightError, setWeightError] = useState('');
    const [dateError, setDateError] = useState('');
  
    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        setWeightError('');
        setDateError('');
        setWeight('');
        setDate('')
    }
  
    const handleSaveChanges = async() => {
      console.log("save changes")
      const data = {
        "weight": weight,
        "date": date
      }

      if (!validateInputs()) {
        console.log("input validaton failed")
        return
      }

      try {
        const response = await fetch('/api/log/weight', {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage["token"]}`,
            },
            body: JSON.stringify(data),
        });
        console.log("after post")
    
        if (!response.ok) {
            console.error(`Error: ${response.statusText}`);
            return;
        }

        console.log('Weight:', weight);
        console.log('Date:', date);
        props.onClick({weight: weight, date: date})
        handleClose();
      }
      catch (err) {
        console.log(err)
      }
    };

    const validateInputs = () => {
        let isValid = true;
  
        if (!weight.trim()) {
          setWeightError('Enter weight');
          isValid = false;
        }
  
        if (!date.trim()) {
          setDateError('Enter date')
          isValid = false;
        }
    
        return isValid
      }
    
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Update Weight
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Weight</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formWeight">
                <Form.Label>Enter Your Weight:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter weight in lbs"
                  value={weight}
                  onChange={(event) => {
                    setWeight(event.target.value.replace(/\s/g, ''));
                    setWeightError('');
                  }}
                  autoFocus
                />
                {weightError && <small className="text-danger">{weightError}</small>}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formDate">
                <Form.Label>Select Date</Form.Label>
                <Form.Control
                  type="date"
                  value={date}
                  onChange={(event) => {
                    setDate(event.target.value);
                    setDateError('');
                  }}
                />
                {dateError && <small className="text-danger">{dateError}</small>}
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" className="form-control" onClick={handleSaveChanges}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}