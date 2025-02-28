import { Container, Stack } from "@mui/material";
import useAxiosInterceptor from '../../config/axios.config';
import { useEffect, useState } from "react";
import Post from "../../pages/feed/components/post/Post";
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNotification } from "../../context/NotificationContext";
import './style.css'

const PosteosUsuario = ({userId}) => {
    const { authState } = useContext(AuthContext);
    const axios = useAxiosInterceptor();
    const [posteos, setPosteos] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const { showNotification } = useNotification();

    useEffect(() => {
        const getPosteos = async () => {
            try {
                const response = await axios.get(`/post/getByUserId/${userId}`);
                setIsLoading(false);
                setPosteos(response.data);
            } catch (error) {
                showNotification(error.message, 'error');
            }
        };

        getPosteos();
    }, []);

    // Función para eliminar un post
    const handleDeletePost = async (postId) => {
        try {
            const response = await axios.delete(`/post/eliminaPost/${postId}`);
            showNotification(response.data, 'success');
            setPosteos(prev => ({...prev, docs: posteos.docs.filter(post => post._id !== postId)}));
        } catch (error) {
            showNotification(error.message, 'error');
        }
    };

    const handleChangePage = async (event, value) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`/post/getByUserId/${userId}/?page=${value}`);
            setIsLoading(false);
            setPosteos(response.data);
        } catch (error) {
            showNotification(error.message, 'error');
        }
    }



    if(isLoading){
        return (<Container style={{justifyItems: 'center', marginTop: '15%'}}>
            <Stack>
                <CircularProgress />
            </Stack>
        </Container>)
    }
    
    return(
        <Container className="containerPosteos">
            <Stack className="stackPosteos">
            {posteos.docs.map(post => (<Post key={post._id} post={post} loginUser={authState.user} handleDeletePost={handleDeletePost} />) )}
            </Stack>
            <Stack className="stackPaginacion">
                {posteos && 
                    <Pagination 
                        count={posteos.totalPages} 
                        hideNextButton={!posteos.hasNextPage} 
                        hidePrevButton={!posteos.hasPrevPage} 
                        page={posteos.page} 
                        onChange={handleChangePage}
                    /> 
                }
            </Stack>
        </Container>
    );
}

export default PosteosUsuario;