import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

const ReaccionesContainer = ({reacciones}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {reacciones.length && setOpen(true)};
    const handleClose = () => setOpen(false);

    return (
    <div>
        <IconButton aria-label='Reacciones' onClick={handleOpen} color='inherit' sx={{fontSize: '15px'}}>
            {reacciones.length}
        </IconButton>

        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <div className='modal-container' style={{textAlign: 'center'}}>
                <Typography id="modal-modal-title" variant="h4" component="h4">
                    Me gusta
                </Typography>
                <Stack divider={ <Divider orientation="horizontal" />} >
                    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: '#424242' }}>
                        {reacciones.map(reaccion => 
                            <ListItem
                                key={reaccion._id}
                                disablePadding
                                divider={true}
                                sx={{padding: '3px'}}
                                >
                                <ListItemAvatar>
                                <Avatar
                                    alt={`${reaccion.usuario.usuario ? reaccion.usuario.usuario : ''}`}
                                    src={`/src/assets/img/${reaccion.usuario.foto_perfil ? reaccion.usuario.foto_perfil : ''}`}
                                />
                                </ListItemAvatar>
                                <ListItemText id={reaccion._id} primary={`${reaccion.usuario.usuario ? reaccion.usuario.usuario : ''}`} sx={{color: 'black'}} />
                            </ListItem>
                        )}
                    </List>
                </Stack>
                
            </div>
        </Modal>
    </div>
    );
}

export default ReaccionesContainer;