import React, { useState, useContext } from 'react'
import CheckOutButton from '../../ui/CheckOutButton'
import { MainContext } from '../../context/MainContex'
import { formatIndianCurrency } from '../../utils/formatIndianCurrency'

export default function CartCard() {
    const { cart, setCart, products } = useContext(MainContext);
    const [TotalAmount, setTotalAmount] = useState(0);
    const countTotalAmount = () => {
        let total = 0;
        cart.forEach(item => {
            products.forEach(product => {
                if (item.productId === (product._id)) {
                    total += product.price * item.qty;
                    return;
                }

            });
        }
        );
        setTotalAmount(total);
    }
    React.useEffect(() => {
        countTotalAmount();
    }, [cart, products]);
    return (
        <div className="cart-card">
            <div className='text-center mt-3'>
                <h3>Cart Summary</h3>
            </div>
            <div className='text-center mt-4'>
                <h5>Total: {formatIndianCurrency(TotalAmount)}</h5>
            </div>
            <div className='text-center mt-4'>
                <h5>Total Product: {cart.length}</h5>
            </div>
            <div className='text-center mt-3'>
                <CheckOutButton>Check Out</CheckOutButton>
            </div>
        </div>
    )
}
