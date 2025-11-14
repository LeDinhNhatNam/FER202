//api.js - API service cho Lab 6 Redux Toolkit
import axios from 'axios';

// Cấu hình Base URL cho JSON Server
const API = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ==================== USER APIs ====================

/**
 * Lấy danh sách tất cả users
 */
export const getUsers = async () => {
  try {
    const response = await API.get('/users');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch users');
  }
};

/**
 * Lấy thông tin user theo ID
 */
export const getUserById = async (userId) => {
  try {
    const response = await API.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch user');
  }
};

/**
 * Cập nhật thông tin user
 */
export const updateUser = async (userId, userData) => {
  try {
    const response = await API.patch(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update user');
  }
};

/**
 * Toggle admin status của user
 */
export const toggleUserAdminStatus = async (userId, currentRole) => {
  try {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    const response = await API.patch(`/users/${userId}`, { role: newRole });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to toggle admin status');
  }
};

/**
 * Ban user (khóa tài khoản)
 */
export const banUser = async (userId) => {
  try {
    const response = await API.patch(`/users/${userId}`, { status: 'locked' });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to ban user');
  }
};

/**
 * Unban user (mở khóa tài khoản)
 */
export const unbanUser = async (userId) => {
  try {
    const response = await API.patch(`/users/${userId}`, { status: 'active' });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to unban user');
  }
};

// ==================== PAYMENT APIs ====================

/**
 * Lấy tất cả payments
 */
export const getPayments = async () => {
  try {
    const response = await API.get('/payments');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch payments');
  }
};

/**
 * Lấy payments theo userId
 */
export const getPaymentsByUserId = async (userId) => {
  try {
    const response = await API.get(`/payments?userId=${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch payments for user');
  }
};

/**
 * Tạo payment mới
 * Bài tập 2.1 - Thao tác Ghi
 */
export const createPayment = async (paymentData) => {
  try {
    const response = await API.post('/payments', paymentData);
    return response.data;
  } catch (error) {
    // Xử lý lỗi 402 Payment Required
    if (error.response?.status === 402) {
      throw { 
        status: 402, 
        message: 'Tài khoản không đủ tiền',
        data: error.response.data 
      };
    }
    throw new Error(error.response?.data?.message || 'Failed to create payment');
  }
};

/**
 * Cập nhật payment
 */
export const updatePayment = async (paymentId, paymentData) => {
  try {
    const response = await API.patch(`/payments/${paymentId}`, paymentData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update payment');
  }
};

/**
 * Xóa payment
 */
export const deletePayment = async (paymentId) => {
  try {
    await API.delete(`/payments/${paymentId}`);
    return paymentId;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete payment');
  }
};

/**
 * Hoàn tiền (Refund) - Ví dụ cho câu 4
 */
export const refundPayment = async (paymentId) => {
  try {
    const response = await API.patch(`/payments/${paymentId}`, { 
      status: 'REFUNDED',
      refundDate: new Date().toISOString()
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to refund payment');
  }
};

// ==================== AUTH APIs ====================

/**
 * Login
 */
export const login = async (credentials) => {
  try {
    const users = await getUsers();
    const user = users.find(
      (u) =>
        (u.username === credentials.usernameOrEmail || 
         u.email === credentials.usernameOrEmail) &&
        u.password === credentials.password
    );

    if (!user) {
      throw { status: 401, message: 'Invalid username/email or password!' };
    }

    if (user.status === 'locked') {
      throw { status: 403, message: 'Tài khoản bị khóa, bạn không có quyền truy cập.' };
    }

    if (user.role !== 'admin' || user.status !== 'active') {
      throw { status: 403, message: 'Bạn không có quyền truy cập vào hệ thống quản lý.' };
    }

    return user;
  } catch (error) {
    if (error.status) throw error;
    throw new Error('Login failed due to a network error.');
  }
};

export default API;
