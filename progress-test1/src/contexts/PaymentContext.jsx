//PaymentContext.jsx quản lý thanh toán bằng Context API và useReducer
import React, { createContext, useContext, useReducer, useCallback } from 'react';
import * as api from '../services/api';

// 1. Tạo Context
const PaymentContext = createContext();

// 2. Khai báo Trạng thái khởi tạo Initial State
const initialPaymentState = {
    payments: [],
    filteredPayments: [],
    isLoading: false,
    error: null,
    filters: {
        searchTerm: '',
        semester: '',
        course: '',
        sortBy: 'date_desc'
    },
    totalAmount: 0
};

// 3. Tạo hàm reduce để quản lý các hành động liên quan đến thanh toán
const paymentReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_PAYMENTS_START':
            return { ...state, isLoading: true, error: null };
        case 'FETCH_PAYMENTS_SUCCESS':
            return { 
                ...state, 
                isLoading: false, 
                payments: action.payload,
                filteredPayments: action.payload,
                totalAmount: action.payload.reduce((sum, payment) => sum + payment.amount, 0)
            };
        case 'FETCH_PAYMENTS_FAILURE':
            return { ...state, isLoading: false, error: action.payload };
        case 'SET_FILTER':
            const newFilters = { ...state.filters, [action.field]: action.value };
            const filtered = filterAndSortPayments(state.payments, newFilters);
            return { 
                ...state, 
                filters: newFilters,
                filteredPayments: filtered,
                totalAmount: filtered.reduce((sum, payment) => sum + payment.amount, 0)
            };
        case 'CLEAR_ERROR':
            return { ...state, error: null };
        default:
            return state;
    }
};

// 4. Hàm helper để filter và sort payments
const filterAndSortPayments = (payments, filters) => {
    let filtered = [...payments];

    // Filter by search term
    if (filters.searchTerm) {
        filtered = filtered.filter(payment => 
            payment.semester.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
            payment.courseName.toLowerCase().includes(filters.searchTerm.toLowerCase())
        );
    }

    // Filter by semester
    if (filters.semester) {
        filtered = filtered.filter(payment => payment.semester === filters.semester);
    }

    // Filter by course
    if (filters.course) {
        filtered = filtered.filter(payment => payment.courseName === filters.course);
    }

    // Sort payments
    filtered.sort((a, b) => {
        switch (filters.sortBy) {
            case 'course_asc':
                return a.courseName.localeCompare(b.courseName);
            case 'course_desc':
                return b.courseName.localeCompare(a.courseName);
            case 'date_asc':
                return new Date(a.date) - new Date(b.date);
            case 'date_desc':
                return new Date(b.date) - new Date(a.date);
            case 'amount_asc':
                return a.amount - b.amount;
            case 'amount_desc':
                return b.amount - a.amount;
            default:
                return new Date(b.date) - new Date(a.date);
        }
    });

    return filtered;
};

// 5. Tạo PaymentProvider để cung cấp Context cho các component con
export const PaymentProvider = ({ children }) => {
    const [state, dispatch] = useReducer(paymentReducer, initialPaymentState);

    // Hàm action để xóa lỗi
    const clearError = useCallback(() => {
        dispatch({ type: 'CLEAR_ERROR' });
    }, []);

    // Hàm fetch payments cho user cụ thể
    const fetchPaymentsByUserId = useCallback(async (userId) => {
        dispatch({ type: 'FETCH_PAYMENTS_START' });
        
        try {
            const payments = await api.getPaymentsByUserId(userId);
            dispatch({ type: 'FETCH_PAYMENTS_SUCCESS', payload: payments });
            return { success: true, data: payments };
        } catch (error) {
            const errorMessage = error.message || 'Failed to fetch payments.';
            dispatch({ type: 'FETCH_PAYMENTS_FAILURE', payload: errorMessage });
            return { success: false, error: errorMessage };
        }
    }, []);

    // Hàm fetch tất cả payments
    const fetchAllPayments = useCallback(async () => {
        dispatch({ type: 'FETCH_PAYMENTS_START' });
        
        try {
            const payments = await api.getPayments();
            dispatch({ type: 'FETCH_PAYMENTS_SUCCESS', payload: payments });
            return { success: true, data: payments };
        } catch (error) {
            const errorMessage = error.message || 'Failed to fetch payments.';
            dispatch({ type: 'FETCH_PAYMENTS_FAILURE', payload: errorMessage });
            return { success: false, error: errorMessage };
        }
    }, []);

    // Hàm set filter
    const setFilter = useCallback((field, value) => {
        dispatch({ type: 'SET_FILTER', field, value });
    }, []);

    // 6. Cung cấp trực tiếp các giá trị cần thiết qua Context value
    const contextValue = {
        // Trạng thái từ Reducer
        payments: state.payments,
        filteredPayments: state.filteredPayments,
        isLoading: state.isLoading,
        error: state.error,
        filters: state.filters,
        totalAmount: state.totalAmount,
        
        // Actions
        fetchPaymentsByUserId,
        fetchAllPayments,
        setFilter,
        clearError,
    };

    return (
        <PaymentContext.Provider value={contextValue}>
            {children}
        </PaymentContext.Provider>
    );
};

// 7. Tạo custom hook để sử dụng PaymentContext dễ dàng hơn
export const usePayment = () => useContext(PaymentContext);