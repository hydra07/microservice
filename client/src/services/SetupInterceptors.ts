
import TokenService from "./token.service";
import http from './http';
import httpPublic from "./httpPublic";
import { refreshToken } from "@/features/authSlice";
import { Store } from '@reduxjs/toolkit';


const setup = (store: Store) => {
    http.interceptors.request.use(
        (config) => {
            const token = TokenService.getAccessToken();
            if (token) {
                config.headers['Authorization'] = 'Bearer ' + token; // for Spring Boot back-end
                //config.headers['x-access-token'] = token; // for Node.js Express back-end
            }
            return config;
        },
        (error) => {
            return Promise.reject(new Error(error)); // Wrap the rejection reason in a new Error object
        }
    );

    const { dispatch } = store;
    http.interceptors.response.use(
      (res) => {
        return res;
      },
  
      async (err) => {
        console.log(http.defaults.headers.common);
        const originalConfig = err.config;
  
        if (originalConfig.url !== '/auth/signin' && err.response) {
          // Access Token was expired
          if (err.response.status === 401 && !originalConfig._retry) {
            originalConfig._retry = true;
            try {
                const token = TokenService.getRefreshToken();
                const rs = await httpPublic.get('/auth/refresh', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                dispatch(refreshToken(rs.data));
                TokenService.updateAccessToken(rs.data.accessToken);
                TokenService.updateRefreshToken(rs.data.refreshToken);

                return http(originalConfig);
            } catch (_error) {
                const error = _error as string; // Cast _error to string
                return Promise.reject(new Error(error));
            }
          }
        }
  
        return Promise.reject(new Error(err));
      }
    );
  };
  
  export default setup;
  