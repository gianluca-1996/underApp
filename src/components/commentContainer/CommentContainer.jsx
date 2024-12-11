import { useState, useContext } from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Comentario from './comentario/Comentario';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useAxiosInterceptor from '../../config/axios.config';
import { useNotification } from '../context/NotificationContext';

import './style.css'

const CommentContainer = ({comentarios, postId, setComentarios}) => {
  
  const { showNotification } = useNotification();
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState('');
  const axios = useAxiosInterceptor();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onSubmitComentario = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('/post/nuevoComentario', {
          postId,
          texto: e.target.nuevoComentario.value
        });
        setComment('');
        showNotification('Comentario agregado', 'success');
        setComentarios(response.data.comentarios);
    } catch (error) {
      showNotification(error.response.data, 'error');
    }
  }

  const onChangeComment = (e) => {
    setComment(e.target.value);
  }
  
  return (
    <div>
        <IconButton aria-label='comentarios' onClick={handleOpen} color='inherit'>
            <CommentIcon />
        </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className='modal-container'>
          <div className='modal-content'>
            <Typography id="modal-modal-title" variant="h4" component="h2" className='commentTitle'>
              {comentarios.length > 0 ? 'Comentarios' : 'Aun no hay comentarios'}
            </Typography>
            <Stack divider={ <Divider orientation="horizontal" />} >
              {comentarios.map(comentario => <Comentario key={comentario._id} comentario={comentario}/>)}
            </Stack>
          </div>
            <Stack className='newCommentContainer'>
              <Stack>
                <h2 className='newCommentTitle'>Nuevo comentario</h2>
              </Stack>
              <form onSubmit={onSubmitComentario}>
                <Stack>
                  <TextField name='nuevoComentario' type='text' className='textComment' value={comment} onChange={onChangeComment}/>
                </Stack>
                <Stack className='buttonComment'>
                  <Button color="error" variant="contained" type="submit" >Responder</Button>
                </Stack>
              </form>
            </Stack>
        </div>
      </Modal>
    </div>
  );
}

export default CommentContainer;