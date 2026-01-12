import React from 'react'
import ShopNowBtn from '../../ui/ShopNowBtn.jsx';
import { NavLink } from 'react-router-dom';

export default function Hero() {
  const handelArrival = (e) => {
    e.preventDefault();
    console.log("Shop Now clicked");
    // Logic to navigate to the new arrivals section or page
    window.location.href = '/product';
  }
  return (
    <div className='hero position-relative'>
      <h1>Welcome to Wooden World</h1>
      <div className='hero-overlay position-absolute d-flex flex-column gap-4'>
        <div className='text-start'>
          <p className='m-0'>New Arrival</p>
        </div>
        <div className='discover-text' >
          <h3>Discover Our New Collection</h3>
        </div>
        <div>
          {/* <NavLink to="/product"> */}
          <div onClick={(e) => { handelArrival(e) }}>
            <ShopNowBtn>Shop Now</ShopNowBtn>
          </div>
          {/* </NavLink> */}
        </div>
      </div>
    </div>
  )
}