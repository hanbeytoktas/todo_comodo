import { apiCall,queryBuilder } from '../modules/AxiosInstance';

export const saveTodo = (payload) => {
  return apiCall.post('/api/todo', payload);
};

export const getTodos = (query) => {
  return apiCall.post('/api/todo/query', queryBuilder(query));
};

export const getPriorities = () => {
  return apiCall.get('/api/todo/priorities');
};

export const changePriority = (payload) => {
  return apiCall.post('/api/todo/changePriority', payload);
};

export const doneTodo = (id) => {
  return apiCall.get(`/api/todo/${id}/done`);
};

export const unDoneTodo = (id) => {
  return apiCall.get(`/api/todo/${id}/undone`);
};

export const getTodo = (id) => {
  return apiCall.get(`/api/todo/${id}`);
};

export const deleteTodo = (id) => {
  return apiCall.delete(`/api/todo/${id}`);
};

