import "./App.css";
import LoginPage from "./components/LoginPage/LoginPage";
import SignUpPage from "./components/SignUpPage/SignUpPage";
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
          <Route path="/settingsPage" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
