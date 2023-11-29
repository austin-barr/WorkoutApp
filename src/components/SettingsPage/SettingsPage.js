// SettingsPage.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./SettingsPage.css";
// import { useModalState } from "../modal/modal.js";
// import "../modal/modal.js"
import axios from "axios";
import Navbar from "../Navbar/Navbar.js";
// import"./Settingsbar.js"
// import SignUpPage from '../SignUpPage/SignUpPage';
function SettingsPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // const {
  //   isOpen: isAddExerciseModalOpen,
  //   openModal: openAddExerciseModal,
  //   closeModal: closeAddExerciseModal,
  // } = useModalState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://192.168.57.6:3001/api/login", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      // Redirect to protected route
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-auto p-3">
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className="h-100 d-flex flex-column justify-content-center align-items-center"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", padding: "25px" }}
      >
        <h1>Big Boys, Big Setting</h1>
        <div className="p-4">
          <div className="form-group">
            <Popup
              trigger={<button className="popup"> Change Username </button>}
            >
              <form className="form-control">
               <label class="text-primary">New Username:</label>
                <input className="form-control" id="username"></input>
                {/* className="form-control"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            /> */}
              </form>
            </Popup>
          </div>
          <div className="form-group">
            <label class="text-primary">Change Password:</label>
            {/* <button className="btn btn-primary" onClick={openAddExerciseModal}>
              Change passowrd
            </button> */}
          </div>
          <div className="form-group">
            <label class="text-primary">Confirm Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label class="text-primary"> Change Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label class="text-primary">Change Phone Number:</label>
            <input
              type="phoneNumber"
              className="form-control"
              id="phoneNumber"
              value={password}
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>
          <p></p>
          <button type="submit" className="btn btn-primary">
            Confirm
          </button>
          <div style={{ marginTop: "10px" }}>
            Set up your settings so you can do more sets and get more swole!
          </div>
        </div>
      </form>
    </div>
  );
}

export default SettingsPage;
// <div>
//   <Navbar />
//   <div class="SettingsContainer">
//     <div class="UpperSignIn">
//       <h2>Big Boys, Big Settings</h2>
//       <p> Fine tune Yourself</p>
//     </div>
//     <div class="userName">
//       <label>Change User Name:</label>
//       <input
//         type="text"
//         name="username"
//         value={this.state.username}
//         onChange={this.handleInputChange}
//       />
//     </div>
//     <div>
//       <label>Change Email:</label>
//       <input
//         type="email"
//         name="email"
//         value={this.state.email}
//         onChange={this.handleInputChange}
//       />
//     </div>
//     <div>
//       <label>Change Email:</label>
//       <input
//         type="text"
//         name="phoneNumber"
//         value={this.state.email}
//         onChange={this.handleInputChange}
//       />
//     </div>
//     <button onClick={this.handleSettings}>Login</button>
//     <div class="LowerLogin">
//       <p> Big Fellas Inc© </p>
//       So You want to become a be fella? Click here to get{" "}
//       <Link to="/SignUpPage"> Swole</Link>
//     </div>
//   </div>
// </div>
// );
