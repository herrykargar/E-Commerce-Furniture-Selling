import { useState, useEffect, useMemo } from "react";
import { createContext } from "react";
import { fallbackOrders, fallbackProducts, } from "./fallbackProducts";

export const MainContext = createContext();

export const MainProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [products, setProducts] = useState([]);
    const [wishlist, setWishlist] = useState(() => {
        try {
            const storedWishlist = localStorage.getItem('wishlist');
            return storedWishlist ? JSON.parse(storedWishlist) : [];
        } catch (e) {
            console.warn("Failed to parse wishlist from localStorage:", e);
            return [];
        }
    });
    
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    
    const [cart, setCart] = useState(() => {
        try {
            const storedCart = localStorage.getItem('cart');
            return storedCart ? JSON.parse(storedCart) : [];
        } catch (e) {
            console.warn("Failed to parse cart from localStorage:", e);
            return [];
        }
    });
    
    const [orders, setOrders] = useState(() => {
        try {
            const storedOrders = localStorage.getItem('orders');
            return storedOrders ? JSON.parse(storedOrders) : [];
        } catch (e) {
            console.warn("Failed to parse orders from localStorage:", e);
            return [];
        }
    });
    useEffect(() => {
        setProducts(fallbackProducts);
        setOrders(fallbackOrders);
    }, []);
    
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const value = useMemo(() => ({ isLogin, setIsLogin, products, setProducts, cart, setCart, wishlist, setWishlist, orders, setOrders }), [isLogin, products, cart, wishlist, orders]);

    return (
        <MainContext.Provider value={value}>
            {children}
        </MainContext.Provider>
    );
}