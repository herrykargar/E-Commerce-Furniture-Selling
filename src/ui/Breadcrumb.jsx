import React from 'react'
import { Link } from 'react-router-dom';

export default function Breadcrumb({ name = 'name' }) {
    return (
        <section className="products-hero">
            <div>
                <h1>{name}</h1>
                <div className="breadcrumb">
                    <Link to="/">Home</Link>
                    <span>&gt;</span>
                    <span>{name}</span>
                </div>
            </div>
        </section>
    )
}

export function ProductBreadcrumb({ product }) {
    return (
        <div className="pd-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/products">Shop</Link>
            <span>/</span>
            <span>{product.product_name ?? product.name}</span>
        </div>
    )
}