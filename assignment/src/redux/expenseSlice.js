import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../services/api';

// Async thunks
export const fetchExpenses = createAsyncThunk(
  'expenses/fetchExpenses',
  async (userId) => {
    const data = await api.getExpensesByUserId(userId);
    return data;
  }
);

export const addExpense = createAsyncThunk(
  'expenses/addExpense',
  async (expense) => {
    const data = await api.createExpense(expense);
    return data;
  }
);

export const editExpense = createAsyncThunk(
  'expenses/editExpense',
  async ({ id, expense }) => {
    const data = await api.updateExpense(id, expense);
    return data;
  }
);

export const removeExpense = createAsyncThunk(
  'expenses/removeExpense',
  async (id) => {
    await api.deleteExpense(id);
    return id;
  }
);

const expenseSlice = createSlice({
  name: 'expenses',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add
      .addCase(addExpense.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Edit
      .addCase(editExpense.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // Delete
      .addCase(removeExpense.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export default expenseSlice.reducer;
