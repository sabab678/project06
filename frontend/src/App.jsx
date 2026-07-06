import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './page/Home.jsx'

import './App.css'
import Register from './page/Register.jsx'
import Login from './page/Login.jsx'
import OTP from './page/OTP.jsx'
import Profile from './page/Profile.jsx'
import History from './page/History.jsx'

function App() {

  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/history" element={<History />} />
      </Routes>
      
    </Router> 
  )
}

export default App
