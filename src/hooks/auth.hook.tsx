import { useState, useCallback, useEffect } from 'react';
import userStore from '../stores/userStore';
import { authService } from '@/shared/services/authService';
const storageName = 'tokens';

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = useCallback(async (jwtToken: string, refreshToken: string) => {
    const info = await userStore.getMe();
    if (info) {
      setToken(jwtToken);
      setRefreshToken(refreshToken);
      localStorage.setItem(
        storageName,
        JSON.stringify({
          accessToken: jwtToken,
          refreshToken: refreshToken,
        }),
      );
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setRefreshToken(null);
    setUsername(null);
    localStorage.removeItem(storageName);
    if (localStorage.getItem(storageName)) {
      const data = JSON.parse(localStorage.getItem(storageName) as string);
      if (data && data.accessToken && data.refreshToken) {
        authService.logout(data.refreshToken);
      }
    }
    userStore.cleanForm();
    location.reload();
  }, []);

  const check = () => {
    if (localStorage.getItem(storageName)) {
      const data = JSON.parse(localStorage.getItem(storageName) as string);
      if (data && data.accessToken && data.refreshToken) {
        login(data.accessToken, data.refreshToken);
      }
    }
    setReady(true);
  };
  const checkAuth = useCallback(check, []);

  useEffect(() => {
    check();
  }, [login]);

  return {
    login,
    logout,
    token,
    refreshToken,
    username,
    ready,
    checkAuth,
    isAuthenticated,
  };
};
