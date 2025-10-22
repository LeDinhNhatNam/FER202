import React, { createContext, useContext, useReducer } from 'react';

// Mock data thay thế cho API call
const mockAccounts = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    password: '123456',
    role: 'admin',
    status: 'active'
  },
  {
    id: 2,
    username: 'user1',
    email: 'user1@example.com',
    password: '123456',
    role: 'user',
    status: 'active'
  },
  {
    id: 3,
    username: 'user2',
    email: 'user2@example.com',
    password: '123456',
    role: 'user',
    status: 'locked'
  }
];

// Bước 1: Khai báo AuthContext
const AuthContext = createContext();

// Bước 2: Initial state cho useReducer
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

// Bước 3: Auth reducer để quản lý trạng thái authentication
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
    default:
      return state;
  }
}

// Bước 4: AuthProvider component
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Bước 5: Login function - chỉ cho phép admin đăng nhập
  const login = async (email, password) => {
    dispatch({ type: 'LOGIN_START' });

    try {
      // Tìm user trong mock data
      const user = mockAccounts.find(
        account => account.email === email && account.password === password
      );

      if (!user) {
        throw new Error('Email hoặc mật khẩu không đúng!');
      }

      if (user.status === 'locked') {
        throw new Error('Tài khoản đã bị khóa!');
      }

      if (user.role !== 'admin') {
        throw new Error('Chỉ admin mới được phép đăng nhập!');
      }

      // Đăng nhập thành công
      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: user 
      });

      return { success: true, user };
    } catch (error) {
      dispatch({ 
        type: 'LOGIN_FAILURE', 
        payload: error.message 
      });
      return { success: false, error: error.message };
    }
  };

  // Bước 6: Logout function
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  // Bước 7: Clear error function
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // Bước 8: Context value
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

// Bước 9: Custom hook để sử dụng AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth phải được sử dụng trong AuthProvider');
  }
  return context;
}

export default AuthContext;