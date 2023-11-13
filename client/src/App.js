import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import HomePage from "./components/HomePage/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import './bootstrap.css'
import SettingsPage from "./components/SettingsPage/SettingsPage";
import ProgressPage from "./components/ProgressPage/ProgressPage";
import WorkoutPage from "./components/WorkoutPage/WorkoutPage";
import TempPage from './components/TempPage/TempPage';

// App.js
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <ProtectedRoute path="/register" element={<SignUpPage />} />
          <ProtectedRoute path="/home" element={<HomePage />} />
          <ProtectedRoute path="/progress" element={<TempPage />} />
          <ProtectedRoute path="/workouts" element={<TempPage />} />
          <ProtectedRoute path="/suggest-workout" element={<TempPage />} />
          <ProtectedRoute path="/settings" element={<TempPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
