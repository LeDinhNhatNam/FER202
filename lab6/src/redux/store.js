// store.js - Redux Store Configuration với Redux Toolkit
// Tích hợp tất cả slices: auth, users, payments

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import usersReducer from './usersSlice';
import paymentsReducer from './paymentsSlice';

/**
 * Configure Redux Store với Redux Toolkit
 * 
 * Ưu điểm của configureStore:
 * 1. Tự động setup Redux DevTools Extension
 * 2. Tự động thêm redux-thunk middleware
 * 3. Tự động enable Redux DevTools
 * 4. Bật immutability checks và serializability checks trong development
 */
const store = configureStore({
  reducer: {
    auth: authReducer,       // Authentication state
    users: usersReducer,     // Users management state
    payments: paymentsReducer // Payments management state
  },
  
  // Middleware đã được tự động cấu hình bởi RTK
  // Bao gồm: redux-thunk, immutableStateInvariant, serializableStateInvariant
  
  // DevTools đã được tự động enable trong development mode
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

/**
 * Cấu trúc State Tree:
 * 
 * {
 *   auth: {
 *     isAuthenticated: boolean,
 *     user: object | null,
 *     isLoading: boolean,
 *     error: string | null
 *   },
 *   users: {
 *     list: array,
 *     isLoading: boolean,
 *     error: string | null
 *   },
 *   payments: {
 *     list: array,
 *     isLoading: boolean,
 *     error: string | null,
 *     filters: {
 *       searchTerm: string,
 *       semester: string,
 *       course: string,
 *       sortBy: string
 *     }
 *   }
 * }
 */

/**
 * Export RootState type cho TypeScript (nếu cần)
 */
export const getState = () => store.getState();
