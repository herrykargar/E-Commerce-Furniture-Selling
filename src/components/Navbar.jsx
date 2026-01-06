import React from 'react'
import { NavLink } from 'react-router-dom'
import '../assets/css/navbar.css'

export default function Navbar() {
    return (
        <div className="navbar">
            <div>
                Logo Section
            </div>
            <div>
                Search Bar
            </div>
            <div>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/signup">Sign Up</NavLink>
            </div>
        </div>
    )
}
