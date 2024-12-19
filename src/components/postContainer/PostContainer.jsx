import { Container, Stack } from "@mui/material";
import useAxiosInterceptor from '../../config/axios.config';
import { useEffect, useState } from "react";
import Post from "./post/Post";
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNotification } from "../context/NotificationContext";
import NuevoPost from "./nuevoPost/NuevoPost";
import './style.css'

const PostContainer = () => {
    const { logout, authState } = useContext(AuthContext);
    const axios = useAxiosInterceptor();
    const [posteos, setPosteos] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { showNotification } = useNotification();

    useEffect(() => {
        const getPosteos = async () => {
            try {
                const response = await axios.get('/post/');
                setIsLoading(false);
                setPosteos(response.data);
            } catch (error) {
                if(error.response.status === 401){
                    alert('Su sesion ha expirado');
                    logout();        
                    navigate('/login');
                } 
            }
        };

        getPosteos();
    }, []);

    // Función para eliminar un post
    const handleDeletePost = async (postId) => {
        try {
            let response = await axios.delete(`/post/eliminaPost/${postId}`);
            showNotification(response.data, 'success');
            response = await axios.get('/post/');
            setPosteos(response.data);
        } catch (error) {
            showNotification(error.message, 'error');
        }
    };

    // Función para agregar un post
    const handleAddPost = async (texto) => {
        try {
            if(texto.length === 0) showNotification('No se puede agregar un post vacío', 'error');
            let response = await axios.post('/post/', {texto});
            showNotification(response.data, 'success');
            response = await axios.get('/post/');
            setPosteos(response.data);
        } catch (error) {
            showNotification(error.message, 'error');
        }
    };

    const handleChangePage = async (event, value) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`/post/?page=${value}`);
            setIsLoading(false);
            setPosteos(response.data);
        } catch (error) {
            if(error.response.status === 401){
                alert('Su sesion ha expirado');
                logout();        
                navigate('/login');
            }
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
            <div style={{textAlign: 'center', color: 'gold'}}>
                <h1>COMUNIDAD</h1>
            </div>
            <div>
                <NuevoPost addPost={handleAddPost}/>
            </div>
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

export default PostContainer;