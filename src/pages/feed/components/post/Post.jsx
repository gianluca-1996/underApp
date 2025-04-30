import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect, useState } from 'react';
import useAxiosInterceptor from '../../../../config/axios.config';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CommentContainer from '../../../../components/commentContainer/CommentContainer'
import Grid from '@mui/material/Grid2';
import MenuPost from './menuPost/MenuPost';
import { Link } from 'react-router-dom';
import { useNotification } from '../../../../context/NotificationContext';
import ReaccionesContainer from '../../../../components/reaccionesContainer/ReaccionesContainer';

import './style.css'

const Post = ({post, loginUser, handleDeletePost}) => {

  const axios = useAxiosInterceptor();
  const [comentarios, setComentarios] = useState(post.comentarios);
  const [reacciones, setReacciones] = useState([]);
  const [miReaccion, setMiReaccion] = useState(false);
  const {showNotification} = useNotification();

  useEffect(() => {
    const verificarMiReaccion = () => {
      try {
        //verifica si la reaccion del usuario esta en el post
        post.reacciones.forEach(reaccion => ( (reaccion.usuario._id == loginUser._id) && setMiReaccion(true) ) )
        setReacciones(post.reacciones);
      } catch (error) {
        console.log(error.message)
      }
    }

    verificarMiReaccion();
  }, [])

  const handleReaccion = async () => {
    if(miReaccion){
      try {
        const response = await axios.delete(`/post/eliminaMeGusta`, {data: {postId: post._id} });
        setMiReaccion(false);
        setReacciones(response.data.data.reacciones);
      } catch (error) {
        showNotification(error.response.data.message, 'error');
      }
    }
    else{
      try {
        const response = await axios.post(`/post/agregaMeGusta`, {postId: post._id});
        setReacciones(response.data.data.reacciones);
        setMiReaccion(true);
      } catch (error) {
        showNotification(error.response.data.message, 'error');
      }
    }
  }

  // const handleGetReacciones = async () => {
  //   try {
  //     const response = await axios.get(`/post/reacciones/${post._id}`);
  //     setReacciones(response.data.reacciones);
  //   } catch (error) {
  //     showNotification(error.response.data.message, 'error');
  //   }
  // }

  return (
    <Card className='cardPost'>
      { post.created_id ? 
        (<><CardHeader className='cardHeader'
          avatar={
            <Link to={`/perfilUsuario/${post.created_id._id}`}>
              <Avatar aria-label="recipe" alt="Remy Sharp" src={`/src/assets/img/${post.created_id.foto_perfil}`} />
            </Link>
          }
          action={
            post.created_id._id == loginUser._id &&
            (<MenuPost handleDeletePost={handleDeletePost} postId={post._id}/>)
          }
          title={post.created_id.usuario}
          subheader={`${new Date(post.createdAt).toLocaleDateString()} | ${new Date(post.createdAt).getHours().toString().padStart(2, '0')}:${new Date(post.createdAt).getMinutes().toString().padStart(2, '0')}hs`}
        />
        
        <Divider />
        
        <CardContent>
          <Typography variant="body2">
            {post.texto}
          </Typography>
        </CardContent>
        
        <Divider />

        <CardActions>
        <Grid container columns={2}>
            <Grid display="flex" justifyContent="center" alignItems="center" size={1}>
              <IconButton aria-label="add to favorites" color='inherit' onClick={handleReaccion}>
                <FavoriteIcon style={{color: miReaccion && 'red'}}/>
              </IconButton>
            </Grid>
            <Grid display="flex" justifyContent="center" alignItems="center" size={1}>
              <ReaccionesContainer reacciones={reacciones} />
            </Grid>
          </Grid>
          <Grid container columns={2}>
            <Grid display="flex" justifyContent="center" alignItems="center" size={1}>
              <CommentContainer comentarios={comentarios} postId={post._id} setComentarios={setComentarios}/>
            </Grid>
            <Grid display="flex" justifyContent="center" alignItems="center" size={1}>
              <p>{comentarios.length}</p>
            </Grid>
          </Grid>
        </CardActions>
      </>) : 
      ( 
      <Stack spacing={1}>
        <Skeleton variant="circular" width={40} height={40} sx={{bgcolor: '#212121'}}/>
        <Skeleton variant="rounded" width={'100%'} height={100} sx={{bgcolor: '#212121'}}/>
      </Stack>
      )}
    </Card>
  );
}

export default Post;