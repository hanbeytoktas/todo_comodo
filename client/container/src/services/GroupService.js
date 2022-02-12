import { apiCall,queryBuilder } from '../modules/AxiosInstance';

export const saveGroup = (payload) => {
  return apiCall.post('/api/group', payload);
};

export const getGroupsWithQuery = (query) => {
  return apiCall.post('/api/group/query', queryBuilder(query));
};

export const getGroups = () => {
  return apiCall.get('/api/group');
};

export const getGroup = (id) => {
  return apiCall.get(`/api/group/${id}`);
};

export const deleteGroup = (id) => {
  return apiCall.delete(`/api/group/${id}`);
};

