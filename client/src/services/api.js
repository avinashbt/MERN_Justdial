import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
  getMe: () => API.get('/auth/me'),
  getUsers: () => API.get('/auth/users'),
  deleteUser: (id) => API.delete(`/auth/users/${id}`),
};

export const businessAPI = {
  getAll: (params) => API.get('/businesses', { params }),
  getOne: (id) => API.get(`/businesses/${id}`),
  create: (data) => API.post('/businesses', data),
  update: (id, data) => API.put(`/businesses/${id}`, data),
  delete: (id) => API.delete(`/businesses/${id}`),
  getMine: () => API.get('/businesses/user/mine'),
  getAllAdmin: () => API.get('/businesses/admin/all'),
};

export const categoryAPI = {
  getAll: () => API.get('/categories'),
  create: (data) => API.post('/categories', data),
  update: (id, data) => API.put(`/categories/${id}`, data),
  delete: (id) => API.delete(`/categories/${id}`),
};

export default API;
