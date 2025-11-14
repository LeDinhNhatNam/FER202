// usersSlice.js - Bài tập 1: Quản Lý Người Dùng (Users)
// Sử dụng Redux Toolkit để quản lý state người dùng

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../services/api';

// ==================== INITIAL STATE ====================
// Câu 5: User State Initialization
const initialState = {
  list: [],        // Danh sách người dùng
  isLoading: false, // Trạng thái đang tải
  error: null      // Thông báo lỗi
};

// ==================== ASYNC THUNKS ====================

/**
 * Bài tập 1.2 - Xử lý Thao tác Đọc
 * Fetch danh sách users từ API
 * 3 trạng thái: pending, fulfilled, rejected
 */
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const users = await api.getUsers();
      return users;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Fetch user theo ID
 */
export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (userId, { rejectWithValue }) => {
    try {
      const user = await api.getUserById(userId);
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Update user information
 */
export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const updatedUser = await api.updateUser(userId, userData);
      return updatedUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Ban user (khóa tài khoản)
 */
export const banUser = createAsyncThunk(
  'users/banUser',
  async (userId, { rejectWithValue }) => {
    try {
      const updatedUser = await api.banUser(userId);
      return updatedUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Unban user (mở khóa tài khoản)
 */
export const unbanUser = createAsyncThunk(
  'users/unbanUser',
  async (userId, { rejectWithValue }) => {
    try {
      const updatedUser = await api.unbanUser(userId);
      return updatedUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ==================== SLICE ====================

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    /**
     * Bài tập 1.3 - Thao tác Cục bộ
     * Toggle Admin Status - Reducer đồng bộ
     * Thay đổi role của user giữa 'admin' và 'user'
     */
    toggleAdminStatus: (state, action) => {
      const userId = action.payload;
      const user = state.list.find(u => u.id === userId);
      if (user) {
        // Immer cho phép "mutate" trực tiếp
        user.role = user.role === 'admin' ? 'user' : 'admin';
      }
    },

    /**
     * Clear error message
     */
    clearError: (state) => {
      state.error = null;
    },

    /**
     * Clear users list
     */
    clearUsers: (state) => {
      state.list = [];
      state.error = null;
    }
  },

  /**
   * Bài tập 1.2 - Extra Reducers
   * Xử lý 3 trạng thái (pending, fulfilled, rejected) cho async thunks
   */
  extraReducers: (builder) => {
    builder
      // ========== FETCH USERS ==========
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch users';
      })

      // ========== FETCH USER BY ID ==========
      .addCase(fetchUserById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        // Cập nhật user trong list nếu đã tồn tại, hoặc thêm mới
        const index = state.list.findIndex(u => u.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        } else {
          state.list.push(action.payload);
        }
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch user';
      })

      // ========== UPDATE USER ==========
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.list.findIndex(u => u.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to update user';
      })

      // ========== BAN USER ==========
      .addCase(banUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(banUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.list.findIndex(u => u.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(banUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to ban user';
      })

      // ========== UNBAN USER ==========
      .addCase(unbanUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(unbanUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.list.findIndex(u => u.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(unbanUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to unban user';
      });
  }
});

// ==================== EXPORTS ====================

// Export actions
export const { toggleAdminStatus, clearError, clearUsers } = usersSlice.actions;

// Export selectors
export const selectUsers = (state) => state.users.list;
export const selectUsersLoading = (state) => state.users.isLoading;
export const selectUsersError = (state) => state.users.error;

// Selector lọc users theo role
export const selectUsersByRole = (state, role) => 
  state.users.list.filter(user => user.role === role);

// Selector lọc users theo status
export const selectUsersByStatus = (state, status) => 
  state.users.list.filter(user => user.status === status);

// Export reducer
export default usersSlice.reducer;
