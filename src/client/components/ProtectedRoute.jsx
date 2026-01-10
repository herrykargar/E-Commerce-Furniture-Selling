import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { MainContext } from '../../context/MainContex.jsx';
const ProtectedRoute = () => {
    const { isLogin } = useContext(MainContext);
    return isLogin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;