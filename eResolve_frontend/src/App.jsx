import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/user/login/Login';
import Home from './pages/user/home/Home';
import Signup from './pages/user/signUp/Signup';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;