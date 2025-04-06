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
import Button from '@mui/material/Button';

const PerfilUsuario = () => {
  const { authState } = useContext(AuthContext);
  const { idUser } = useParams();
  const { showNotification } = useNotification();
  const axios = useAxiosInterceptor();
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [seguidores, setSeguidores] = useState(0);
  const [esSeguidor, setEsSeguidor] = useState(false); //indica si el usuario logueado es seguidor de este perfil
  const [perfilEsSeguidor, setPerfilEsSeguidor] = useState(false); //indica si este perfil sigue al usuario logueado

  const actualizarSeguidores = (seguidores) => {    
    setSeguidores(seguidores);
  }

  const handleClickSeguir = async () => {
    try {
      await axios.post('/user/followUser', {idUserToFollow: idUser});
      actualizarSeguidores(seguidores + 1);
      setEsSeguidor(true);
    } catch (error) {
      showNotification(error.data.message, 'error');
    }
  }

  const handleClickDejarDeSeguir = async () => {
    try {
      await axios.post('/user/dejarDeSeguir', {idUsuarioSeguido: idUser});
      actualizarSeguidores(seguidores - 1);
      setEsSeguidor(false)
    } catch (error) {
      showNotification(error.response.data.message, 'error');
    }
  }

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`/user/getUserById/${idUser}`);
        const esSeguidor = await axios.get(`/user/esSeguidor/${idUser}`);
        const perfilEsSeguidor = await axios.get(`/user/esSeguido/${idUser}`);
        
        //si el usuario de este perfil me sigue y yo no, entonces mostrar en el boton el texto "seguir tambien"
        if(perfilEsSeguidor) setPerfilEsSeguidor(true);

        if(esSeguidor.data) setEsSeguidor(true);
        actualizarSeguidores(response.data.seguidores.length, response.data.seguidos.length);
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
      <Grid container spacing={2} sx={{ mt: 8, backgroundColor: '#424242'}}>
        <Grid size={{ xs: 12, md: 6 }}>
            <Grid sx={{backgroundColor: 'inherit'}}>  
              <Typography variant="h4">
                {user?.usuario}
              </Typography>
              <Typography variant="body1">
                Ubicación: {user?.localidad}
              </Typography>
              <Typography variant="body1">
                Correo: {user?.email}
              </Typography>
            </Grid>
        </Grid>
        <Grid container size={{ xs: 12, md: 6 }} sx={{backgroundColor: 'inherit'}}>
            <Grid size={6} textAlign={'center'}>
              <Button variant="text" sx={{color: 'white'}} size="large"><strong>Seguidos {user.seguidos.length}</strong></Button>
            </Grid>
            <Grid size={6} textAlign={'center'}>
              <Button variant="text" sx={{color: 'white'}} size="large"><strong>Seguidores {seguidores}</strong></Button>
            </Grid>
            <Grid size={12} textAlign={'center'} paddingBottom={'2%'}>
              {
                esSeguidor ? 
                <Button variant="text" sx={{background: '#d32f2f', color: 'white'}} size="large" onClick={handleClickDejarDeSeguir}>Dejar de seguir</Button> :
                (perfilEsSeguidor ? 
                  <Button variant="text" sx={{background: '#d32f2f', color: 'white'}} size="large" onClick={handleClickSeguir}>Seguir tambien</Button> :
                  <Button variant="text" sx={{background: '#d32f2f', color: 'white'}} size="large" onClick={handleClickSeguir}>Seguir</Button>
                )
              }
            </Grid>            
        </Grid>
      </Grid>

      {/* Secciones de la Página */}
      {user && <Secciones userId={user._id}/>}
    </Box>
  );
};

export default PerfilUsuario;
