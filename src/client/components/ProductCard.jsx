import React, { useState, useContext } from 'react';
import { MainContext } from '../../context/MainContex.jsx';
import { Link } from 'react-router-dom';
import AddToCartButton from '../../ui/AddToCartButton';
import { formatIndianCurrency } from '../../utils/formatIndianCurrency.js';

function ProductCard({ product }) {
    const { isLogin, wishlist, setWishlist } = useContext(MainContext);
    const productId = product?._id ?? product?.id;
    const name = product?.product_name ?? product?.name;
    const description = product?.description ?? product?.subtitle;
    const price = product?.price ?? product?.currentPrice;
    const image = product?.product_images?.[0] ?? product?.image;
    const [color, setColor] = useState(product?.colors?.[0] || null);

    const [isInWishlist, setIsInWishlist] = useState(() => {
        return wishlist.some(item => item._id === productId);
    });
    const toggleWishlist = () => {
        // if (!isLogin) {
        //     alert("Please log in to manage your wishlist.");
        //     return;
        // }
        let updatedWishlist;
        if (isInWishlist) {
            updatedWishlist = wishlist.filter(item => item._id !== productId);
        } else {
            updatedWishlist = [...wishlist, product];
        }
        setWishlist(updatedWishlist);
        setIsInWishlist(!isInWishlist);
    }
    return (
        <div className="product-card">
            <div className="product-actions">
                <button type="button" aria-label="Like" onClick={toggleWishlist}>
                    <i className={`fa-regular fa-heart${isInWishlist ? " fa-solid" : ""}`} ></i>
                </button>
                <div className="swatches">
                    {product.colors.map((c) => (
                        <button
                            type="button"
                            key={c}
                            className={`swatch ${color === c ? 'active' : ''}`}
                            style={{ background: c }}
                            onClick={() => setColor(c)}
                            aria-pressed={color === c}
                            aria-label={`Choose color ${c}`}
                        />
                    ))}
                </div>
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
                    <span className="product-price">{formatIndianCurrency(price) || 'Rs. 00.00'}</span>
                </div>
            </div>

            <div className="product-hover">

                <AddToCartButton productId={productId} color={color} qty={1} className="add-to-cart" />
                {productId && (
                    <Link className="view-detail" to={`/product/${productId}`}>
                        View Detail
                    </Link>
                )}
            </div>
        </div>
    );
}

export default React.memo(ProductCard);
