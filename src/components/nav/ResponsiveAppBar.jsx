import './style.css'

import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import MainMenu from '../menuPrincipal/MainMenu';
import { grey } from '@mui/material/colors';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

//paginas del menu
const paginasEstaticas = [{tittle: 'Noticias', path: '/noticias'}, {tittle: 'Eventos', path: '/eventos'}, {tittle: 'Ranking', path: '/ranking'}];
const organizadorMenu = [{tittle: 'Mis Eventos', path: '/organizador/misEventos'}];
const competidorMenu = [{tittle: 'Participaciones', path: '/competidor/participaciones'}];
const adminMenu = [{tittle: 'adminPanel', path: '/admin'}];

//paginas del menu de usuario segun si esta logueado
const menuUserLogin = [{tittle: 'Cerrar sesion', path: '/logout'}];
const menuUserLogout = [{tittle: 'Iniciar sesion', path: '/login'}, {tittle: 'Registrarse', path: '/registrarse'}];

const ResponsiveAppBar = () => {
  
  const { authState } = useContext(AuthContext);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [menu, setMenu] = useState([]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    const menuUsuario = () => {
      if(authState.user?.rol === 'competidor') setMenu([...paginasEstaticas, ...competidorMenu]);
      if(authState.user?.rol === 'organizador') setMenu([...paginasEstaticas, ...organizadorMenu]);
      if(authState.user?.rol === 'admin') setMenu([...paginasEstaticas, ...adminMenu]);
    }

    menuUsuario();
  }, [authState]);

  return (
    <AppBar position="static" color="transparent" >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{justifyContent: 'space-between'}}>
          <MainMenu menu={menu} />
          <h4>LOGO</h4>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Menu">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {authState.user ? <Avatar alt="Remy Sharp" src="src/assets/img/eminem.jpg" /> : <AccountCircleIcon sx={{color: grey[50]}} fontSize="large"/>}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              disableScrollLock={true}  /* Esta opción deshabilita el bloqueo del scroll */
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              { authState.isAuthenticated ?
                (
                  menuUserLogin.map(page => <MenuItem key={page.tittle} onClick={handleCloseUserMenu} divider={true} sx={{background: grey[800]}}>
                    <Link to={page.path} style={{ textDecoration: "none", color: "white" }}>
                      <Typography sx={{ textAlign: 'center' }}>{page.tittle}</Typography>
                    </Link>
                  </MenuItem>)
                )
                : 
                (menuUserLogout.map(setting => <MenuItem key={setting.tittle} onClick={handleCloseUserMenu} divider={true} sx={{background: grey[800]}}>
                  <Link to={setting.path} style={{ textDecoration: "none", color: "white" }}>
                    <Typography sx={{ textAlign: 'center' }}>{setting.tittle}</Typography>
                  </Link>
                </MenuItem>)
                )
              }
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;