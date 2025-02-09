import Alert from '@mui/material/Alert';

const Notification = ({ message, type }) => {
  return (
    <Alert 
    sx={{
      position: 'fixed', 
      left: '50%',
      transform: 'translateX(-50%)',
      bottom: '20px'
    }} 
    severity={type}>{message}</Alert>
  );
};

export default Notification;