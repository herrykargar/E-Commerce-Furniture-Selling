import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../ui/Logo.jsx';
import './Footer.css';

const linkItems = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/products' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

const helpItems = [
  { label: 'Payment Options', path: '/payment-options' },
  { label: 'Returns', path: '/returns' },
  { label: 'Privacy Policies', path: '/privacy' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <Logo>Wooden World</Logo>
          </div>
          <div className="footer-address">
            <p>400 University Drive Suite 200 Coral Gables,</p>
            <p>FL 33134 USA</p>
          </div>
        </div>

        <div className="footer-column">
          <h4>Links</h4>
          <ul>
            {linkItems.map((item) => (
              <li key={item.label}>
                <NavLink to={item.path}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-column">
          <h4>Help</h4>
          <ul>
            {helpItems.map((item) => (
              <li key={item.label}>
                <NavLink to={item.path}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-column newsletter">
          <h4>Newsletter</h4>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email Address"
              aria-label="Enter your email"
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <hr className="footer-divider" />

      <div className="footer-bottom">2006 Wooden World. All rights reserved</div>
    </footer>
  );
}
