import React, { Component, useEffect, useState } from "react";
import { Link, useLocation, NavLink } from "react-router-dom";
import "../bootstrap.css";
import "./Navbar.css";
import Container from "react-bootstrap/Container";
// import Navbar from 'react-bootstrap/Navbar';

function Navbar() {
  // handleSignOut = (event) => {
  //   // handle signing out, send something to backend?

  //   window.location = "/";
  // };

  const location = useLocation(); // once ready it returns the 'window.location' object
  const [url, setUrl] = useState(null);
  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);
  const [isActive, setIsActive] = useState(false);
  return (
    <nav class="vertical-menu" className="h-auto" style={{ Height: "5px" }}>
      <Link to="/" className={"underline" + (url === "/" ? " active" : "")}>
        Login
      </Link>
      <Link
        to="/myWorkouts"
        className={"underline" + (url === "/myWorkouts" ? " active" : "")}
      >
        My Workouts
      </Link>
      <Link
        to="/SettingsPage"
        className={"underline" + (url === "/SettingsPage" ? " active" : "")}
      >
        Settings
      </Link>
      <Link
        to="/HomePage"
        className={"underline" + (url === "/HomePage" ? " active" : "")}
      >
        Home
      </Link>
      <Link to="/" classname="bg-danger" style={{ bg: "red" }}>
        Sign Out
      </Link>

      {/* <NavLink to="/SignUpPage"className={"underline" + isActive?" active" : ""}>SignUp</NavLink>
      <NavLink to="/SettingsPage"className={"underline" + isActive?" active" : ""}>Settings</NavLink> */}
      {/* <a href="/SettingsPage">SettingsPage</a>
      <a href="#">Link 4</a> */}
    </nav>
  );
}

export default Navbar;

// function TextLinkExample() {
//     return (
//       <Navbar className="bg-body-tertiary">
//         <Container>
//           <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
//           <Navbar.Toggle />
//           <Navbar.Collapse className="justify-content-end">
//             <Navbar.Text>
//               Signed in as: <a href="#login">Mark Otto</a>
//             </Navbar.Text>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     );
//   }

//   export default TextLinkExample;
