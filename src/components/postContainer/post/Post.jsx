import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect, useState } from 'react';
import useAxiosInterceptor from '../../../config/axios.config';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CommentContainer from '../../commentContainer/CommentContainer';
import Grid from '@mui/material/Grid2';
import MenuPost from './menuPost/MenuPost';
import './style.css'

const Post = ({post, loginUser, handleDeletePost}) => {

  const axios = useAxiosInterceptor();
  const [postUser, setPostUser] = useState();
  const [comentarios, setComentarios] = useState(post.comentarios);
  const [reacciones, setReacciones] = useState([]);
  const [miReaccion, setMiReaccion] = useState(false);

  useEffect(() => {
    const getInfoUsuario = async () => {
      try {
        const response = await axios.get(`/user/getUserById/${post.created_id}`);
        setPostUser(response.data);
      } catch (error) {
        console.log(error.message)
      }
    };

    const getReacciones = async () => {
      try {
        const response = await axios.get(`/post/reacciones/${post._id}`);
        response.data.reacciones.forEach(reaccion => ( (reaccion.usuario == loginUser._id) && setMiReaccion(true) ) )
        setReacciones(response.data.reacciones);
      } catch (error) {
        console.log(error.message)
      }
    };
    
    getInfoUsuario();
    getReacciones()
  }, [])

  const handleReaccion = async () => {
    //TODO: si miReaccion = true -> sacar la reaccion del post. sino -> agregar reaccion
    if(miReaccion){
      try {
        const response = await axios.delete(`/post/eliminaMeGusta/${post._id}`);
        setReacciones(response.data.reacciones);
        setMiReaccion(false);
      } catch (error) {
        console.log(error.message)
      }
    }
    else{
      try {
        const response = await axios.post(`/post/agregaMeGusta`, {postId: post._id});
        setReacciones(response.data.reacciones);
        setMiReaccion(true);
      } catch (error) {
        console.log(error.message)
      }
    }
  }

  return (
    <Card className='cardPost'>
      { postUser ? 
        (<><CardHeader className='cardHeader'
          avatar={
            <Avatar aria-label="recipe" alt="Remy Sharp" src={`${postUser.foto_perfil}`} />
          }
          action={
            post.created_id == loginUser._id &&
            (<MenuPost handleDeletePost={handleDeletePost} postId={post._id}/>)
          }
          title={postUser.usuario}
          subheader={String(new Date(post.created_dt).toLocaleDateString() + ' | ' + new Date(post.created_dt).toLocaleTimeString())}
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
              <p>{reacciones.length}</p>
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