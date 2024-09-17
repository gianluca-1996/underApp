import CircularProgress from '@mui/material/CircularProgress';
import { Container } from '@mui/material';

import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Logout = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const cerrarSesion = () => {
            setTimeout(() => {
                logout();
                localStorage.removeItem('token');
                navigate('/login');
            }, 1500);
        }

        cerrarSesion();
    }, []);

    return (
        <Container style={{display: 'flex', justifyContent: 'center', marginTop: '5%'}}>
            <CircularProgress color='error'/>
        </Container>
    )
}

export default Logout;