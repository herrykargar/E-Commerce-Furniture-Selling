import React, { useContext } from "react";
import { MainContext } from "../context/MainContex.jsx";
import './ui.css';
export default function LogoutButton() {
    const { setIsLogin } = useContext(MainContext);
    const handleLogout = () => {
        setIsLogin(false);
    }
    return (
        <button type="button" className="logout-button" onClick={handleLogout}>Logout</button>
    )
}