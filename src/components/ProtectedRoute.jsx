import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    // Replace this with your actual authentication logic (e.g., from Context or Redux)
    // Check if a token exists in local storage
    const isAuthenticated = localStorage.getItem("userToken") ? true : false;

    // If authenticated, render child routes via <Outlet />
    // If not, redirect to the login page
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;