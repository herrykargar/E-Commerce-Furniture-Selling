import { useState, useEffect, useMemo } from "react";
import { createContext } from "react";
import { fallbackProducts } from "./fallbackProducts";

export const MainContext = createContext();

export const MainProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(fallbackProducts);
    }, []);

    const value = useMemo(() => ({ isLogin, setIsLogin, products, setProducts }), [isLogin, products]);

    return (
        <MainContext.Provider value={value}>
            {children}
        </MainContext.Provider>
    );
}