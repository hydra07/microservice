import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import tokenService from '@/services/token.service';

const AutoCloseComponent: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const accessToken = urlParams.get('accessToken');
    const refreshToken = urlParams.get('refreshToken');

    if (accessToken && refreshToken) {
      tokenService.saveToken(accessToken, refreshToken);
      window.opener?.postMessage({ accessToken, refreshToken }, window.origin);
      window.close();
    }
  }, [location.search]);

  return null;
};

export default AutoCloseComponent;