//api.js chứa các hàm gọi API tới JSON Server
import axios from 'axios';
// Cấu hình Base URL cho JSON Server
// Giả định JSON Server đang chạy trên cổng 3001 
const API = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getUsers = async () => {
    try {
        const response = await API.get('/users');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch users');
    }
};

export const getPayments = async () => {
    try {
        const response = await API.get('/payments');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch payments');
    }
};

export const getPaymentsByUserId = async (userId) => {
    try {
        const response = await API.get(`/payments?userId=${userId}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch payments for user');
    }
};

//2.Các hàm API khác có thể được thêm vào đây

// User Management APIs
export const updateUser = async (userId, userData) => {
    try {
        const response = await API.patch(`/users/${userId}`, userData);
        return response.data;
    } catch (error) {
        throw new Error('Failed to update user');
    }
};

export const banUser = async (userId) => {
    try {
        const response = await API.patch(`/users/${userId}`, { status: 'locked' });
        return response.data;
    } catch (error) {
        throw new Error('Failed to ban user');
    }
};

export const unbanUser = async (userId) => {
    try {
        const response = await API.patch(`/users/${userId}`, { status: 'active' });
        return response.data;
    } catch (error) {
        throw new Error('Failed to unban user');
    }
};

