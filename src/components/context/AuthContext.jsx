import React, { createContext, useEffect, useState } from "react";
import useAxiosInterceptor from "../../config/axios.config";

// Crea el contexto
export const AuthContext = createContext();
const axios = useAxiosInterceptor();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        user: null,
        isAuthenticated: false,
        isLoading: true
    });

    const login = (user) => {
        setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false
        });
    };
    
    const logout = () => {
        setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false
        });
    };

    useEffect( () => {
        const getInfoUsuario = async () => { 
            try {
                const response = await axios.get('/user/getUserByToken');
                login(response.data.payload);
            } catch (error) {
                setAuthState(prev => ({
                    ...prev,
                    isLoading: false
                }));
                return;
            }
        };
        
        getInfoUsuario();
    }, [])

    return (
    <AuthContext.Provider value={{ authState, login, logout }}>
        {children}
    </AuthContext.Provider>
    );
}