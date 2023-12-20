import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Navbar from "../Navbar/Navbar";
import ConfirmPopOut from "../ConfirmPopOut/ConfirmPopOut";
import ProfilePicUpload from "../ImageUploadPopOut/ImageUpload";
import ChangePasswordPopOut from "../ChangePassword/ChangePassword";
import PhoneNumberPopOut from "../PhoneNumberPopOut/PhoneNumber";
import ImageUpload from '../ImageUpload/ImageUpload';
import settings from './SettingsPage.module.css'

import { Link } from "react-router-dom";
import { useEffect } from "react";

function SettingsPage() {
    const [password, setPassword] = useState("");
    const [Username, setUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirm, setConfirm] = useState('');

    const [phoneNumber, setPhoneNumber] = useState('');

    const [confirmPassword, setConfirmPassword] = useState("");
    const [image, setImage] = useState(null)
    
    const [profilePic, setProfilePic] = useState("");
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmError, setConfirmError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [birthDateError, setBirthDateError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const deleteAccount = (event) => {
        event.preventDefault();
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const textData = {
            "password": password,
            "confirm": confirm,
            "phoneNumber": phoneNumber,
          };
        if (!validateInputs()) {
            console.log("input validaton failed")
            return
          }
          const validateInputs = () => {
            console.log('validate called')
            let isValid = true;
            // username
        
            // password
            if (!password.trim()) {
              setPasswordError('Password is required')
              isValid = false;
            }
            else if (password.trim().length < 8) {
              setPasswordError('Password must be at least 8 characters')
              isValid = false;
            }
            // more password stuff here
        
            if (confirm !== password) {
              setConfirmError('Passwords must match')
              isValid = false;
            }
        
            
        
            // phone
            if (!phoneNumber.trim()) {
              setPhoneNumberError('Phone number is required');
              isValid = false;
            }
            else if (phoneNumber.length !== 10) {
              setPhoneNumberError('Invalid phone number')
              isValid = false
            }
        
        
            return isValid
          }
        console.log("Password: ", password);
        console.log("New Password: ", newPassword);
    };

    useEffect(() => {
        getUsername();
        getProfilePic();
        }, [Username, profilePic]);

    const getUsername = async () => {
    console.log("getUsername called")

    try {
      const response = await fetch('/api/lookup/username', {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage["token"]}`,
          },
      });
  
      if (!response.ok) {
          console.error(`Error: ${response.statusText}`);
          return;
      }
        const responseData = await response.json();
        console.log(responseData.rows);
        setUsername(responseData.rows.username)
        

    }
    catch (err) {
      console.log(err)
    }
    }

    const getProfilePic = async () => {
    console.log("getProfilePic called")
    try {
        const response = await fetch('/api/get/profilepic', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
      });
      if (!response.ok) {
        console.error(`Error: ${response.statusText}`);
        return;
    }
      const responseData = await response.json();
      console.log(responseData.rows.image)
      setProfilePic(responseData.rows.image)
      console.log(responseData.rows);

  }
  catch (err) {
    console.log(err)
  }
  }
    return (   
          <div className={"id-flex justify-content-center align-items-center " + settings.body + " " + isDeleteOpen ? settings.delete : ""} >
            <Navbar />
            <form className="form-container" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px' }}>
              <center>
                <img src={profilePic} alt="profile pic" className={"rounded-circle"} style={{width: '200px', height: '200px;'}}/>
                <p class="h-2 ">{Username}</p>
              </center>
              <div className="p-4">
                p4 here
              </div>  
              <div className={settings.popups}>
                <ProfilePicUpload />
                <ChangePasswordPopOut />
                <PhoneNumberPopOut phoneNumber=""/>
                <ConfirmPopOut setIsOpen={setIsDeleteOpen}/>
              </div>
            </form>
          </div>
    );
}

export default SettingsPage;
