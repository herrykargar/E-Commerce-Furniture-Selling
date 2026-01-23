import React, { useContext } from "react";
import { MainContext } from "../context/MainContex.jsx";
import './ui.css';
export default function LogoutButton() {
    const { setIsLogin } = useContext(MainContext);
    const handleLogout = () => {
        setIsLogin(false);
    }
    return (
        <button type="button" className="logout-button btn" onClick={handleLogout}>Logout</button>
    )
}

export function DeleteProfileButton() {
    return (
        <button className="delete-profile-btn btn btn-danger">Delete Account</button>
    )
}