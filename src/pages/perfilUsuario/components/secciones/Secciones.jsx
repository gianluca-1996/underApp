import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PosteosUsuario from '../../../../components/posteosUsuario/PosteosUsuario';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Secciones({userId}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ borderRadius: '5px', marginTop: '2vh', minHeight: '80vh'}}>
      <Box sx={{ borderColor: 'divider', backgroundColor: '#d32f2f', borderRadius: '5px' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="scrollable" scrollButtons="auto">
          <Tab label="Posts" {...a11yProps(0)} />
          <Tab label="Competencias" {...a11yProps(1)} />
          <Tab label="Organizacion" {...a11yProps(2)} />
          <Tab label="Prueba" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <PosteosUsuario userId={userId}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Mis compes
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Organizacion de Batallas/torneos
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        prueba
      </CustomTabPanel>
    </Box>
  );
}
