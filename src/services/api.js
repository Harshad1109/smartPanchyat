import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding the bearer token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally 
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // You could handle 401 unauthorized errors here by logging the user out
    if (error.response && error.response.status === 401) {
        // e.g., localStorage.removeItem('token');
        // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  getMe: () => api.get('/auth/me'),
};

export const grievanceService = {
  create: (formData) => api.post('/grievances', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getAll: (params) => api.get('/grievances', { params }),
  getById: (id) => api.get(`/grievances/${id}`),
  updateStatus: (id, status) => api.put(`/grievances/${id}/status`, { status }),
};

export default api;
