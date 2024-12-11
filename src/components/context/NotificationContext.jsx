// NotificationContext.js
import { createContext, useContext, useState, useCallback } from 'react';
import Alert from '@mui/material/Alert';
import './style.css'

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const showNotification = useCallback((message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000); // Ocultar después de 3 segundos
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && <Notification message={notification.message} type={notification.type} />}
    </NotificationContext.Provider>
  );
};

// Componente Notification
const Notification = ({ message, type }) => {
  return (
    <Alert severity={type}>{message}</Alert>
  );
};
