import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import useAxiosInterceptor from '../../config/axios.config';
import { useNotification } from '../../context/NotificationContext';
import CircularProgress from '@mui/material/CircularProgress';
import PosteosUsuario from '../../components/posteosUsuario/PosteosUsuario';
//import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PlaceIcon from '@mui/icons-material/Place';
import EmailIcon from '@mui/icons-material/Email';

import './style.css'

const Perfil = () => {
  const { authState } = useContext(AuthContext);
  const [user, setUser] = useState();
  const axios = useAxiosInterceptor();
  const { showNotification } = useNotification();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`/user/getUserById/${authState.user._id}`);
        setUser(response.data);
      } catch (error) {
        console.log(error)
        showNotification(error.response.data.message, 'error');
      }
    }

    getUser();
  }, [])

  const handleClick = () => {
    alert('You clicked the Chip.');
  };

  if(authState.isLoading || !user){
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
      <Grid container sx={{ mt: 8}}>
        <Grid size={{ xs: 12, md: 6 }} sx={{marginLeft: '2%'}}>
          <Typography variant="h4">{user?.usuario}</Typography>
          <Stack direction="row" spacing={2} justifyContent={'start'}>
            <PlaceIcon/> <Typography>{user?.localidad}</Typography>
          </Stack>
          <Stack direction="row" spacing={2} justifyContent={'start'}>
            <EmailIcon/> <Typography>{user?.email}</Typography>
          </Stack>
          {/* <Typography variant="body1">
            <PlaceIcon/> {user?.localidad}
          </Typography> */}
          <Stack direction="row" spacing={3} className='StackSeguidores'>
            <Button
              variant="contained"
              onClick={handleClick}
              fullWidth
              className="seguidores-button"
            >
              {`Seguidos: ${user?.seguidos.length}`}
            </Button>
            <Button
              variant="contained"
              onClick={handleClick}
              fullWidth
              className="seguidores-button"
            >
              {`Seguidores: ${user?.seguidores.length}`}
            </Button>
          </Stack>
        </Grid>
      </Grid>
      {/* <Divider sx={{
        backgroundColor: '#d32f2f', 
        marginTop: '2%', 
        marginBottom: '2%', 
        marginLeft: '3%', 
        marginRight: '3%'}} 
      /> */}
      <Stack direction='row' spacing={3} justifyContent={'center'}>
        <FacebookIcon/>
        <InstagramIcon/>
        <WhatsAppIcon/>
      </Stack>
      <Divider sx={{
        backgroundColor: '#d32f2f', 
        marginTop: '2%', 
        marginBottom: '2%', 
        marginLeft: '3%', 
        marginRight: '3%'}} 
      />
      <PosteosUsuario userId={authState.user._id}/>
    </Box>
  );
};

export default Perfil;
