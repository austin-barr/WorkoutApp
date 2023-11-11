import LoginPage from "./components/LoginPage/LoginPage";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import HomePage from "./components/HomePage/HomePage";
import './bootstrap.css'
// import SettingsPage from "./components/SettingsPage/SettingsPage";
// import Navbar from "./components/Navbar/Navbar";
// import LoginPageTest from "./components/LoginTest/LoginPageTest";

// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          {/* <Route path="/SignUpPage" element={<SignUpPage />} /> */}
          <Route path="/HomePage" element={<HomePage />} />
          {/* <Route path="/SettingsPage" element={<SettingsPage />} /> */}
          <Route path="/register" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
