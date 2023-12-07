import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalTest(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Workout Name / New Workout
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{float:"left"}}>
          Workout Name
        </p>
        <p style={{float:"right"}}>
          Work out description
        </p>r
        
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ModalTest;