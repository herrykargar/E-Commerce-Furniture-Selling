import React, { useState, useContext, useEffect } from 'react'
import { MainContext } from '../context/MainContex'
import './ui.css'

export default function CheckOutButton({ children }) {
    const { cart, setCart } = useContext(MainContext);
    const [loading, setLoading] = useState(false);
    const checkOutHandler = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setCart([]);
            alert("Checkout successful!");
        }, 1000);
    }
    return (
        <button className='checkout-button' onClick={() => {
            checkOutHandler();
        }}>{loading ? 'Processing...' : children}</button>
    )
}
