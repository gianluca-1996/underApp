import { Container, Stack } from "@mui/material";
import useAxiosInterceptor from '../../config/axios.config';
import { useEffect, useState } from "react";
import Post from "./post/Post";
import './style.css'

const PostContainer = () => {

    const axios = useAxiosInterceptor();
    const [posteos, setPosteos] = useState();

    useEffect(() => {
        const getPosteos = async () => {
            try {
                const response = await axios.get('/post/');
                setPosteos(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        getPosteos();
    }, []);

    return(
        <Container >
            <div style={{textAlign: 'center', color: 'gold'}}>
                <h1>COMUNIDAD</h1>
            </div>
            <Stack className="stackPosteos">
                {posteos ? (posteos.map(post => (<Post key={post._id} post={post} userId={post.created_id} />))) : (<h1>Aun no hay posteos</h1>)}
            </Stack>
        </Container>
    );
}

export default PostContainer;