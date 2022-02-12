import { apiCall,queryBuilder } from '../modules/AxiosInstance';

export const login = (payload) => {
  return apiCall.post('api/auth/signin', payload);
};

export const register = (payload) => {
  return apiCall.post('api/auth/signup', payload);
};

