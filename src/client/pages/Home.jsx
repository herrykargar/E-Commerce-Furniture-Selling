import React, { useMemo, useState } from 'react';
import '../../assets/css/Home.css';
import BrowseByRoom from '../components/BrowseByRoom.jsx';
import ProductGrid from '../components/ProductGrid.jsx';
import { fallbackProducts } from '../../context/fallbackProducts.js';

const roomImages = [
    { id: 'dining', name: 'Dining', image: '/images/dining-room.png' },
    { id: 'living', name: 'Living', image: '/images/living-room.png' },
    { id: 'bedroom', name: 'Bedroom', image: '/images/bedroom.png' },
];

const hashtagImages = [
    '/images/setup-room1.png', '/images/setup-room2.png', '/images/setup-room3.png', '/images/setup-room4.png',
    '/images/setup-room5.png', '/images/setup-room6.png', '/images/setup-room7.png', '/images/setup-room8.png', '/images/setup-room9.png',
];

const inspirationImages = [
    '/images/room1.png',
    '/images/room2.png',
    '/images/room3.png',
];

export default function Home() {
    const products = useMemo(() => fallbackProducts, []);
    const [inspIndex, setInspIndex] = useState(0);

    const nextSlide = () => setInspIndex((prev) => (prev + 1) % inspirationImages.length);
    const prevSlide = () => setInspIndex((prev) => (prev - 1 + inspirationImages.length) % inspirationImages.length);

    return (
        <div className="home-page">
            <section className="hero-section">
                <div className="hero-visual" />
                <div className="hero-card">
                    <div className="hero-eyebrow">New Arrival</div>
                    <h1 className="hero-title">Discover Our New Collection</h1>
                    <p className="hero-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.</p>
                    <button className="btn-primary" type="button">Buy Now</button>
                </div>
            </section>

            <section className="browse-section">
                <div className="section-heading">
                    <h2>Browse The Range</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                <BrowseByRoom rooms={roomImages} />
            </section>

            <section className="products-section">
                <div className="section-heading">
                    <h2>Our Products</h2>
                </div>
                <ProductGrid productsOverride={products} limit={8} />
                <div className="show-more">
                    <button type="button">Show More</button>
                </div>
            </section>

            <section className="inspiration-section">
                <div className="insp-copy">
                    <h3>50+ Beautiful rooms inspiration</h3>
                    <p>Our designer already made a lot of beautiful prototype of rooms that inspire you</p>
                    <div className="insp-cta">
                        <button className="btn-primary" type="button">Explore More</button>
                    </div>
                </div>
                <div className="insp-gallery">
                    <div className="insp-track" style={{ transform: `translateX(-${inspIndex * 100}%)` }}>
                        {inspirationImages.map((src, idx) => (
                            <div className="insp-slide" key={src}>
                                <img src={src} alt={`Room inspiration ${idx + 1}`} loading="lazy" />
                            </div>
                        ))}
                    </div>
                    <button className="insp-nav insp-prev" type="button" onClick={prevSlide} aria-label="Previous inspiration slide">
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    <button className="insp-nav insp-next" type="button" onClick={nextSlide} aria-label="Next inspiration slide">
                        <i className="fa-solid fa-chevron-right"></i>
                    </button>
                    <div className="insp-dots" role="tablist" aria-label="Inspiration slides">
                        {inspirationImages.map((_, idx) => (
                            <button
                                key={idx}
                                type="button"
                                className={`insp-dot ${idx === inspIndex ? 'active' : ''}`}
                                onClick={() => setInspIndex(idx)}
                                aria-label={`Go to slide ${idx + 1}`}
                                aria-pressed={idx === inspIndex}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section className="hashtag-section">
                <div className="hashtag-heading">
                    <h3>Share your setup with</h3>
                    <h2>#WoodenWorld</h2>
                </div>
                <div className="hashtag-grid">
                    {hashtagImages.map((src, idx) => (
                        <img key={idx} src={src} alt={`Setup ${idx + 1}`} loading="lazy" />
                    ))}
                </div>
            </section>
        </div>
    );
}