import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ImageUpload from '../ImageUpload/ImageUpload';
import PhoneInput from '../PhoneInput/PhoneInput';
//import signup from './SignUpPage.module.css'

function SignUpPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthDate, setBirthday] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null)
  const [isMounted, setIsMounted] = useState(true);

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [birthDateError, setBirthDateError] = useState('');
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateInputs()) {
      console.log("input validaton failed")
      return
    }

    console.log('past return')

    const textData = {
      "username": username,
      "password": password,
      "confirm": confirm,
      "email": email,
      "phoneNumber": phoneNumber,
      "birthDate": birthDate
    };

    let userID;

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        mode: "cors",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(textData),
      });
  
      if (!response.ok) {
        console.error(`Error: ${response.statusText}`);
        return;
      }
  
      const responseData = await response.json();
      console.log(responseData)
  
      userID = responseData.userID;
      console.log("UserID:", userID);
  
    } catch (error) {
      console.error("Error:", error);
    }

    console.log("image:")
    console.log(image)
    if (image && userID) {
      const ext = image.name.slice((image.name.lastIndexOf(".") - 1 >>> 0) + 2);
      const renamedImage = new File([image], `user${userID}.${ext}`, { type: image.type });
      console.log(renamedImage)
      const formData = new FormData();
      formData.append('file', renamedImage);
      formData.append('userID', userID);

      try {
        const response = await fetch("/api/upload/user", {
          method: "POST",
          mode: "cors",
          body: formData
        })

        if (!response.ok) {
          console.error(`Error: ${response.statusText}`);
          return;
        }
    
        const responseData = await response.json();
        console.log(responseData)
    
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }

  const validateInputs = () => {
    console.log('validate called')
    let isValid = true;
    // username
    if (!username.trim()) {
      setUsernameError('Username is required');
      isValid = false;
    }
    else if (isNameAvailable(username.trim()) === false) { // (if undefined there was a server error)
      setUsernameError('Username is unavailable')
      isValid = false;
    }

    console.log('passed isAvailable')

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

    // email
    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    }
    else if (!/^[^@]+@[^@]+\.[^@]{2,}$/.test(email)) {
      setEmailError('Invalid email')
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

    // birthDate
    if (!birthDate.trim()) {
      setBirthDateError('Birth date is required');
      isValid = false;
    }

    return isValid
  }

  const isNameAvailable = (username) => {
    console.log('is available called')
    console.log(username)
    console.log('posting to lookup/username')
    fetch("/api/lookup/username", {
      method: "POST",
      mode: "cors",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"username": username})
    }).then((response) => {
      console.log(response)
        if (response.ok) {
          return response.body.success
        }
        else {
          console.log(response)
        }
    });
  }

  return (
    <div className={"d-flex justify-content-center align-items-center "}>
      <form onSubmit={handleSubmit} className="col-md-5" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px' }}>
        <h1>Big Fellas</h1>
        <div className="p-4">
          <div className="form-group">
            <label className="text-primary">Username:</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value.replace(/\s/g, ''));
                setUsernameError('');
              }}
            />
            {usernameError && <small className="text-danger">{usernameError}</small>}
          </div>
          <div className="form-group">
            <label className="text-primary">Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value.replace(/\s/g, ''));
                setPasswordError('');
              }}
            />
            {passwordError && <small className="text-danger">{passwordError}</small>}
          </div>
          <div className="form-group">
            <label className="text-primary">Confirm Password:</label>
            <input
              type="password"
              className="form-control"
              id="confirm"
              value={confirm}
              onChange={(event) => {
                setConfirm(event.target.value.replace(/\s/g, ''));
                setConfirmError('');
              }}
            />
            {confirmError && <small className="text-danger">{confirmError}</small>}
          </div>
          <div className="form-group">
            <label className="text-primary">Email:</label>
            <input
              type="text"
              className="form-control"
              id="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value.replace(/\s/g, ''));
                setEmailError('');
              }}
            />
            {emailError && <small className="text-danger">{emailError}</small>}
          </div>
            <label className="text-primary">Phone Number:</label>
            {/* id needed?? */}
          <div className="form-group">
            <PhoneInput
                inputClass="form-control"
                containerClass="form-group"
                classname="form-control"
                id="PhoneNumber"
                onChange={(value) => {
                setPhoneNumber(value);
                setPhoneNumberError('');
              }}
            />
            {phoneNumberError && <small className="text-danger">{phoneNumberError}</small>}
          </div>
          <div className="form-group">
            <label className="text-primary">Birthday:</label>
            <input
              type="date"
              className="form-control"
              id="birthday"
              value={birthDate}
              onChange={(event) => {
                setBirthday(event.target.value);
                setBirthDateError('');
              }}
            />
            {birthDateError && <small className="text-danger">{birthDateError}</small>}
          </div>
          <div className="form-group">
            <label className="-webkit-file-upload-button">Profile Image</label>
            <ImageUpload className="form-control" id="image"
              onUpload={(image) => {
                setImage(image);
                console.log(image)
              }}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
          <div style={{ marginTop: '10px' }}>
            <Link to="/">Wanna go home? Click here</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUpPage;