// authSlice.js - Quản lý Authentication với Redux Toolkit
// Thay thế AuthContext từ progress-test1

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../services/api';

// ==================== INITIAL STATE ====================

const initialState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
};

// ==================== ASYNC THUNKS ====================

/**
 * Login async thunk
 */
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const user = await api.login(credentials);
      // Lưu user vào localStorage
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      if (error.status) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

// ==================== SLICE ====================

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Logout action
     */
    logout: (state) => {
      localStorage.removeItem('user');
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },

    /**
     * Clear error
     */
    clearError: (state) => {
      state.error = null;
    },

    /**
     * Restore user from localStorage (khi reload page)
     */
    restoreUser: (state) => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          state.user = JSON.parse(storedUser);
          state.isAuthenticated = true;
        } catch (error) {
          localStorage.removeItem('user');
        }
      }
    }
  },

  extraReducers: (builder) => {
    builder
      // ========== LOGIN ==========
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload || 'Login failed';
      });
  }
});

// ==================== EXPORTS ====================

// Export actions
export const { logout, clearError, restoreUser } = authSlice.actions;

// Export selectors
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectCurrentUser = (state) => state.auth.user;
export const selectAuthLoading = (state) => state.auth.isLoading;
export const selectAuthError = (state) => state.auth.error;

// Export reducer
export default authSlice.reducer;
