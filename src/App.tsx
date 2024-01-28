import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/main.css';
import Error404 from './pages/Error404';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Booking from './pages/Booking';
import Main from './pages/Main';
import { useAuth } from './hooks/auth.hook';
import AuthContext from './context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Monitor from '@component/Monitor';
import ModalProvider from '@component/Modal';

const App: React.FC = () => {
  const {
    token,
    refreshToken,
    login,
    logout,
    username,
    isAuthenticated,
    checkAuth,
  } = useAuth();
  (window as any).toast = toast;
  return (
    <AuthContext.Provider
      value={{
        refreshToken,
        token: token,
        login,
        logout,
        username,
        isAuthenticated,
        checkAuth,
      }}
    >
      <GoogleOAuthProvider clientId="116078094255-6322sccgf57jdb1kgkr30idrhuuefrvv.apps.googleusercontent.com">
        <ModalProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Monitor />}>
                <Route index element={<Main />} />
                <Route path="/booking" element={<Booking />} />
                {isAuthenticated ? (
                  <Route path="/account/*" element={<Profile />} />
                ) : (
                  <Route path="/account/*" element={<Auth />} />
                )}
                <Route path="/*" element={<Error404 />} />
              </Route>
            </Routes>
            <ToastContainer
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </BrowserRouter>
        </ModalProvider>
      </GoogleOAuthProvider>
    </AuthContext.Provider>
  );
};

export default App;
