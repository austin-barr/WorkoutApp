<<<<<<< HEAD
import "./App.css";
import LoginPage from "./components/LoginPage/LoginPage";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import HomePage from "./components/HomePage/HomePage";
import Settingspage from "./components/SettingsPage/SettingsPage";

// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/SignUpPage" element={<SignUpPage />} />
          <Route path="/home/" element={<HomePage />} />
          <Route path="/settingsPage" element={<SignUpPage />} />
        </Routes>
=======
// App.js
import './App.css';
import LoginPage from './LoginPage';
import HomePage from './HomePage';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
function App() {
  return (

    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element = {<LoginPage />} />
        <Route path="/home/" element = {<HomePage />} />
      </Routes>
>>>>>>> 681df083b789284d491c8df9ae18942b7f61e056
      </BrowserRouter>
    </div>
  );
}

export default App;
