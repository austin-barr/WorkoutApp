import './App.css';
import LoginPage from './LoginPage';

// App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
function App() {
  return (
     // <div className="App">
       //     <LoginPage />
         //   </div>

    
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element = {<LoginPage />} />
        </Routes>
      </BrowserRouter>
      </div>
    
  );
}

export default App;
