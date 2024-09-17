import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login'
import Logout from './components/logout/Logout';
import Background from './components/background/Background';
import BoxContainer from './components/boxContainer/BoxContainer';
import ResponsiveAppBar from './components/nav/ResponsiveAppBar';
import { AuthProvider } from './components/context/AuthContext';

function App() {

  return (
    <div className='app'>
      <Background />
      <div className='content'>
        <AuthProvider>
          <BrowserRouter>
            <ResponsiveAppBar />
            <BoxContainer>
                <Routes>
                  <Route path='/' element={<><h1>Landing Page</h1></>}/>
                  <Route path='/login' element={<Login />}/>
                  <Route path='/logout' element={<Logout />}/>
                </Routes>
            </BoxContainer>
            </BrowserRouter>
        </AuthProvider>
        <h1>Footer</h1>
      </div>
    </div>
  )
}

export default App
