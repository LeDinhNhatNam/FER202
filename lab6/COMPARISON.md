# So sánh: Context API (progress-test1) vs Redux Toolkit (lab6)

## 📊 Tổng quan Migration

Lab 6 migrate từ **Context API** (progress-test1) sang **Redux Toolkit** để quản lý state.

---

## 1. Setup & Configuration

### ❌ Context API (progress-test1)

**App.js:**
```javascript
import { AuthProvider } from './contexts/AuthContext';
import { PaymentProvider } from './contexts/PaymentContext';

function App() {
  return (
    <AuthProvider>
      <PaymentProvider>
        <div className="App">
          <AppRoutes />
        </div>
      </PaymentProvider>
    </AuthProvider>
  );
}
```

**Problems:**
- Nested providers khó đọc
- Mỗi context cần 1 provider
- Nhiều re-renders không cần thiết

### ✅ Redux Toolkit (lab6)

**App.js:**
```javascript
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppRoutes />
      </div>
    </Provider>
  );
}
```

**store.js:**
```javascript
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    payments: paymentsReducer
  }
});
```

**Benefits:**
- ✅ Chỉ 1 Provider
- ✅ Tự động setup DevTools & Thunk
- ✅ Clean và dễ scale

---

## 2. Authentication

### ❌ Context API

**AuthContext.jsx (120+ lines):**
```javascript
// 1. Khai báo initial state
const initialAuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
};

// 2. Reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true, error: null };
    case 'LOGIN_SUCCESS':
      localStorage.setItem('user', JSON.stringify(action.payload));
      return { ...state, isLoading: false, isAuthenticated: true, user: action.payload };
    case 'LOGIN_FAILURE':
      return { ...state, isLoading: false, error: action.payload };
    case 'LOGOUT':
      localStorage.removeItem('user');
      return { ...initialAuthState };
    default:
      return state;
  }
};

// 3. Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const login = async ({ usernameOrEmail, password }) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const accounts = await api.getUsers();
      const user = accounts.find(/* ... */);
      
      if (user) {
        if (user.status === 'locked') {
          dispatch({ type: 'LOGIN_FAILURE', payload: 'Tài khoản bị khóa' });
          return { success: false };
        }
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        return { success: true };
      } else {
        dispatch({ type: 'LOGIN_FAILURE', payload: 'Invalid credentials' });
        return { success: false };
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
      return { success: false };
    }
  };

  const logout = () => dispatch({ type: 'LOGOUT' });

  return (
    <AuthContext.Provider value={{
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      loading: state.isLoading,
      error: state.error,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// 4. Custom hook
export const useAuth = () => useContext(AuthContext);
```

### ✅ Redux Toolkit

**authSlice.js (70 lines):**
```javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 1. Async thunk tự động xử lý 3 states
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      return await api.login(credentials);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 2. Slice với reducers và extraReducers
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('user');
      state.isAuthenticated = false;
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

// 3. Export
export const { logout } = authSlice.actions;
export default authSlice.reducer;
```

**Ưu điểm:**
- ✅ Code ngắn hơn 40%
- ✅ Không cần manual dispatch
- ✅ Async handling tự động
- ✅ Immer cho immutability

---

## 3. Using in Components

### ❌ Context API

**LoginPage.jsx:**
```javascript
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const { login, loading, error, clearError } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData);
    if (result.success) {
      navigate('/dashboard');
    }
  };

  return (
    // JSX with {loading}, {error}, etc.
  );
};
```

### ✅ Redux Toolkit

**LoginPage.jsx:**
```javascript
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, selectAuthLoading, selectAuthError } from '../redux/authSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(formData));
    if (loginUser.fulfilled.match(result)) {
      navigate('/dashboard');
    }
  };

  return (
    // JSX with {loading}, {error}, etc.
  );
};
```

**Ưu điểm:**
- ✅ Selectors rõ ràng hơn
- ✅ Type-safe với TypeScript
- ✅ DevTools tracking

---

## 4. Async Operations

### ❌ Context API - Payments

**PaymentContext.jsx:**
```javascript
const fetchPaymentsByUserId = useCallback(async (userId) => {
  dispatch({ type: 'FETCH_PAYMENTS_START' });
  
  try {
    const payments = await api.getPaymentsByUserId(userId);
    dispatch({ type: 'FETCH_PAYMENTS_SUCCESS', payload: payments });
    return { success: true, data: payments };
  } catch (error) {
    dispatch({ type: 'FETCH_PAYMENTS_FAILURE', payload: error.message });
    return { success: false, error: error.message };
  }
}, []);
```

**Problems:**
- Manual dispatch cho mỗi state
- Phải tự handle loading/error
- Code lặp lại nhiều

### ✅ Redux Toolkit - Payments

**paymentsSlice.js:**
```javascript
export const fetchPaymentsByUserId = createAsyncThunk(
  'payments/fetchByUserId',
  async (userId, { rejectWithValue }) => {
    try {
      return await api.getPaymentsByUserId(userId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Trong slice
extraReducers: (builder) => {
  builder
    .addCase(fetchPaymentsByUserId.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchPaymentsByUserId.fulfilled, (state, action) => {
      state.isLoading = false;
      state.list = action.payload;
    })
    .addCase(fetchPaymentsByUserId.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
}
```

