import React, { useContext, useEffect } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { MainContext } from '../../context/MainContex';
import '../../assets/css/forms.css'

export default function SingIn() {
  const navigate = useNavigate();
  const { isLogin, setIsLogin } = useContext(MainContext);
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  });
  const [error, setError] = React.useState('');

  const handelFormSubmit = (e) => {
    console.log("form submitted");

    e.preventDefault();
    if (formData.email === '' || formData.password === '') {
      setError('Please fill in all fields');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    setFormData({
      email: '',
      password: ''
    });
    setError('');
    setIsLogin(true);
  };

  useEffect(() => {
    if (isLogin) {
      navigate('/');
    }
  }, [isLogin, navigate]);

  return (
    <div>
      <form onSubmit={(e) => handelFormSubmit(e)} >
        <div className="form-container">
          <h2>Wellcome Back</h2>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              autoComplete='on'
            />
          </div>
          {error && <p className='error-message'>{error}</p>}
          <button type="submit" className="submit-button">Sign In</button>
          <div className="divider">
            <p className="gray-text">Don't have an account? <Link to='/signup'>Sign Up</Link></p>
          </div>
        </div>
      </form>
    </div>
  )
}
