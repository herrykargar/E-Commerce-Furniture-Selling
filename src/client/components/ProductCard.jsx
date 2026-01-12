import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
    const { name, description, price, oldPrice, image } = product || {};

    return (
        <div className="product-card">
            <div className="product-actions">
                <button type="button" aria-label="Like">
                    <i className="fa-regular fa-heart"></i>
                </button>
            </div>

            <div className="product-image">
                {image ? (
                    <img src={image} alt={name || 'Product'} loading="lazy" />
                ) : (
                    <div className="product-image--placeholder">Image</div>
                )}
            </div>

            <div className="product-info">
                <span className="product-name">{name || 'Product name'}</span>
                <span className="product-subtitle">{description || 'Stylish item'}</span>
                <div className="product-price-row">
                    <span className="product-price">{price || 'Rs.00.00'}</span>
                    {/* {oldPrice && <span className="product-old-price">{oldPrice}</span>} */}
                </div>
            </div>

            <div className="product-hover">
                <button type="button" className="add-to-cart">Add to cart</button>
                {product?.id && (
                    <Link className="view-detail" to={`/product/${product.id}`}>
                        View Detail
                    </Link>
                )}
            </div>
        </div>
    );
}

export default React.memo(ProductCard);
