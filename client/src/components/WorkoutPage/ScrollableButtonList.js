// ScrollableButtonList.js
import React from "react";
import Button from "react-bootstrap/Button";
import WorkoutPopup from '../ProgressPage/WorkoutPopup'

const ScrollableButtonList = ({ data }) => {
    const [modalShow, setModalShow] = React.useState(false)
  return (
    <div className="scrollable-list">
      {data.map((item, index) => (
        <Button key={index} className="btn-primary btn-block btn" type="button" style={{ marginTop: "2px" }} onClick={() => setModalShow(true)}>
          {item}
        </Button>
        
      ))}
      <WorkoutPopup show={modalShow} onHide={() => setModalShow(false)} />
      <WorkoutPopup
          className="btn btn-primary form-control"
          title={`Edit Log: `}
          buttonText="Edit Log"
          workout={{}}
          mode={"edit-log"}
          onSave={()=>(0)}
        />
    </div>
  );
};

export default ScrollableButtonList;
