import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Navbar from "../Navbar/Navbar";
import ConfirmPopOut from "../ConfirmPopOut/ConfirmPopOut";
import ProfilePicUpload from "../ImageUploadPopOut/ImageUpload";
import ChangePasswordPopOut from "../ChangePassword/ChangePassword";
import AddExercisePopOut from "../AddExercisePopOut/AddExercise";
import PhoneNumberPopOut from "../PhoneNumberPopOut/PhoneNumber";
import ImageUpload from '../ImageUpload/ImageUpload';
import settings from './SettingsPage.module.css'
import AuthorizeUserPopup from "../AuthorizeUserPopup/AuthorizeUserPopUp";

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
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false)

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
      getPermissions();
    }, [Username, profilePic]);

    const getPermissions = async () => {
      console.log('get permissions')
      try {
        const authResponse = await fetch('/api/get/isAuthorized', {
          method: 'GET'
        })
        if (!authResponse.ok) {
          console.error(`Error: ${authResponse.statusText}`);
          return;
        }
        const authResult = await authResponse.json()
        console.log('auth result')
        console.log(authResult)
        setIsAuthorized(authResult.result)
      }
      catch (err) {
        console.error(err)
      }

      // try {
      //   const adminResponse = await fetch('/api/get/isAdmin', {
      //     method: 'GET'
      //   })
      //   if (!adminResponse.ok) {
      //     console.error(`Error: ${adminResponse.statusText}`);
      //     return;
      //   }
      //   const adminResult = await adminResponse.json()
      //   console.log('admin result')
      //   console.log(adminResult)
      //   setIsAdmin(adminResult.result)
      // }
      // catch (err) {
      //   console.error(err)
      // }
    }

    const getUsername = async () => {
      console.log("getUsername called")

      try {
        const response = await fetch('/api/lookup/username', {
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
          <div className={"id-flex justify-content-center align-items-center " + settings.body + " " + (isDeleteOpen ? settings.delete : "")} >
            <Navbar />
            <form className="form-container" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px' }}>
              <center>
                <h1 class="display-5">{Username}</h1>
              </center>
              <div className={settings.popups}>
                <h2 class="my-4">
                  Account Options
                </h2>
                <ProfilePicUpload />
                <ChangePasswordPopOut />
                <PhoneNumberPopOut />
                {/* <ConfirmPopOut setIsOpen={setIsDeleteOpen}/> */}
                {isAuthorized!=0 &&
                  <>
                    <h2 class="my-4">
                      Authorized User Options
                    </h2>
                    <AddExercisePopOut />
                  </>
                }
                {/* {isAdmin!=0 &&
                  <>
                    <h2>
                      Admin Options
                    </h2>
                      <AuthorizeUserPopup />
                  </>
                } */}
              </div>
            </form>
          </div>
    );
}

export default SettingsPage;
