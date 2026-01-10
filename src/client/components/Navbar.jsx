import React, { useState, useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import '../../assets/css/navbar.css';
import Logo from '../../ui/Logo.jsx';
import SearchInpute from '../../ui/SearchInput.jsx';
import DropDownUser from '../../ui/DropDownUser.jsx';
import { MainContext } from '../../context/MainContex.jsx';

export default function Navbar() {
    const [isActive, setIsActive] = useState(false);
    const { isLogin, setIsLogin } = useContext(MainContext);
    useEffect(() => {
        
    }, [setIsLogin]);
    return (
        <>
            <nav className="navbar align-items-center justify-content-between px-3 px-sm-4 px-md-5">
                <div>
                    <NavLink to='/'>
                        <Logo>ooden World</Logo>
                    </NavLink>
                </div>
                <div className='navlink d-flex gap-2 gap-sm-3 gap-md-4 gap-lg-5 align-items-center'>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/product">Shop</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                </div>
                <div className='navicon d-flex gap-3 gap-sm-4 align-items-center'>
                    <div className='position-relative'
                        onMouseEnter={() => setIsActive(true)}
                        onMouseLeave={() => setIsActive(false)}
                    >
                        <NavLink to="/profile">
                            <i role="button" id='userIcon'
                                className='fa-regular fa-user'>
                            </i>
                        </NavLink>
                        <div>
                            <DropDownUser isActive={isActive} />
                        </div>
                    </div>

                    <>
                        <SearchInpute /> 
                    </>
                    
                    <NavLink to="/wishlist">
                        <i role="button" id='heartIcon' className="fa-regular fa-heart"></i>
                    </NavLink>
                    <NavLink to="/cart">
                    <svg
                        id='cartIcon'
                        role="button"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="cart-icon"
                    >
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61H19a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                    </NavLink>
                </div>
            </nav>
        </>
    )
}
