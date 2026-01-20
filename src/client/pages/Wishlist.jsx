import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { MainContext } from '../../context/MainContex';
import ProductCard from '../components/ProductCard.jsx';
import '../../assets/css/wishlist.css';

export default function Wishlist() {
    const { wishlist } = useContext(MainContext);

    return (
        <div className="wishlist-page">
            <div className="wishlist-header text-center">
                <h2>{wishlist.length === 0 ? 'Your wishlist is empty' : 'Your Wishlist'}</h2>
                {wishlist.length === 0 && (
                    <p className="wishlist-subtitle">
                        Save products you love. <NavLink to="/products">Browse products</NavLink>
                    </p>
                )}
                {wishlist.length > 0 && (
                    <p className="wishlist-subtitle">
                        Tap the heart to remove items or open details to keep shopping.
                    </p>
                )}
            </div>

            {wishlist.length === 0 ? (
                <div className="empty-wishlist">
                    <p>Your wishlist is empty right now.</p>
                    <NavLink to="/products">Browse products</NavLink>
                </div>
            ) : (
                <div className="wishlist-container product-grid">
                    {wishlist.map((item, index) => (
                        <ProductCard key={item?._id ?? item?.id ?? index} product={item} />
                    ))}
                </div>
            )}
        </div>
    );
}
