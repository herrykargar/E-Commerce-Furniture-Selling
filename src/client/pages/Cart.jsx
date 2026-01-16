import React, { useContext } from 'react'
import { MainContext } from '../../context/MainContex.jsx';
import Breadcrumb from '../../ui/Breadcrumb.jsx';
import CartCard from '../components/CartCard.jsx';
import CartTable from '../components/CartTable.jsx';
import FeaturesStrip from '../../shared/components/FeaturesStrip.jsx';
import '../../assets/css/Cart.css';

export default function MyCart() {
    const { cart, setCart, products } = useContext(MainContext);
    return (
        <div className='cart-page'>
            <Breadcrumb name="Cart" />
            <div className='card-and-tble-container'>
                <CartTable />
                <CartCard />
            </div>
            <FeaturesStrip />
            {/* <h1>My Cart</h1>
            <pre>{JSON.stringify(cart, null, 2)}</pre>
            <h2>All Products</h2>
            <pre>{JSON.stringify(products, null, 2)}</pre> */}
        </div>
    )
}
