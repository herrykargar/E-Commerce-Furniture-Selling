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
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [products, setProducts] = useState(fallbackProducts);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [sortKey, setSortKey] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const showOptions = [12, 16, 20, 24, 28, 32];

  useEffect(() => {
    setSearchTerm(searchParams.get('search') || '');
  }, [searchTerm, searchParams]);

  useEffect(() => {
    setSearchTerm(searchParams.get('search') || '');
    const filtered = fallbackProducts.filter((product) => {
      const name = normalize(product?.product_name);
      const description = normalize(product?.description);
      const category = normalize(product?.category);
      const subCategory = normalize(product?.subcategory);
      const regx = new RegExp(searchTerm, 'i');
      if (!searchTerm) return true;
      console.log("test regx", regx.test(name), regx.test(description), regx.test(category), regx.test(subCategory));
      return regx.test(name) || regx.test(description) || regx.test(category) || regx.test(subCategory);
    });
    if (filtered.length === 0) {
      if (searchTerm) {
        alert('No products found matching your search criteria.');
      }
      setProducts(fallbackProducts);
      return;
    }
    setProducts(filtered);
  }, [searchTerm, searchParams, fallbackProducts]);

  useEffect(() => {

    if (!room || normalize(room) === 'all') {
      setProducts(fallbackProducts);
      return;
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

  const handleFilterApply = (e) => {
    e.preventDefault();
    const filterSection = e.target.closest('.filter-section');
    const selectedMaterials = Array.from(filterSection.querySelectorAll('input[name="material"]:checked')).map(input => input.value);
    const selectedRoomTypes = Array.from(filterSection.querySelectorAll('input[name="room-type"]:checked')).map(input => input.value);
    const selectedCategory = Array.from(filterSection.querySelectorAll('input[name="category"]:checked')).map(input => input.value);
    let filtered = fallbackProducts;
    let pattern = [];

    if (selectedRoomTypes.length > 0) {
      pattern = [...pattern, ...selectedRoomTypes];
    } if (selectedMaterials.length > 0) {
      pattern = [...pattern, ...selectedMaterials];
    } if (selectedCategory.length > 0) {
      pattern = [...pattern, ...selectedCategory];
    }
    pattern = pattern.join("|");
    const regex = new RegExp(pattern, 'i');

    if (selectedMaterials.length > 0 || selectedRoomTypes.length > 0 || selectedCategory.length > 0) {
      filtered = filtered.filter(product => {
        return regex.test(product.material) || regex.test(product.room_type) || regex.test(product.category);
      })
      pattern = [];
    } else {
      pattern = [];
      return setProducts(fallbackProducts);
    }
    pattern = [];
    setProducts(filtered);
  }

  const room_type = ['Living', 'Bed', 'Dining', 'Office', 'Kids'];
  const material = ['Wood', 'Metal', 'Fabric', 'MDF'];
  const category = ['Sofa', 'Table', 'Chair', 'Storage', 'Bed', 'TV Unit'];
  return (
    <div className="products-page">
      <Breadcrumb name="Shop" />
      <div className="products-content">
        <div className="products-filterbar">
          <div className="filter-actions position-relative ps-1 ps-md-3 ps-lg-4">
            <i className="fa-solid fa-list" ></i>
            <span>Filter</span>
            <div className="filter-section">
              <div className="d-flex justify-content-center">
                <div className='form-group'>
                  <span>Material</span>
                  {
                    material.map((mat) => (
                      <div key={mat} className='d-flex justify-content-start align-items-center gap-2'>
                        <input type="checkbox" name="material" id={'mat' + mat.toLowerCase()} value={mat.toLowerCase()} />
                        <label htmlFor={'mat' + mat.toLowerCase()}> {mat} </label>
                      </div>
                    ))
                  }
                </div>
                <div className='form-group'>
                  <span>Room&nbsp;Type</span>
                  {
                    room_type.map((room) => (
                      <div key={room} className='d-flex justify-content-start align-items-center gap-2'>
                        <input type="checkbox" name="room-type" id={'room' + room.toLowerCase().replace(/\s+/g, '-')} value={room.toLowerCase().replace(/\s+/g, '-')} />
                        <label htmlFor={'room' + room.toLowerCase().replace(/\s+/g, '-')}> {room} </label>
                      </div>
                    ))
                  }
                </div>
                <div className='form-group d-flex flex-column align-items-start me-3' id='filter-category'>
                  <span>Category</span>
                  {
                    category.map((cat) => (
                      <div
                        key={cat}
                        className="custom-category-item"
                      >
                        <input
                          type="checkbox"
                          className='w-full'
                          name="category"
                          id={'cat' + cat.toLowerCase().replace(/\s+/g, '-')}
                          value={cat.toLowerCase().replace(/\s+/g, '-')}
                        />
                        <label className='mb-0' htmlFor={'cat' + cat.toLowerCase().replace(/\s+/g, '-')}>
                          {cat.replace(/\s+/g, '\u00A0')}
                        </label>
                      </div>

                    ))
                  }
                </div>
              </div>

              <div className='d-flex justify-content-end align-items-center gap-2'>
                <div className='action-button d-flex gap-2'>
                  <button type="button" className='apply-btn' onClick={(e) => handleFilterApply(e)}>Apply</button>
                  <button type="button" className='clear-btn' onClick={(e) => {
                    e.target.closest('.filter-section').querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                      checkbox.checked = false;
                    });
                    handleFilterApply(e);
                  }}>Clear</button>
                </div>
              </div>
            </div>
            <div className="results-text d-block d-md-none">Showing {startItem}–{endItem} of {sortedProducts.length} results</div>
          </div>
          <div className="results-text d-none d-md-block">Showing {startItem}–{endItem} of {sortedProducts.length} results</div>

          <div className='d-flex justify-content-center align-items-center gap-3 gap-sm-5'>
            <label>
              Show
              <select name="show grid" id="show-grid" value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
                {showOptions.map((val) => (
                  <option key={val} value={val}>{val}</option>
                ))}
              </select>
            </label>
            <label>
              Sort&nbsp;by
              <select className='w-75 w-sm-100' defaultValue="default" aria-label="sort products" id='shorting' onChange={handelShorting}>
                <option value="default" >Default</option>
                <option value="price-asc" >Price: Low to High</option>
                <option value="price-desc" >Price: High to Low</option>
              </select>
            </label>
          </div>
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
