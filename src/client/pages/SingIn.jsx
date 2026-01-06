import React from 'react'
import { NavLink } from 'react-router-dom'
import { useForm } from "react-hook-form"
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import Axios from 'axios';

export default function SingIn() {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE_FIELD':
        return {
          ...state,
          [action.name]: action.value,
        };
      default:
        return state;
    }
  };
  // State to hold form data
  const [state, dispatch] = React.useReducer(reducer, {
    email: '',
    password: '',
  });
  const [isLogin, setIsLogin] = React.useState(false);
  const [error, setError] = React.useState('');

  const handelFormSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (!state.email || !state.password) return setError('All fields are required');
    if (!/^\S+@\S+\.\S+$/.test(state.email)) return setError('Please enter a valid email address');
    if (!/.{8,}$/.test(state.password)) {
      return setError('Password must be 8 characters long');
    }
    try {
      const response = await Axios.post('/api/signin', { email: state.email, password: state.password });
      const data = response.data;
      console.log(data);
      setIsLogin(data.isLogin);
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Update state with form input values
    dispatch({ type: 'UPDATE_FIELD', name: name, value: value });
  };

  return (
    <div>
      {isLogin && <NavLink to='/' />}
      <form onSubmit={(event) => handelFormSubmit(event)} >
        <div><h2>Welcome Back</h2></div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name='email' id='email' autoComplete='off' onChange={(event) => handleInputChange(event)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name='password' id='password' autoComplete='off' onChange={(event) => handleInputChange(event)} />
        </div>
        <div>
          <button type="submit">Sign In</button>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  )
}
