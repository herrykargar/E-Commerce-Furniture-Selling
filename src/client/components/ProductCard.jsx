import React from 'react';
import { Link } from 'react-router-dom';
import AddToCartButton from '../../ui/AddToCartButton';
import { formatIndianCurrency } from '../../utils/formatIndianCurrency.js';

function ProductCard({ product }) {
    const productId = product?._id ?? product?.id;
    const name = product?.product_name ?? product?.name;
    const description = product?.description ?? product?.subtitle;
    const price = product?.price ?? product?.currentPrice;
    const image = product?.product_images?.[0] ?? product?.image;
    const [color, setColor] = React.useState(product?.colors?.[0] || null);
    return (
        <div className="product-card">
            <div className="product-actions">
                <button type="button" aria-label="Like">
                    <i className="fa-regular fa-heart"></i>
                </button>
                {/* <button type="button" aria-label="Quick view">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button> */}
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
