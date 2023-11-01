import Popup from 'reactjs-popup';
import home from "./HomePage.module.css"
import React, { useState } from 'react';

export default function UpdateWeightPopup() {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    console.log("toggle popup")
    setShowPopup(!showPopup);
  };

  return (
    <div>
      <button onClick={togglePopup} id={home.weightButton}>Update Weight</button>
      <Popup open={showPopup} closeOnDocumentClick={false}>
        <div>
          <h2>Popup Content</h2>
          <p>This is the content of your popup.</p>
          <button onClick={togglePopup}>Close</button>
        </div>
      </Popup>
    </div>
  );
}
