import './App.css'
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { NotificationProvider } from './context/NotificationContext';
import { RoutesProvider } from './context/RoutesContext';
import Background from './components/background/Background';
import BoxContainer from './components/boxContainer/BoxContainer';
import ResponsiveAppBar from './components/nav/ResponsiveAppBar';
import RoutesApp from './routes/RoutesApp';

function App() {
  return (
    <div className='app'>
      <Background />
      <div className='content'>
        <NotificationProvider>
            <AuthProvider>
                <BrowserRouter>
                  <BoxContainer>
                    <RoutesProvider>
                      <ResponsiveAppBar />
                      <RoutesApp />
                    </RoutesProvider>
                  </BoxContainer>
                </BrowserRouter>
            </AuthProvider>
        </NotificationProvider>
        <h1>Footer</h1>
      </div>
    </div>
  )
}

export default App
