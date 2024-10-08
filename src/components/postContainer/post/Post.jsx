import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import useAxiosInterceptor from '../../../config/axios.config';
import './style.css'

const Post = ({post, userId}) => {

  const axios = useAxiosInterceptor();
  const [user, setUser] = useState();

  useEffect(() => {
    const getInfoUsuario = async () => {
      const response = await axios.get(`/user/getUserById/${userId}`);
      console.log(response)
      setUser(response.data);
    };
    
    getInfoUsuario();
  }, [])

  return (
    <Card className='cardPost'>
      { user ? 
        (<><CardHeader
          avatar={
            <Avatar aria-label="recipe" alt="Remy Sharp" src={`${user.foto_perfil}`} />
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={user.usuario}
          subheader={post.created_dt}
        />
        
        <CardContent>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {post.texto}
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </>) : (<CircularProgress />)}
    </Card>
  );
}

export default Post;