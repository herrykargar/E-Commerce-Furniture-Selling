import { useState, useEffect, useMemo } from "react";
import { createContext } from "react";
import { fallbackProducts } from "./fallbackProducts";

export const MainContext = createContext();

export const MainProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(fallbackProducts);
    }, []);
    
    const [cart, setCart] = useState(() => {
        try {
            const storedCart = localStorage.getItem('cart');
            return storedCart ? JSON.parse(storedCart) : [];
        } catch (e) {
            console.warn("Failed to parse cart from localStorage:", e);
            return [];
        }
    });
    
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const value = useMemo(() => ({ isLogin, setIsLogin, products, setProducts, cart, setCart }), [isLogin, products, cart]);

    return (
        <MainContext.Provider value={value}>
            {children}
        </MainContext.Provider>
    );
}