import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import HomePage from "./components/HomePage/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import './bootstrap.css'
// import SettingsPage from "./components/SettingsPage/SettingsPage";
import ProgressPage from "./components/ProgressPage/ProgressPage";
import WorkoutPage from "./components/WorkoutPage/WorkoutPage";
import TempPage from './components/TempPage/TempPage';

// App.js
function App() {
  return (
    <div className="App" style={{height: '100vh'}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/progress" element={<ProtectedRoute><ProgressPage /></ProtectedRoute>} />
          <Route path="/workouts" element={<ProtectedRoute><TempPage /></ProtectedRoute>} />
          <Route path="/suggest-workout" element={<ProtectedRoute><TempPage /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><TempPage /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
