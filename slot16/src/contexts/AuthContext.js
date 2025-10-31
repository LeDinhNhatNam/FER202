import React, { createContext, useContext, useReducer, useEffect } from 'react';
import movieApi from '../api/movieAPI';

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  showWelcome: false
};

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
        error: null,
        showWelcome: true
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
        error: null,
        showWelcome: false
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    case 'HIDE_WELCOME':
      return {
        ...state,
        showWelcome: false
      };
    case 'RESTORE_SESSION':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        showWelcome: false
      };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

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

  const login = async (loginField, password) => {
    dispatch({ type: 'LOGIN_START' });

    try {
      const response = await movieApi.get('/accounts');
      const accounts = response.data;

      // Tìm user bằng email hoặc username
      const user = accounts.find(
        account => (account.email === loginField || account.username === loginField) && 
                   account.password === password
      );

      if (!user) {
        throw new Error('Email/Username hoặc mật khẩu không đúng!');
      }

      if (user.status === 'locked') {
        throw new Error('Tài khoản đã bị khóa!');
      }

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

  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const hideWelcome = () => {
    dispatch({ type: 'HIDE_WELCOME' });
  };

  const value = {
    ...state,
    login,
    logout,
    clearError,
    hideWelcome
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth phải được sử dụng trong AuthProvider');
  }
  return context;
}

export default AuthContext;