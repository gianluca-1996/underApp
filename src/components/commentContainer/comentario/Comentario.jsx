import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid2';

const Comentario = ({comentario}) => {
    
    const created_dt = new Date(comentario.created_dt).toLocaleDateString() + ' | ' + new Date(comentario.created_dt).toLocaleTimeString().slice(0, 5) + 'hs';
    
    return(
        <Grid container spacing={1} columns={8}>
            <Grid size={2} sx={{marginTop: '5%', justifyItems: 'center'}}>
                <Avatar alt={comentario.usuario.usuario} src={comentario.usuario.foto_perfil} />
            </Grid>
            <Grid size={6}>
                <Stack>
                    <p><strong>{comentario.usuario.usuario}:</strong> {comentario.texto}</p>
                    <p>{created_dt}</p>
                </Stack>
            </Grid>
        </Grid>
    )
}

export default Comentario;