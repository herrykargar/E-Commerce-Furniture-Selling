import React, { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import '../../assets/css/navbar.css';
import Logo from '../../ui/Logo.jsx';
import SearchInpute from '../../ui/SearchInput.jsx';
import DropDownUser from '../../ui/DropDownUser.jsx';
import { MainContext } from '../../context/MainContex.jsx';

export default function Navbar() {
    const [isActive, setIsActive] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isLogin } = useContext(MainContext);

    const closeMenu = () => setIsMenuOpen(false);
    return (
        <>
            <nav className="navbar align-items-center justify-content-between px-3 px-sm-4 px-md-5">
                <div className="d-flex align-items-center gap-2">
                    <button
                        className="nav-toggle d-lg-none"
                        aria-label="Toggle navigation menu"
                        aria-expanded={isMenuOpen}
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                        type="button"
                    >
                        <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
                    </button>
                    <NavLink to='/' onClick={closeMenu}>
                        <Logo>Wooden World</Logo>
                    </NavLink>
                </div>
                <div className="nav-search-mobile d-lg-none w-100 mt-2">
                    <SearchInpute />
                </div>
                <div className={`nav-collection d-flex align-items-center gap-3 gap-sm-4 gap-md-4 gap-lg-5 ${isMenuOpen ? 'open' : ''}`}>
                    <div className='navlink d-flex gap-2 gap-sm-3 gap-md-4 gap-lg-5 align-items-center flex-wrap'>
                        <NavLink to="/" onClick={closeMenu}>Home</NavLink>
                        <NavLink to="/products" onClick={closeMenu}>Shop</NavLink>
                        <NavLink to="/about" onClick={closeMenu}>About</NavLink>
                        <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
                    </div>
                    <div className='navicon d-flex gap-3 gap-sm-4 align-items-center flex-wrap'>
                        <div className='position-relative'
                            onMouseEnter={() => setIsActive(true)}
                            onMouseLeave={() => setIsActive(false)}
                        >
                            <NavLink to="/profile" onClick={closeMenu}>
                                <i role="button" id='userIcon'
                                    className='fa-regular fa-user'>
                                </i>
                            </NavLink>
                            <div>
                                <DropDownUser isActive={isActive} />
                            </div>
                        </div>

                        {/* <>
                            <SearchInpute />
                        </> */}

                        <NavLink to="/wishlist" onClick={closeMenu}>
                            <i role="button" id='heartIcon' className="fa-regular fa-heart"></i>
                        </NavLink>
                        <NavLink to="/cart" onClick={closeMenu}>
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
                </div>
            </nav>
            <div
                className={`nav-overlay ${isMenuOpen ? 'show' : ''}`}
                onClick={closeMenu}
                role="button"
                aria-label="Close navigation"
            />
        </>
    )
}
