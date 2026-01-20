import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid.jsx';
import Breadcrumb from '../../ui/Breadcrumb.jsx';
import { MainContext } from '../../context/MainContex.jsx';
import FeaturesStrip from '../../shared/components/FeaturesStrip.jsx';
import Pagination from '../../shared/components/Pagination.jsx';
import '../../assets/css/Products.css';
import '../../assets/css/ProductDetail.css';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

const normalize = (value) => value?.toLowerCase?.() ?? '';

const matchesRoom = (roomValue, target) => {
  const normalized = normalize(roomValue);
  if (!normalized || !target) return false;
  if (normalized === target) return true;
  if (normalized.replace(/\s+/g, '') === target.replace(/\s+/g, '')) return true;
  return normalized.includes(target) || target.includes(normalized);
};

const filterByRoom = (room, items) => {
  if (!room || normalize(room) === 'all') return items;
  const target = normalize(room);
  return items.filter((item) => matchesRoom(item?.room_type ?? item?.room, target));
};

export default function Products() {
  const { products: fallbackProducts } = useContext(MainContext);
  const [searchParams] = useSearchParams();
  const room = searchParams.get('room');
  const [products, setProducts] = useState(fallbackProducts);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [sortKey, setSortKey] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const showOptions = [12, 16, 20, 24, 28, 32];

  useEffect(() => {
    if (!room) {
      setProducts(fallbackProducts);
      return undefined;
    }

    const controller = new AbortController();

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
        setProducts(filterByRoom(room, fallbackProducts));
      });

    return () => controller.abort();
  }, [room, fallbackProducts]);

  const displayProducts = useMemo(() => {
    if (products?.length) return products;
    return filterByRoom(room, fallbackProducts);
  }, [products, fallbackProducts, room]);

  const sortedProducts = useMemo(() => {
    const base = Array.isArray(displayProducts) ? [...displayProducts] : [];
    if (sortKey === 'price-asc') {
      return base.sort((a, b) => Number(a?.price ?? 0) - Number(b?.price ?? 0));
    }
    if (sortKey === 'price-desc') {
      return base.sort((a, b) => Number(b?.price ?? 0) - Number(a?.price ?? 0));
    }
    return base;
  }, [displayProducts, sortKey]);

  const totalPages = useMemo(() => {
    const safeLength = sortedProducts.length || 1;
    return Math.max(1, Math.ceil(safeLength / itemsPerPage));
  }, [itemsPerPage, sortedProducts.length]);

  useEffect(() => {
    setCurrentPage((prev) => (prev > totalPages ? totalPages : prev));
  }, [totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage, sortKey]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

  const handelShorting = (e) => {
    const value = e?.target?.value ?? 'default';
    setSortKey(value);
  };

  const startItem = sortedProducts.length ? startIndex + 1 : 0;
  const endItem = Math.min(endIndex, sortedProducts.length);

  return (
    <div className="products-page">
      <Breadcrumb name="Shop" />
      <div className="products-content">
        <div className="products-filterbar">
          <div className="filter-actions ps-1 ps-md-3 ps-lg-4">
            <i className="fa-solid fa-list"></i>
            <span>Filter</span>
            
          </div>
          <div className="results-text">Showing {startItem}–{endItem} of {sortedProducts.length} results</div>
          <label>
            Show
            <select name="show grid" id="show-grid" value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
              {showOptions.map((val) => (
                <option key={val} value={val}>{val}</option>
              ))}
            </select>
          </label>
          <label>
            Sort by
            <select defaultValue="default" aria-label="sort products" id='shorting' onChange={handelShorting}>
              <option value="default" >Default</option>
              <option value="price-asc" >Price: Low to High</option>
              <option value="price-desc" >Price: High to Low</option>
            </select>
          </label>
        </div>

        <div className="products-grid-wrap">
          <ProductGrid productsOverride={paginatedProducts} limit={paginatedProducts.length} />
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        <FeaturesStrip />
      </div>
    </div>
  );
}
