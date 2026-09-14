import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://tikhori-server.onrender.com/api' : '/api'),
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    // 1. If explicit Authorization header was already passed by caller, do NOT overwrite it
    if (config.headers?.Authorization) {
      return config;
    }

    // 2. If this is customer user auth endpoint (/auth/user-me, etc.), attach user token
    if (config.url?.includes('/auth/user-me')) {
      const userToken = localStorage.getItem('tikhori_user_token');
      if (userToken) {
        config.headers.Authorization = `Bearer ${userToken}`;
      }
      return config;
    }

    // 3. For admin requests or inside admin portal
    const adminToken = localStorage.getItem('tikhori_admin_token');
    if (adminToken && (
      window.location.pathname.startsWith('/admin') ||
      config.url?.includes('/admin') ||
      config.url?.includes('/users') ||
      config.url?.includes('/auth/me')
    )) {
      config.headers.Authorization = `Bearer ${adminToken}`;
      return config;
    }

    // 4. Default to customer user token if available
    const userToken = localStorage.getItem('tikhori_user_token');
    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for consistent error extraction
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || 'Something went wrong. Please try again.';
    
    if (error.response?.status === 401) {
      // Clear admin token ONLY if explicitly browsing the admin section
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        localStorage.removeItem('tikhori_admin_token');
        localStorage.removeItem('tikhori_admin_user');
        window.location.href = '/admin/login';
      }
    }

    // Wrap error while preserving status and response details
    const customError = new Error(message);
    customError.response = error.response;
    customError.status = error.response?.status;
    return Promise.reject(customError);
  }
);

export default api;
