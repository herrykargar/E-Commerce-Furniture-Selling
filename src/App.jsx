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
import MyCart from './client/pages/Cart.jsx';
import Contact from './client/pages/Contact.jsx';
import Wishlist from './client/pages/Wishlist.jsx';
import Profile from './client/pages/Profile.jsx';
import MyOrder from './client/pages/MyOrder.jsx';
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
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/orders' element={<MyOrder />} />
            <Route path='/wishlist' element={<Wishlist />} />
            <Route path='/cart' element={<MyCart />} />

          </Route>
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
