import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import { grey } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useContext, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../context/AuthContext';
import useAxiosInterceptor from '../../config/axios.config';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext';

const Login = () => {
    const axios = useAxiosInterceptor();
    const { showNotification } = useNotification();
    const { login, authState } = useContext(AuthContext);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        if(authState.user) navigate('/');
    }, [])

    const onSubmit = async (data) => {
    try {
        const response = await axios.post('/user/login', {email: data.usuario, password: data.password});
        localStorage.setItem('token', response.data.token);
        login(response.data.user);
        navigate('/');
    } catch (error) {
        showNotification(error.response.data, 'error');
    }
    }

    if(authState.isLoading) return <CircularProgress />
    if(!authState.isLoading && !authState.user) return(    
        <Container >
            <Stack spacing={2} marginTop={'10%'} direction="column" justifyContent={'center'} alignItems={'center'}>
                <Grid sx={{background: grey[900]}}
                    width={{xs: '100%', md: '60%'}}
                    display="flex" 
                    justifyContent="center" 
                    borderRadius={7}>
                        <Stack width={'90%'} direction={'column'}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Stack sx={{marginTop: '5vh'}} spacing={4} >
                                        <TextField 
                                            {...register("usuario", {required: true})} 
                                            label={errors.usuario ? 'El usuario es requerido' : 'AKA / Usuario'}
                                            type='email'
                                            color={errors.usuario ? 'error' : ''}
                                            variant="filled" 
                                            sx={{backgroundColor: 'white', borderRadius: 1}} />
                                        <TextField 
                                            {...register("password", {required: true})} 
                                            label={errors.password ? 'La contraseña es requerida' : 'Contraseña'} 
                                            color={errors.password ? 'error' : ''}
                                            type="password" 
                                            variant="filled" 
                                            sx={{backgroundColor: 'white', borderRadius: 1}}/>
                                </Stack>
                                <Button color="error" variant="contained" type="submit" sx={{width: "50%", marginLeft: "25%", marginTop: "5%", borderRadius: 10}}>Ingresar</Button>
                            </form>
                            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} display="flex" justifyContent="space-between" alignItems="center" marginTop={'5vh'}>
                                <Grid>
                                    <p>No tienes una cuenta? Regístrate</p>
                                </Grid>
                                <Grid>
                                    <p>Olvide mi contraseña</p>
                                </Grid>
                            </Stack>
                        </Stack>
                </Grid>
            </Stack>
        </Container>
        
    )
}

export default Login;