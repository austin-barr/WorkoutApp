import "./App.css";
import LoginPage from "./components/LoginPage/LoginPage";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import HomePage from "./components/HomePage/HomePage";
import SettingsPage from "./components/SettingsPage/SettingsPage";

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
          <Route path="/SettingsPage" element={<SettingsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
