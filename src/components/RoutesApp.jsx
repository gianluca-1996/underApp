import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { RouteContext } from "./context/RoutesContext";
import { AuthContext } from "./context/AuthContext";
import { Container, Stack } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import Login from "./login/Login";
import Logout from "./logout/Logout";

const RoutesApp = () => {
    const {rutas} = useContext(RouteContext);
    const {authState} = useContext(AuthContext);

    if (authState.isLoading || (authState.user && rutas.length == 0) ) {
        return <Container style={{justifyItems: 'center', marginTop: '15%'}}>
                    <Stack>
                        <CircularProgress />
                    </Stack>
                </Container>
    } 

    if(authState.user) {
        return <Routes>
                    {rutas.map(ruta => (<Route key={ruta.nombre} path={ruta.path} element={ruta.element}/>))}
                    <Route key={'login'} path='/login' element={<Login />}/>
                    <Route key={'logout'} path='/logout' element={<Logout />}/>
                    <Route key={'some'} path='/*' element={<h1>Recurso no encontrado</h1>}/>
                </Routes>
    }
    else{
        return <Routes>
                    <Route key={'login'} path="/login" element={<Login />} />
                    <Route key={'notfound'} path="*" element={<Navigate to="/login" />} />
                </Routes>
    }

}


export default RoutesApp;