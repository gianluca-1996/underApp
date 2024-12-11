import './App.css'

import { AuthProvider } from './components/context/AuthContext';
import Login from './components/login/Login'
import Logout from './components/logout/Logout';
import Background from './components/background/Background';
import BoxContainer from './components/boxContainer/BoxContainer';
import ResponsiveAppBar from './components/nav/ResponsiveAppBar';
import PostContainer from './components/postContainer/PostContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import { NotificationProvider } from './components/context/NotificationContext';

function App() {
  return (
    <div className='app'>
      <Background />
      <div className='content'>
        <NotificationProvider>
            <AuthProvider>
                <BrowserRouter>
                  <ResponsiveAppBar />                  
                    <Routes>
                      <Route path='/' element={<><h1>Landing Page</h1></>}/>
                      <Route path='/login' element={<Login />}/>
                      <Route path='/logout' element={<Logout />}/>
                      {<Route path='comunidad' element={<PrivateRoute component={PostContainer} />} />}
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </NotificationProvider>
        <h1>Footer</h1>
      </div>
    </div>
  )
}

export default App
