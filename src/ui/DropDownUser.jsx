import { NavLink } from "react-router-dom";
import React, { useContext } from "react";
import { MainContext } from "../context/MainContex.jsx";
import LogoutButton from "./LogoutButton.jsx";

export default function DropDownUser({ isActive }) {
    const { isLogin } = useContext(MainContext);

    return (
        <>
            <div className={`dropdown-user${isActive ? ' active-user-drop-down' : ''}`}>
                {!isLogin && <NavLink to="/login">Login</NavLink>}
                {!isLogin && <NavLink to="/signup">SignUp</NavLink>}
                {isLogin && <NavLink to="/profile">Profile</NavLink>}
                {isLogin && <NavLink to="/orders">Orders</NavLink>}
                {isLogin && <LogoutButton />}
            </div>
        </>
    )
}