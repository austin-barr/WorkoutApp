import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import HomePage from "./components/HomePage/HomePage";
import SettingsPage from "./components/SettingsPage/SettingsPage";
import LoginPage from "./components/LoginPage/LoginPage";

// Assuming you have a function to check if the user is authenticated
// This is a placeholder, replace it with your actual authentication check
const isAuthenticated = () => {
  // return true if user is authenticated, false otherwise
};

function PrivateRouteWrapper({ children }) {
  return isAuthenticated() ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/home" element={<PrivateRouteWrapper><HomePage /></PrivateRouteWrapper>} />
          <Route path="/settingsPage" element={<PrivateRouteWrapper><SettingsPage /></PrivateRouteWrapper>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;