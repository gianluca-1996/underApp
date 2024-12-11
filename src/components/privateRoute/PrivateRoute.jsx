import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Container, Stack } from "@mui/material";

const PrivateRoute = ({ component: Component }) => {
    const navigate = useNavigate();
    const { authState, logout } = useContext(AuthContext);
     
    if(authState.isLoading) return;
    if(!authState.user){ 
        alert('Su sesion ha expirado');
        logout();
        navigate('/login') 
    }
    return (authState.user ? <Component /> : <h1>No esta autenticado</h1>);
}

export default PrivateRoute;