import axios from 'axios';

/**
 * @service api
 * @summary Centralized Axios instance for API communication.
 * @description Configures base URL, headers, and error handling for all
 * HTTP requests to the backend.
 */
const api = axios.create({
  baseURL: '/api/v1', // Proxied by Vite to http://localhost:3000/api/v1
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    // In a real app, get the token from a secure storage
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Interceptor for response error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors like 401 Unauthorized, 403 Forbidden, etc.
    if (error.response?.status === 401) {
      // e.g., redirect to login
      console.error('Unauthorized access - redirecting to login.');
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default api;
