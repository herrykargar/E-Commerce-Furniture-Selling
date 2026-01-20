import React, { useState, useContext, useEffect } from 'react'
import { MainContext } from '../../context/MainContex'
import { NavLink } from 'react-router-dom'
import '../../assets/css/forms.css'
export default function SignUp() {
  const { isLogin, setIsLogin } = useContext(MainContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    phone: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !formData.address || !formData.phone) {
      setError('Please fill in all fields');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    } else if (!/\d/.test(formData.password) || !/[a-zA-Z]/.test(formData.password)) {
      setError('Password must contain both letters and numbers');
      return;
    } if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (!/^\+?[0-9]{10}$/.test(formData.phone)) {
      setError('Please enter a valid phone number');
      return;
    }
    // cleare then form
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      address: '',
      phone: ''
    });
    setError('');
    setIsLogin(true);
    alert('Sign up successful!');
  }

  useEffect(() => {
    if (isLogin) {
      window.location.href = '/';
    }
  }, [isLogin]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <h2>Create an Account</h2>
          <div className='form-group'>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>
          <button type="submit" className='submit-button'>Sign Up</button>
          {error && <p className='error-message'>{error}</p>}
          <div className='divider'>
            <p>Already have an account? <NavLink to="/login">Log in</NavLink></p>
          </div>
        </div>
      </form>
    </div>
  )
}
