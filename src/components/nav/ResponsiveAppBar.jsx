import './style.css'

import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { grey } from '@mui/material/colors';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useContext } from 'react';
import MainMenu from '../menuPrincipal/MainMenu';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

//paginas del menu
const paginasEstaticas = [
  {tittle: 'Comunidad', path: '/comunidad'}
];

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
      if(authState.user) setMenu(paginasEstaticas);
      else setMenu([{tittle: 'Home', path: '/home'}]);
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
                {authState.user ? <Avatar alt="Remy Sharp" src={authState.user.foto_perfil} /> : <AccountCircleIcon sx={{color: grey[50]}} fontSize="large"/>}
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
                (menuUserLogout.map(page => <MenuItem key={page.tittle} onClick={handleCloseUserMenu} divider={true} sx={{background: grey[800]}}>
                  <Link to={page.path} style={{ textDecoration: "none", color: "white" }}>
                    <Typography sx={{ textAlign: 'center' }}>{page.tittle}</Typography>
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