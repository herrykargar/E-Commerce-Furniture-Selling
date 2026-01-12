import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fallbackProducts } from '../../context/fallbackProducts';
import '../../assets/css/ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const product = useMemo(
    () => fallbackProducts.find((p) => p.id === id) || fallbackProducts[0],
    [id]
  );

  const galleryImages = useMemo(() => {
    if (!product) return [];
    // Use product image plus a few ambient room shots for the slider
    return [
      product.image,
      '/images/setup-room2.png',
      '/images/setup-room3.png',
      '/images/setup-room4.png',
      product.image,
    ];
  }, [product]);

  const related = useMemo(() => fallbackProducts.filter((p) => p.id !== product.id).slice(0, 4), [product.id]);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);

  const inc = () => setQty((v) => v + 1);
  const dec = () => setQty((v) => (v > 1 ? v - 1 : 1));

  if (!product) return null;

  return (
    <div className="product-detail-page">
      <div className="pd-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/products">Shop</Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>

      <div className="pd-main">
        <div className="pd-gallery">
          <div className="pd-thumbs">
            {galleryImages.map((src, idx) => (
              <button
                key={idx}
                className={`pd-thumb ${idx === activeImg ? 'active' : ''}`}
                onClick={() => setActiveImg(idx)}
                aria-label={`View image ${idx + 1}`}
              >
                <img src={src} alt={`${product.name} view ${idx + 1}`} loading="lazy" />
              </button>
            ))}
          </div>
          <div className="pd-hero">
            <img src={galleryImages[activeImg]} alt={product.name} />
          </div>
        </div>

        <div className="pd-info">
          <h1>{product.name}</h1>
          <div className="pd-price">{product.price}</div>
          <div className="pd-rating">
            <span className="stars">★★★★★</span>
            <span className="reviews">5 Customer Review</span>
          </div>
          <p className="pd-desc">
            Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact,
            stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs
            for a sound.
          </p>

          <div className="pd-options">
            <div className="pd-option">
              <div className="label">Size</div>
              <div className="pills">
                {['L', 'XL', 'XS'].map((s) => (
                  <button key={s} type="button">{s}</button>
                ))}
              </div>
            </div>
            <div className="pd-option">
              <div className="label">Color</div>
              <div className="swatches">
                {['#000000', '#B88E2F', '#C4C4C4'].map((c, idx) => (
                  <span key={c} className={`swatch ${idx === 0 ? 'active' : ''}`} style={{ background: c }} />
                ))}
              </div>
            </div>
          </div>

          <div className="pd-actions">
            <div className="qty-picker">
              <button type="button" onClick={dec} aria-label="Decrease quantity">-</button>
              <span>{qty}</span>
              <button type="button" onClick={inc} aria-label="Increase quantity">+</button>
            </div>
            <button type="button" className="pd-primary">Add To Cart</button>
            <button type="button" className="pd-secondary">Buy Now</button>
          </div>
        </div>
      </div>

      <div className="pd-related">
        <h2>Related Products</h2>
        <div className="product-grid">
          {related.map((p) => (
            <div key={p.id}>
              <Link to={`/product/${p.id}`} className="pd-related-link">
                <img src={p.image} alt={p.name} loading="lazy" />
                <div className="pd-related-info">
                  <span className="name">{p.name}</span>
                  <span className="desc">{p.description}</span>
                  <span className="price">{p.price}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="show-more">
          <button type="button">Show More</button>
        </div>
      </div>
    </div>
  );
}
