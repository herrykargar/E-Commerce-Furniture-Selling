import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { MainContext } from '../../context/MainContex';

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
  const [error, setError] = React.useState('');
  const { isLogin } = useContext(MainContext);
  const handelFormSubmit = async (event) => {
    event.preventDefault();
       
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
