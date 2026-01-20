import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AddToCartButton from '../../ui/AddToCartButton.jsx';
import { fallbackProducts } from '../../context/fallbackProducts';
import { formatIndianCurrency } from '../../utils/formatIndianCurrency.js';
import {ProductBreadcrumb} from '../../ui/Breadcrumb.jsx';
import QtyPicker from '../../shared/components/QtyPicker.jsx';
import '../../assets/css/ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();

  const product = useMemo(() => {
    const found = fallbackProducts.find((p) => {
      const pid = p?._id ?? p?.id;
      return pid?.toString?.() === id?.toString?.();
    });
    return found || fallbackProducts[0];
  }, [id]);

  const productId = product?._id ?? product?.id;

  const galleryImages = useMemo(() => {
    if (!product) return [];
    const primary = product?.product_images?.[0] ?? product?.image;
    const additional = product?.product_images?.slice?.(1) ?? [];
    const ambient = ['/images/setup-room2.png', '/images/setup-room3.png', '/images/setup-room4.png'];
    return [primary, ...additional, ...ambient].filter(Boolean);
  }, [product]);

  const related = useMemo(
    () => fallbackProducts.filter((p) => {
      if (!product) return false;
      const sameCategory = p.category === product.category;
      const sameSubcategory = p.subcategory === product.subcategory;
      // const notSameProduct = (p?._id ?? p?.id) !== (product?._id ?? product?.id);
      return (sameCategory || sameSubcategory);
      // return notSameProduct && (sameCategory || sameSubcategory);
    }), [product],
  );

  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState(null);

  if (!product) return null;

  return (
    <div className="product-detail-page">
      <ProductBreadcrumb product={product} />

      <div className="pd-main">
        <div className="pd-gallery">
          <div className="pd-thumbs">
            {galleryImages.map((src, idx) => (
              <button
                key={src ?? idx}
                className={`pd-thumb ${idx === activeImg ? 'active' : ''}`}
                onClick={() => setActiveImg(idx)}
                aria-label={`View image ${idx + 1}`}
              >
                <img src={src} alt={`${product.product_name ?? product.name} view ${idx + 1}`} loading="lazy" />
              </button>
            ))}
          </div>
          <div className="pd-hero">
            <img src={galleryImages[activeImg]} alt={product.product_name ?? product.name} />
          </div>
        </div>

        <div className="pd-info">
          <h1>{product.product_name ?? product.name}</h1>
          <div className="pd-price">{formatIndianCurrency(product.price)}</div>
          <p className="pd-desc">
            {product.description || 'Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.'}
          </p>

          <div className="pd-options">
            {/* <div className="pd-option">
              <div className="label">Size</div>
              <div className="pills">
                {['L', 'XL', 'XS'].map((s) => (
                  <button key={s} type="button">{s}</button>
                ))}
              </div>
            </div> */}
            <div className="pd-option">
              <div className="label">Color</div>
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
          </div>

          <div className="pd-actions">
            <QtyPicker qty={qty} inc={() => setQty((v) => v + 1)} dec={() => setQty((v) => (v > 1 ? v - 1 : 1))} />
            <AddToCartButton productId={productId} color={color} qty={qty} />
            <button type="button" className="pd-secondary">Buy Now</button>
          </div>
        </div>
      </div>

      <div className="pd-related">
        <h2>Related Products</h2>
        <div className="product-grid">
          {
            related.map((p, idx) => {
              const relId = p?._id ?? p?.id ?? idx;
              return (
                <div key={relId}>
                  <Link to={`/product/${relId}`} className="pd-related-link">
                    <img src={p.product_images?.[0] ?? p.image} alt={p.product_name ?? p.name} loading="lazy" />
                    <div className="pd-related-info">
                      <span className="name">{p.product_name ?? p.name}</span>
                      <span className="desc">{p.description}</span>
                      <span className="price">{formatIndianCurrency(p.price)}</span>
                    </div>
                  </Link>
                </div>
              );
            })}
          {
            related.length <= 2 &&
            related.map((p, idx) => {
              const relId = p?._id ?? p?.id ?? idx;
              return (
                <div key={relId}>
                  <Link to={`/product/${relId}`} className="pd-related-link">
                    <img src={p.product_images?.[0] ?? p.image} alt={p.product_name ?? p.name} loading="lazy" />
                    <div className="pd-related-info">
                      <span className="name">{p.product_name ?? p.name}</span>
                      <span className="desc">{p.description}</span>
                      <span className="price">{formatIndianCurrency(p.price)}</span>
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>
        <div className="show-more">
          <button type="button">Show More</button>
        </div>
      </div>
    </div>
  );
}
