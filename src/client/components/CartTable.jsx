import React, { useState, useContext } from 'react'
import { MainContext } from '../../context/MainContex'
import { formatIndianCurrency } from '../../utils/formatIndianCurrency';
import QtyPicker from '../../shared/components/QtyPicker';
export default function CartTable() {
    const { cart, setCart, products } = useContext(MainContext);
    const inc = (index) => {
        const newCart = [...cart];
        newCart[index].qty += 1;
        setCart(newCart);
    };
    const dec = (index) => {
        const newCart = [...cart];
        if (newCart[index].qty > 1) {
            newCart[index].qty -= 1;
            setCart(newCart);
        }
    };
    return (
        <div className="cart-table">
            <table className='cart-table'>
                <thead>
                    <tr className='table-header text-center'>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>SubTotal</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {cart.length === 0 && (
                        <tr className='table-body text-center'>
                            <td colSpan="5">Your cart is empty</td>
                        </tr>
                    )}{
                        cart.map((item, index) => {
                            const product = products.find(p => p._id === item.productId);
                            if (!product) return null;
                            const subTotal = product.price * item.qty;
                            return (
                                <tr key={index} className='table-body text-center'>
                                    <td className='text-start'>
                                        <img className='cart-table-product-image' src={product.product_images[0]} alt={product.name} />
                                        {product.name}
                                    </td>
                                    <td>{formatIndianCurrency(product.price)}</td>
                                    <td>
                                        {/* <div className="qty-picker">
                                            <button type="button" onClick={() => dec(index)} aria-label="Decrease quantity">-</button>
                                            <span>{item.qty}</span>
                                            <button type="button" onClick={() => inc(index)} aria-label="Increase quantity">+</button>
                                        </div> */}
                                        <QtyPicker qty={item.qty} inc={() => inc(index)} dec={() => dec(index)} />
                                    </td>
                                    <td>{formatIndianCurrency(subTotal)}</td>
                                    <td><button className='btn btn-danger btn-sm' onClick={() => {
                                        const newCart = cart.filter((_, i) => i !== index);
                                        setCart(newCart);
                                    }}>Remove</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
