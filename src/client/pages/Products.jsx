import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid.jsx';
import { MainContext } from '../../context/MainContex.jsx';
import '../../assets/css/Products.css';
import '../../assets/css/ProductDetail.css';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

const normalize = (value) => value?.toLowerCase?.() ?? '';

const filterByRoom = (room, items) => {
  if (!room || normalize(room) === 'all') return items;
  const target = normalize(room);
  return items.filter((item) => normalize(item.room) === target);
};

export default function Products() {
  const { products: fallbackProducts } = useContext(MainContext);
  const [searchParams] = useSearchParams();
  const room = searchParams.get('room');

  const [products, setProducts] = useState(fallbackProducts);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!room) {
      setProducts(fallbackProducts);
      setStatus('idle');
      setError(null);
      return undefined;
    }

    const controller = new AbortController();
    setStatus('loading');
    setError(null);

    fetch(`${API_BASE}/products?room=${encodeURIComponent(room)}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError(err.message);
        setProducts(filterByRoom(room, fallbackProducts));
      })
      .finally(() => setStatus('loaded'));

    return () => controller.abort();
  }, [room, fallbackProducts]);

  const displayProducts = useMemo(() => {
    if (products?.length) return products;
    return filterByRoom(room, fallbackProducts);
  }, [products, fallbackProducts, room]);

  const normalizedProducts = useMemo(() => {
    if (!displayProducts?.length) return [];
    const arr = [...displayProducts];
    while (arr.length < 16) {
      arr.push(...displayProducts);
    }
    return arr.slice(0, 16);
  }, [displayProducts]);

  return (
    <div className="products-page">
      <section className="products-hero">
        <div>
          <h1>Shop</h1>
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>&gt;</span>
            <span>Shop</span>
          </div>
        </div>
      </section>

      <div className="products-content">
        <div className="products-filterbar">
          <div className="filter-actions">
            <i className="fa-solid fa-sliders"></i>
            <i className="fa-solid fa-table-cells"></i>
            <i className="fa-solid fa-list"></i>
            <span>Filter</span>
          </div>
          <div className="results-text">Showing 1–16 of 32 results</div>
          <label>
            Show
            <input type="number" min="16" defaultValue="16" aria-label="items per page" />
          </label>
          <label>
            Sort by
            <select defaultValue="default" aria-label="sort products">
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </label>
        </div>

        <div className="products-grid-wrap">
          <ProductGrid productsOverride={normalizedProducts} limit={normalizedProducts.length} />
        </div>

        <div className="pagination">
          <button className="active" type="button">1</button>
          <button type="button">2</button>
          <button type="button">3</button>
          <button type="button">Next</button>
        </div>

        <div className="features-strip">
          <div className="feature-item">
            <i className="fa-solid fa-award"></i>
            <div>
              <h4>High Quality</h4>
              <p>crafted from top materials</p>
            </div>
          </div>
          <div className="feature-item">
            <i className="fa-solid fa-shield-halved"></i>
            <div>
              <h4>Warranty Protection</h4>
              <p>Over 2 years</p>
            </div>
          </div>
          <div className="feature-item">
            <i className="fa-solid fa-truck-fast"></i>
            <div>
              <h4>Free Shipping</h4>
              <p>Order over  Rs 12,000</p>
            </div>
          </div>
          <div className="feature-item">
            <i className="fa-solid fa-headset"></i>
            <div>
              <h4>24 / 7 Support</h4>
              <p>Dedicated support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
