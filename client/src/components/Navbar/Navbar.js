import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import navbar from "./Navbar.module.css";
import { Dropdown, DropdownButton } from 'react-bootstrap';

function Navbar() {
  const handleSignOut = async () => {
    try {

      const data = {
        "token": localStorage["token"]
      };

      const response = await fetch("/api/signout", {
        method: "POST",
        mode: "cors",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.error(`Error: ${response.statusText}`);
      }
    }
    catch (err) {
      console.log(err)
    }

    window.location = "/";
  };

  const location = useLocation(); // once ready it returns the 'window.location' object
  const [url, setUrl] = useState(null);
  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  return (
    <nav className={navbar.nav}>
      <Link to="/home" className={navbar.navLink + (url === "/home" ? " "+navbar.active : "")}>
        Home
      </Link>
      <Link
        to="/progress"
        className={navbar.navLink + (url === "/progress" ? " "+navbar.active : "")}
      >
        My Progress
      </Link>
      <Link
        to="/workouts"
        className={navbar.navLink + (url === "/workouts" ? " "+navbar.active : "")}
      >
        My Workouts
      </Link>
      <Link
        to="/suggest-workout"
        className={navbar.navLink + (url === "/suggest-workout" ? " "+navbar.active : "")}
      >
        Suggest a Workout
      </Link>
      <DropdownButton title="Profile" className={navbar.dropdown} bsPrefix={navbar.navLink + (url === "/settings" ? " "+navbar.active : "")}>
        <Link
          to="/settings"
          className={navbar.navLink}
        >
          Settings
        </Link>
        <Dropdown.Item as="button">Another action</Dropdown.Item>
        <Dropdown.Item as="button">Something else</Dropdown.Item>
        <Link onClick={handleSignOut} className={navbar.navLink} id={navbar.signOut}>
          Sign Out
        </Link>
      </DropdownButton>
    </nav>
  );
}

export default Navbar;