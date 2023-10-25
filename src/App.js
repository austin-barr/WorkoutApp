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
      </BrowserRouter>
      </div>
    
  );
}

export default App;
