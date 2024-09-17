import { Box } from '@mui/material';

const BoxContainer = ({children}) => {
    return(
        <Box minHeight= "90vh" >
            {children}
        </Box>
    )
}

export default BoxContainer;