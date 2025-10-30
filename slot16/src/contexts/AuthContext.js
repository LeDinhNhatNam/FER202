import React, { createContext, useContext, useReducer, useEffect } from 'react';
import api from '../api/api';

// Tạo AuthContext
const AuthContext = createContext();

// Initial state cho useReducer
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

// Auth reducer để quản lý trạng thái authentication
function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    case 'RESTORE_SESSION':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    default:
      return state;
  }
}

// AuthProvider component
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Khôi phục session từ localStorage khi app khởi động
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: 'RESTORE_SESSION', payload: user });
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Login function - gọi API để xác thực
  const login = async (email, password) => {
    dispatch({ type: 'LOGIN_START' });

    try {
      // Gọi API để lấy danh sách accounts
      const response = await api.get('/accounts');
      const accounts = response.data;

      // Tìm user trong dữ liệu từ API
      const user = accounts.find(
        account => account.email === email && account.password === password
      );

      if (!user) {
        throw new Error('Email hoặc mật khẩu không đúng!');
      }

      if (user.status === 'locked') {
        throw new Error('Tài khoản đã bị khóa!');
      }

      // Đăng nhập thành công - lưu user info vào localStorage
      localStorage.setItem('user', JSON.stringify(user));
      
      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: user 
      });

      return { success: true, user };
    } catch (error) {
      const errorMessage = error.response 
        ? 'Không thể kết nối đến server!' 
        : error.message;
      
      dispatch({ 
        type: 'LOGIN_FAILURE', 
        payload: errorMessage 
      });
      return { success: false, error: errorMessage };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  // Clear error function
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // Context value
  const value = {
    ...state,
    login,
    logout,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook để sử dụng AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth phải được sử dụng trong AuthProvider');
  }
  return context;
}

export default AuthContext;