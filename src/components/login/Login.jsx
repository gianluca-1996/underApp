import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import { grey } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useState, useContext, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { AuthContext } from '../context/AuthContext';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) navigate('/');
    }, [])

    const onSubmit = async (data) => {
    try {
        const response = await axios({
            method: 'post',
            url: 'http://localhost:8080/user/login',
            data: {
                email: data.usuario,
                password: data.password
            }
        });
        
        localStorage.setItem('token', response.data.token);
        login(response.data.user);
        navigate('/comunidad');
    } catch (error) {
        setErrorMessage(error.response? ('Error | ' + error.response.data) : (error.message + ' | No se pudo conectar con el servidor'));
        setTimeout(() => {
            setErrorMessage(null);
        }, 5000);
    }
    }

    return(    
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
                <Grid width={{xs: '100%', md: '40%'}} height={'6vh'}>
                    {errorMessage && <Alert severity="error" color='error'>{errorMessage}</Alert>}
                </Grid>
            </Stack>
        </Container>
        
    )
}

export default Login;