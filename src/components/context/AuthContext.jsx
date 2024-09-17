import React, { createContext, useState } from "react";

// Crea el contexto
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        user: null,
        isAuthenticated: false
    });

    const login = (user) => {
        // Simula login
        setAuthState({
            user,
            isAuthenticated: true
        });
    };
    
    const logout = () => {
        setAuthState({
            user: null,
            isAuthenticated: false
        });
    };

    return (
    <AuthContext.Provider value={{ authState, login, logout }}>
        {children}
    </AuthContext.Provider>
    );
}