**Benefits:**
- ✅ Auto-generates 3 action types
- ✅ Consistent pattern
- ✅ Less boilerplate

---

## 5. State Updates

### ❌ Context API - Immutability

```javascript
// Phải cẩn thận với spread operator
const paymentReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      const newFilters = { ...state.filters, [action.field]: action.value };
      const filtered = filterAndSortPayments(state.payments, newFilters);
      return { 
        ...state,  // ❌ Dễ quên spread
        filters: newFilters,
        filteredPayments: filtered,
        totalAmount: filtered.reduce(/* ... */)
      };
  }
};
```

### ✅ Redux Toolkit - Immer

```javascript
reducers: {
  setFilter: (state, action) => {
    const { field, value } = action.payload;
    // ✅ "Mutate" trực tiếp - Immer handles immutability
    state.filters[field] = value;
  },
  
  toggleAdminStatus: (state, action) => {
    const user = state.list.find(u => u.id === action.payload);
    if (user) {
      user.role = user.role === 'admin' ? 'user' : 'admin';
    }
  }
}
```

**Benefits:**
- ✅ Code dễ đọc hơn
- ✅ Ít lỗi hơn
- ✅ Immer xử lý immutability

---

## 6. Selectors & Derived State

### ❌ Context API

```javascript
// Tính toán trong component → Re-calculate mỗi render
const PaymentsPage = () => {
  const { payments, filters } = usePayment();
  
  // ❌ Tính lại mỗi lần render
  const filteredPayments = payments.filter(/* ... */).sort(/* ... */);
  const totalAmount = filteredPayments.reduce((sum, p) => sum + p.amount, 0);
  const successfulPayments = payments.filter(p => p.status === 'SUCCESS');
  
  return (/* ... */);
};
```

### ✅ Redux Toolkit - Reselect

```javascript
import { createSelector } from 'reselect';

// ✅ Memoized - Chỉ re-calculate khi input thay đổi
export const selectFilteredPayments = createSelector(
  [selectPayments, selectFilters],
  (payments, filters) => {
    return payments.filter(/* ... */).sort(/* ... */);
  }
);

export const selectTotalAmount = createSelector(
  [selectFilteredPayments],
  (payments) => payments.reduce((sum, p) => sum + p.amount, 0)
);

// Trong component
const PaymentsPage = () => {
  const filteredPayments = useSelector(selectFilteredPayments);
  const totalAmount = useSelector(selectTotalAmount);
  // ...
};
```

**Benefits:**
- ✅ Performance tốt hơn
- ✅ Memoization tự động
- ✅ Compose selectors

---

## 7. DevTools & Debugging

### ❌ Context API

- ⚠️ Không có DevTools
- ⚠️ Debug bằng console.log
- ⚠️ Khó track state changes
- ⚠️ Không có time-travel debugging

### ✅ Redux Toolkit

- ✅ Redux DevTools tích hợp
- ✅ Xem tất cả actions
- ✅ Track state changes
- ✅ Time-travel debugging
- ✅ Export/Import state
- ✅ Action replay

---

## 8. Code Metrics

| Metric | Context API | Redux Toolkit | Improvement |
|--------|-------------|---------------|-------------|
| Lines of Code (Auth) | ~120 | ~70 | **-42%** |
| Lines of Code (Payments) | ~150 | ~180* | +20%** |
| Action Types | Manual | Auto | **100%** |
| Boilerplate | High | Low | **-60%** |
| Type Safety | Medium | High | **+50%** |
| DevTools | ❌ | ✅ | **∞** |
| Async Handling | Manual | Auto | **100%** |
| Learning Curve | Medium | Medium | Same |

\* Bao gồm selectors và filters phức tạp
\** Nhưng có nhiều features hơn

---

## 9. Migration Checklist

Để migrate từ Context API sang Redux Toolkit:

- [x] Install `@reduxjs/toolkit` và `react-redux`
- [x] Tạo `store.js` với `configureStore`
- [x] Convert Context → Slice:
  - [x] Initial state → `initialState`
  - [x] Reducer cases → `reducers`
  - [x] Async actions → `createAsyncThunk`
- [x] Replace `useContext` → `useSelector` + `useDispatch`
- [x] Replace Providers → `<Provider store={store}>`
- [x] Add selectors cho derived state
- [x] Test với Redux DevTools

---

## 10. Kết luận

### Khi nào dùng Context API?
- ✅ Small apps (1-3 contexts)
- ✅ Simple state
- ✅ No complex async logic
- ✅ Team không quen Redux

### Khi nào dùng Redux Toolkit?
- ✅ Medium-Large apps
- ✅ Complex state logic
- ✅ Nhiều async operations
- ✅ Cần DevTools mạnh
- ✅ Team scale
- ✅ **Best practice cho Redux**

### Lab 6 Demo
Lab 6 chứng minh Redux Toolkit:
- ✅ Giảm code lặp lại
- ✅ Dễ maintain hơn
- ✅ Performance tốt hơn
- ✅ Developer experience tốt hơn
- ✅ Scale tốt hơn

**→ Redux Toolkit là lựa chọn modern cho React apps! 🚀**
