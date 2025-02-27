import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar, Card, CardContent } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Secciones from './components/secciones/Secciones';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import useAxiosInterceptor from '../../config/axios.config';
import { useNotification } from '../../context/NotificationContext';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams, useNavigate } from 'react-router-dom';

const PerfilUsuario = () => {
  const { authState } = useContext(AuthContext);
  const [user, setUser] = useState();
  const axios = useAxiosInterceptor();
  const { idUser } = useParams();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`/user/getUserById/${idUser}`);
        setUser(response.data);
      } catch (error) {
        showNotification(error.message, 'error');
      }
    }

    if(authState.user?._id === idUser)  navigate('/perfil');
    else getUser();
  }, [])

  
  if(!user){
    return (<Box style={{justifyItems: 'center', marginTop: '15%'}}>
        <Box>
            <CircularProgress />
        </Box>
    </Box>)
  }

  
  return (
    <Box>
      {/* Foto de Portada y Perfil */}
      <Box
        sx={{
          position: 'relative',
          height: '67vh',
          backgroundImage: 'url(/src/assets/img/snoop.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <Avatar
          src={`/src/assets/img/${user?.foto_perfil}`}
          alt="Profile"
          sx={{
            width: '150px',
            height: '150px',
            position: 'absolute',
            bottom: '-60px',
            left: '5%',
            border: '1px solid black',
          }}
        />
      </Box>

      {/* Información Básica */}
      <Grid container spacing={2} sx={{ mt: 8}}>
        <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{backgroundColor: '#424242'}}>
                <CardContent>
                    <Typography variant="h4">{user?.usuario}</Typography>
                    <Typography variant="body1">
                    Ubicación: {user?.localidad}
                    </Typography>
                    <Typography variant="body1">
                    Correo: {user?.email}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
            <Grid sx={{backgroundColor: 'inherit'}}>
              <Typography variant="subtitle1">
                Seguidores {user?.seguidores.length}
              </Typography>
              <Typography variant="subtitle1">
                Seguidos {user?.seguidos.length}
              </Typography>  
            </Grid>
        </Grid>
      </Grid>

      {/* Secciones de la Página */}
      {user && <Secciones userId={user._id}/>}
    </Box>
  );
};

export default PerfilUsuario;
