import React, { useContext, useState } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { GoogleButtonStyled } from '../../styled-components/Auth';
import GoogleLogo from '../../../static/images/GoogleIcon.svg';
import store from '../../../stores/authStore';
import { useNavigate } from 'react-router';
import AuthContext from '@/context/AuthContext';
import { toast } from 'react-toastify';

// access_token:"ya29.a0AfB_byDKwrKxCCOSa8cCHThGhYhKZ0H0IjhDJE5qzgxpydjbu7lRMWkaCciSs_63zC5Z11Ntg7HM0DxN5B3peEDNIyO4A_koNUAU6xDvO8HWb5khAbm-pDyl8r_SPJGvydCqqtXclJK69VIELSdfgM0uURn5KwvhEQaCgYKAa4SARESFQGOcNnCqIOHZoqfuMaXCMaqRvziZw0169"
// authuser: "0"
// expires_in: 3599
// prompt: "none"
// scope:"email profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid"
// token_type: "Bearer"

const GoogleComponent: React.FC = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const responseMessage = async (response: any) => {
    if (!response.access_token) {
      return;
    }
    const result = await store.googleAuth(response.access_token);
    if (!result) {
      return;
    }
    await auth?.checkAuth();
    navigate('/account/me');
    return;
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => responseMessage(codeResponse),
    onError: (error) => {
      console.error('Login Failed:', error);
      toast('Error during google auth', {
        type: 'error',
      });
    },
  });

  const logOut = () => {
    googleLogout();
  };

  return (
    <GoogleButtonStyled onClick={() => login()}>
      <img alt="google" src={GoogleLogo} />
      <span>Google authorization 🚀</span>
    </GoogleButtonStyled>
  );
};

export default GoogleComponent;
