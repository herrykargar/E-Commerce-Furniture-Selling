import React, { useState, useContext } from 'react'
import { MainContext } from '../context/MainContex';
import './ui.css';

export default function AddToCartButton({ productId, color, qty, border = true, className = '' }) {
    const [added, setAdded] = useState(false);
    const { cart, setCart } = useContext(MainContext);
    const resolvedId = productId;
    const onClick = () => {
        if (!resolvedId) return;
        if (!color) return alert('Please select a color');
        if (cart.findIndex(item => item.productId === resolvedId && item.color === color) !== -1) {
            alert('Product already in cart');
            return;
        }
        if (!added) {
            setCart((prev) => [...prev, { productId: resolvedId, color, qty }]);
            setAdded(true);
        }
        alert(`product added to cart successfully id: ${resolvedId} color: ${color} qty: ${qty}`);
        console.log("🚀 cart:", cart);
    };
    return (
        <>
            <button className={` ${className ? className : 'add-to-cart-button'} ${border ? 'with-border' : ''}`} onClick={onClick}>Add To Cart</button>
        </>
    )
}
