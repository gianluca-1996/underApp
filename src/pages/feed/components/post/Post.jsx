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
import './style.css'

const Post = ({post, loginUser, handleDeletePost}) => {

  const axios = useAxiosInterceptor();
  const [comentarios, setComentarios] = useState(post.comentarios);
  const [reacciones, setReacciones] = useState([]);
  const [miReaccion, setMiReaccion] = useState(false);

  useEffect(() => {
    const getReacciones = () => {
      try {
        post.reacciones.forEach(reaccion => ( (reaccion.usuario._id == loginUser._id) && setMiReaccion(true) ) )
        setReacciones(post.reacciones);
      } catch (error) {
        console.log(error.message)
      }
    }

    getReacciones();
  }, [])

  const handleReaccion = async () => {
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
      { post.created_id ? 
        (<><CardHeader className='cardHeader'
          avatar={
            <Link to={`/perfilUsuario/${post.created_id._id}`}>
              <Avatar aria-label="recipe" alt="Remy Sharp" src={`/src/assets/img/${post.created_id.foto_perfil}`} />
            </Link>
          }
          action={
            post.created_id == loginUser._id &&
            (<MenuPost handleDeletePost={handleDeletePost} postId={post._id}/>)
          }
          title={post.created_id.usuario}
          subheader={`${new Date(post.created_dt).toLocaleDateString()} | ${new Date(post.created_dt).getHours().toString().padStart(2, '0')}:${new Date(post.created_dt).getMinutes().toString().padStart(2, '0')}hs`}
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
            <Grid display="flex" justifyContent="center" alignItems="center" size={1} onClick={() => {console.log(reacciones)}}>
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