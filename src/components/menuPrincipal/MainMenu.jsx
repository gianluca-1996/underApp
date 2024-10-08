import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { grey } from '@mui/material/colors';
import { Link } from 'react-router-dom';

const MainMenu = ({menu}) => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box 
      sx={{ 
        width: 250, 
        background: grey[900], 
        color: 'white', 
        height: '100%'}} 
        role="presentation" 
        onClick={toggleDrawer(false)}>
      <List>
        {['UnderApp', 'About'].map((page) => (
          <ListItem key={page} disablePadding>
            <ListItemButton sx={{'&:hover': {
            bgcolor: '#d32f2f',
          }}}>
              <ListItemText primary={page} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {menu.map((page) => (
          <ListItem key={page.tittle} disablePadding>
            <ListItemButton sx={{'&:hover': {
            bgcolor: '#d32f2f',
          }}}>
            <Link to={page.path} style={{textDecoration: 'none', color: 'white'}}>
              <ListItemText primary={page.tittle} />
            </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton onClick={toggleDrawer(true)}><MenuIcon sx={{color: '#d32f2f'}}/></IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}

export default MainMenu;