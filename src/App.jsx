import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './client/pages/Home.jsx';
import SignIn from './client/pages/SingIn.jsx';
import SignUp from './client/pages/SignUp.jsx';
import ProtectedRoute from './client/components/ProtectedRoute.jsx';
import Navbar from './client/components/Navbar.jsx';
import Footer from './client/components/Footer.jsx';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />

          {/* <Route element={<ProtectedRoute />} > */}
            <Route path="/login" element={<SignIn />} />
          {/* </Route> */}
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path='/profile' />
            <Route path='/cart' />

            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          </Route>
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
