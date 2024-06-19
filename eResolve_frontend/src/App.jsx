import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/user/login/Login.jsx';
import Home from './pages/user/home/Home';
import Signup from './pages/user/signUp/Signup.jsx';
import ComplaintForm from './pages/user/complains/complains.jsx';
import PastComplaint from './pages/user/pastcomplaints/PastComplaint.jsx';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/complain" element = {<ComplaintForm />} />
      <Route path='/pastcomplaints' element={<PastComplaint />} />
    </Routes>
  );
}

export default App;