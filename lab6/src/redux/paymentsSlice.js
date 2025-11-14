// paymentsSlice.js - Bài tập 2: Quản Lý Thanh Toán (Payments)
// Sử dụng Redux Toolkit với reselect selectors

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import * as api from '../services/api';

// ==================== INITIAL STATE ====================

const initialState = {
  list: [],        // Danh sách payments
  isLoading: false, // Trạng thái đang tải
  error: null,     // Thông báo lỗi
  filters: {
    searchTerm: '',
    semester: '',
    course: '',
    sortBy: 'date_desc'
  }
};

// ==================== ASYNC THUNKS ====================

/**
 * Fetch tất cả payments
 */
export const fetchPayments = createAsyncThunk(
  'payments/fetchPayments',
  async (_, { rejectWithValue }) => {
    try {
      const payments = await api.getPayments();
      return payments;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Fetch payments theo userId
 */
export const fetchPaymentsByUserId = createAsyncThunk(
  'payments/fetchPaymentsByUserId',
  async (userId, { rejectWithValue }) => {
    try {
      const payments = await api.getPaymentsByUserId(userId);
      return payments;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Bài tập 2.1 - Thao tác Ghi
 * Tạo Payment Mới (POST /api/payments)
 * Nếu thành công, thêm payment mới vào mảng payments trong state
 */
export const createPayment = createAsyncThunk(
  'payments/createPayment',
  async (paymentData, { rejectWithValue }) => {
    try {
      const newPayment = await api.createPayment(paymentData);
      return newPayment;
    } catch (error) {
      /**
       * Bài tập 2.2 - Xử lý Lỗi Tùy chỉnh
       * Nếu API trả về lỗi status code 402 (Payment Required),
       * dispatch action lỗi với thông báo: "Tài khoản không đủ tiền"
       */
      if (error.status === 402) {
        return rejectWithValue('Tài khoản không đủ tiền');
      }
      return rejectWithValue(error.message || 'Failed to create payment');
    }
  }
);

/**
 * Update payment
 */
export const updatePayment = createAsyncThunk(
  'payments/updatePayment',
  async ({ paymentId, paymentData }, { rejectWithValue }) => {
    try {
      const updatedPayment = await api.updatePayment(paymentId, paymentData);
      return updatedPayment;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Delete payment
 */
export const deletePayment = createAsyncThunk(
  'payments/deletePayment',
  async (paymentId, { rejectWithValue }) => {
    try {
      await api.deletePayment(paymentId);
      return paymentId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Câu 4 - Async Thunk cho Refund Payment
 * Hoàn tiền một giao dịch
 */
export const refundPayment = createAsyncThunk(
  'payments/refund',
  async (paymentId, { rejectWithValue }) => {
    try {
      const refundedPayment = await api.refundPayment(paymentId);
      return refundedPayment;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ==================== SLICE ====================

const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    /**
     * Set filter cho payments
     */
    setFilter: (state, action) => {
      const { field, value } = action.payload;
      state.filters[field] = value;
    },

    /**
     * Clear tất cả filters
     */
    clearFilters: (state) => {
      state.filters = {
        searchTerm: '',
        semester: '',
        course: '',
        sortBy: 'date_desc'
      };
    },

    /**
     * Clear error message
     */
    clearError: (state) => {
      state.error = null;
    },

    /**
     * Clear payments list
     */
    clearPayments: (state) => {
      state.list = [];
      state.error = null;
    }
  },

  extraReducers: (builder) => {
    builder
      // ========== FETCH PAYMENTS ==========
      .addCase(fetchPayments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch payments';
      })

      // ========== FETCH PAYMENTS BY USER ID ==========
      .addCase(fetchPaymentsByUserId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPaymentsByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchPaymentsByUserId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch user payments';
      })

      // ========== CREATE PAYMENT (Bài tập 2.1) ==========
      .addCase(createPayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        // Thêm payment mới vào đầu mảng
        state.list.unshift(action.payload);
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.isLoading = false;
        // Bài tập 2.2 - Error message tùy chỉnh
        state.error = action.payload || 'Failed to create payment';
      })

      // ========== UPDATE PAYMENT ==========
      .addCase(updatePayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePayment.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.list.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updatePayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to update payment';
      })

      // ========== DELETE PAYMENT ==========
      .addCase(deletePayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletePayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = state.list.filter(p => p.id !== action.payload);
      })
      .addCase(deletePayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to delete payment';
      })

      // ========== REFUND PAYMENT (Câu 4) ==========
      .addCase(refundPayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(refundPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        // Cập nhật payment đã refund
        const index = state.list.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(refundPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to refund payment';
      });
  }
});

// ==================== EXPORTS ====================

// Export actions
export const { setFilter, clearFilters, clearError, clearPayments } = paymentsSlice.actions;

// ==================== SELECTORS ====================

// Basic selectors
export const selectPayments = (state) => state.payments.list;
export const selectPaymentsLoading = (state) => state.payments.isLoading;
export const selectPaymentsError = (state) => state.payments.error;
export const selectPaymentsFilters = (state) => state.payments.filters;

/**
 * Bài tập 2.3 - Bộ chọn (Selectors)
 * Reselect selector để lấy các thanh toán có status: 'SUCCESS'
 * 
 * Note: Trong db.json hiện tại không có trường status,
 * nhưng đây là ví dụ về cách implement selector với reselect
 */
export const selectSuccessfulPayments = createSelector(
  [selectPayments],
  (payments) => payments.filter(payment => payment.status === 'SUCCESS')
);

/**
 * Selector lấy payments đã refund
 */
export const selectRefundedPayments = createSelector(
  [selectPayments],
  (payments) => payments.filter(payment => payment.status === 'REFUNDED')
);

/**
 * Selector lấy payments theo semester
 */
export const selectPaymentsBySemester = createSelector(
  [selectPayments, (state, semester) => semester],
  (payments, semester) => payments.filter(payment => payment.semester === semester)
);

/**
 * Selector tính tổng amount của tất cả payments
 */
export const selectTotalAmount = createSelector(
  [selectPayments],
  (payments) => payments.reduce((sum, payment) => sum + payment.amount, 0)
);

/**
 * Selector với filtering và sorting
 */
export const selectFilteredAndSortedPayments = createSelector(
  [selectPayments, selectPaymentsFilters],
  (payments, filters) => {
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
  }
);

/**
 * Selector lấy unique semesters
 */
export const selectUniqueSemesters = createSelector(
  [selectPayments],
  (payments) => [...new Set(payments.map(p => p.semester))]
);

/**
 * Selector lấy unique courses
 */
export const selectUniqueCourses = createSelector(
  [selectPayments],
  (payments) => [...new Set(payments.map(p => p.courseName))]
);

// Export reducer
export default paymentsSlice.reducer;
