// ScrollableButtonList.js
import React from "react";
import Button from "react-bootstrap/Button";
import ModalTest from "../modal/modalTest.js";

const ScrollableButtonList = ({ data }) => {
    const [modalShow, setModalShow] = React.useState(false)
  return (
    <div className="scrollable-list">
      {data.map((item, index) => (
        <Button key={index} className="btn-primary btn-block btn" type="button" style={{ marginTop: "2px" }} onClick={() => setModalShow(true)}>
          {item}
        </Button>
        
      ))}
      <ModalTest show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
};

export default ScrollableButtonList;
