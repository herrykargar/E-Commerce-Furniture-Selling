import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './client/pages/Home.jsx';
import SignIn from './client/pages/SingIn.jsx';
import SignUp from './client/pages/SignUp.jsx';
import Products from './client/pages/Products.jsx';
import ProductDetail from './client/pages/ProductDetail.jsx';
import ProtectedRoute from './client/components/ProtectedRoute.jsx';
import Navbar from './client/components/Navbar.jsx';
import Footer from './client/components/Footer.jsx';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// https://0dvlp9zz-5173.inc1.devtunnels.ms/

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />

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
