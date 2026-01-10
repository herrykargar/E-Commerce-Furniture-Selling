import React from 'react'
import './ui.css';
export default function SearchInput() {
    const [search, setSearch] = React.useState('');
    const handelSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    }
    const searchProduct = (e) => {
        e.preventDefault();
        // Implement search functionality here
    }
    return (
        <div className="search-hover d-flex align-items-center">
            <i className="fa-solid fa-magnifying-glass" aria-hidden="true" role='button' onClick={(e) => searchProduct(e)}/>
            <input
                type="search"
                className="search-input"
                placeholder="Search products..."
                aria-label="Search"
                // value={search}
                onBlur={(e) => handelSearch(e)}
            />
        </div>
    )
}
