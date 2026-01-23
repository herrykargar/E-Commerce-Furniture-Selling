import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import './ui.css';
export default function SearchInput() {
    const [search, setSearch] = React.useState('');
    const navigate = useNavigate();
    const [isProfileOpen, setIsProfileOpen] = React.useState(false);
    const location = useLocation();
    React.useEffect(() => {
        if (location.pathname === '/profile') {
            setIsProfileOpen(true);
        } else {
            setIsProfileOpen(false);
        }
    }, [location.pathname]);
    return (
        <div className={`search-hover d-flex align-items-center ${isProfileOpen ? 'd-none' : ''}`}>
            <i className="fa-solid fa-magnifying-glass" htmlFor="search-input" aria-hidden="true" role='button' onClick={(e) => {
                if (search.trim() !== '') {
                    navigate(`/products?search=${encodeURIComponent(search.trim())}`);
                }
            }} />
            <input
                type="search"
                className="search-input"
                placeholder="Search products..."
                aria-label="Search"
                id="search-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        // if (search.trim()) {
                        navigate(`/products?search=${encodeURIComponent(search.trim())}`);
                        // }
                    }
                }}
            />
        </div>
    )
}
