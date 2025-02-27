import React, { createContext, useEffect, useState } from "react";
import useAxiosInterceptor from "../config/axios.config";
import { useNotification } from "./NotificationContext";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import PostContainer from "../pages/feed/PostContainer";
import Perfil from "../pages/miPerfil/Perfil";
import PerfilUsuario from "../pages/perfilUsuario/PerfilUsuario";

// Crea el contexto
export const RouteContext = createContext();
const axios = useAxiosInterceptor();

export const RoutesProvider = ({ children }) => {
    
    let rutasPermitidas = [];
    const { showNotification } = useNotification();
    const [rutas, setRutas] = useState([]);
    const {authState} = useContext(AuthContext);
    const allRoutes = [
        {nombre: 'comunidad', path: '/comunidad', element: <PostContainer />},
        {nombre: 'test', path: '/test', element: <h1>Test</h1>},
        {nombre: 'pruebaAuth', path: '/pruebaAuth', element: <h1>PruebaAuth</h1>},
        {nombre: 'home', path: '/', element: <h1>Home</h1>},
        {nombre: 'perfil', path: '/perfil', element: <Perfil />}
    ]

    useEffect( () => {
        const getRoutes = async () => {
            if(authState.user){
                try {
                    const response = await axios.get('/pantalla/permitidas');
                    rutasPermitidas = allRoutes.filter(route => response.data.some(some => some.nombre === route.nombre) );
                    setRutas(rutasPermitidas);
                } catch (error) {
                    showNotification(error.message, 'error');
                }
            }
            else setRutas([]);
        };

        getRoutes();
    }, [authState.user])

    return (
    <RouteContext.Provider value={{ rutas }}>
        {children}
    </RouteContext.Provider>
    );
}