import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useReducer, useEffect } from 'react';
import Home from './pages/Home.jsx';
import SignIn from './pages/SingIn.jsx';
import SignUp from './pages/SignUp.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import './App.css';

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          </Route>
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
