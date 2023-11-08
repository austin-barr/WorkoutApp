import React, { Component, useEffect, useState } from "react";
import { Link, useLocation, NavLink } from "react-router-dom";
import "../bootstrap.css";
import "./SettingsBar.css";
import Container from "react-bootstrap/Container";
// import Navbar from 'react-bootstrap/Navbar';

function Navbar() {
  const location = useLocation(); // once ready it returns the 'window.location' object
  const [url, setUrl] = useState(null);
  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);
  const [isActive, setIsActive] = useState(false);
  return (
    <nav class="vertical-menu" className="h-auto" style={{ Height: "5px" }}>
      <Link to="/" className={"underline" + (url === "/" ?" active" : "")}>LoginTest</Link>
      <Link to="/SignUpPage" className={"underline" + (url === "/SignUpPage" ?" active" : "")}>SignUp</Link>
      <Link to="/SettingsPage" className={"underline" + (url === "/SettingsPage" ?" active" : "")}>Settings</Link>
      <Link to="/HomePage" className={"underline" + (url === "/HomePage" ?" active" : "")}>Home</Link>
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
