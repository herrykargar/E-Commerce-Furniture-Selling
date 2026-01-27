import React from 'react'
import ProductGrid from '../components/ProductGrid.jsx'
import { fallbackOrders } from '../../context/fallbackProducts'
import OrderCard from '../components/OrderCard.jsx'
import '../../assets/css/MyOrders.css';

export default function MyOrder() {
  return (
    <div className='my-order-page pt-4'>
      <h1 className='text-center fw-bold'>My Orders</h1>
      <ProductGrid productsOverride={fallbackOrders} limit={fallbackOrders.length} element={OrderCard} />
    </div>
  )
}
