import TokenService from './token.service';
import http from './http';
import httpPublic from './httpPublic';
import { refreshToken } from '@/lib/features/auth/authSlice';
import { Store } from '@reduxjs/toolkit';

const setup = (store: Store) => {
  console.log('Setting up interceptors with store:', store);
  console.log('Initial state:', JSON.stringify(store.getState()));

  const requestInterceptor = http.interceptors.request.use(
    (config) => {
      const token = TokenService.getAccessToken();
      if (token) {
        config.headers['x-access-token'] = token;
      }
      return config;
    },
    (error) => Promise.reject(new Error(error))
  );

  const responseInterceptor = http.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalConfig = error.config;
      if (originalConfig.url !== '/auth/signin' && error.response) {
        if (error.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          try {
            const token = TokenService.getRefreshToken();
            const rs = await httpPublic.get('/auth/refresh', {
              headers: { 'x-access-token': token },
            });
            store.dispatch(refreshToken(rs.data));
            TokenService.updateAccessToken(rs.data.accessToken);
            TokenService.updateRefreshToken(rs.data.refreshToken);
            return http(originalConfig);
          } catch (_error) {
            const error = _error as string;
            return Promise.reject(new Error(error));
          }
        }
      }
      return Promise.reject(error);
    }
  );

  return () => {
    http.interceptors.request.eject(requestInterceptor);
    http.interceptors.response.eject(responseInterceptor);
  };
};

export default setup;