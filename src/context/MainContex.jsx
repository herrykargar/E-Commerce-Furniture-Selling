import { useState } from "react";
import { createContext } from "react";

export const MainContext = createContext();

export const MainProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    return (
        <MainContext.Provider value={{ isLogin, setIsLogin }}>
            {children}
        </MainContext.Provider>
    );
}