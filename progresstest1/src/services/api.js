import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (credentials) => {
    try {
      const response = await api.get('/users');
      const accounts = response.data;
      
      const user = accounts.find(account => 
        account.username === credentials.username &&
        account.password === credentials.password
      );
      
      if (user) {
        const token = btoa(`${user.username}:${Date.now()}`); // Simple token generation
        return {
          user: {
            id: user.id,
            username: user.username,
            email: user.email || '',
            fullName: user.fullName,
            role: user.role || 'student'
          },
          token
        };
      } else {
        throw new Error('Invalid username/email or password!');
      }
    } catch (error) {
      throw error;
    }
  }
};

// Payments API
export const paymentsAPI = {
  getPayments: async (userId) => {
    try {
      const response = await api.get(`/payments?userId=${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getAllPayments: async () => {
    try {
      const response = await api.get('/payments');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Semesters API
export const semestersAPI = {
  getSemesters: async () => {
    try {
      // Get unique semesters from payments data
      const response = await api.get('/payments');
      const payments = response.data;
      const uniqueSemesters = [...new Set(payments.map(payment => payment.semester))];
      return uniqueSemesters;
    } catch (error) {
      // Fallback to hardcoded values if API fails
      return ["Fall 2025", "Spring 2026", "Summer 2026"];
    }
  }
};

export default api;