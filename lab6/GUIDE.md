# Lab 6 - Hướng dẫn Chi tiết

## 📚 Tổng quan

Lab 6 thực hành **Redux Toolkit** - cách hiện đại và được khuyến nghị để sử dụng Redux trong React applications. Lab này migrate từ Context API (progress-test1) sang Redux Toolkit.

## 🎯 Mục tiêu học tập

1. Hiểu về Redux Thunk và vai trò của nó
2. Nắm vững ưu điểm của Redux Toolkit so với Redux thuần
3. Sử dụng `createSlice`, `createAsyncThunk`, và `createSelector`
4. Xử lý async operations và error handling
5. Áp dụng Redux Toolkit vào project thực tế

## 📁 Cấu trúc Project

```
lab6/
├── README.md                  # Câu trả lời lý thuyết
├── GUIDE.md                   # File này - Hướng dẫn chi tiết
├── package.json
├── db-pt2.json               # JSON Server database
├── public/
└── src/
    ├── redux/                # ⭐ Redux Toolkit implementation
    │   ├── store.js         # Store configuration
    │   ├── authSlice.js     # Authentication slice
    │   ├── usersSlice.js    # Users management (Bài tập 1)
    │   └── paymentsSlice.js # Payments management (Bài tập 2)
    ├── services/
    │   └── api.js           # API calls
    ├── pages/
    │   ├── LoginPage.jsx
    │   ├── DashboardPage.jsx
    │   ├── UsersPage.jsx    # Demo Bài tập 1
    │   └── PaymentsPage.jsx # Demo Bài tập 2
    ├── routes/
    │   └── AppRoutes.jsx
    ├── App.js               # Redux Provider
    └── index.js
```

## 🚀 Cài đặt và Chạy

### Bước 1: Cài đặt dependencies

```bash
cd lab6
npm install
```

### Bước 2: Chạy JSON Server (Terminal 1)

```bash
npm run server
```

JSON Server sẽ chạy tại: http://localhost:3001

### Bước 3: Chạy React App (Terminal 2)

```bash
npm start
```

React App sẽ chạy tại: http://localhost:3000

### Bước 4: Login

- Username: `nam123`
- Password: `123456`

## 📖 Chi tiết Implementation

### 1. Redux Store Configuration

**File: `src/redux/store.js`**

```javascript
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    payments: paymentsReducer
  }
  // Redux Thunk, DevTools đã tự động được cấu hình
});
```

**Ưu điểm:**
- ✅ Tự động setup Redux DevTools
- ✅ Tự động thêm redux-thunk middleware
- ✅ Immutability và serializability checks trong dev mode

### 2. Bài tập 1: Users Management

**File: `src/redux/usersSlice.js`**

#### 2.1 Async Thunks (Thao tác Đọc)

```javascript
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
```

**3 trạng thái tự động:**
- `users/fetchUsers/pending` - Đang loading
- `users/fetchUsers/fulfilled` - Thành công
- `users/fetchUsers/rejected` - Lỗi

#### 2.2 Synchronous Reducer (Thao tác Cục bộ)

```javascript
reducers: {
  toggleAdminStatus: (state, action) => {
    const userId = action.payload;
    const user = state.list.find(u => u.id === userId);
    if (user) {
      // Immer cho phép "mutate" trực tiếp
      user.role = user.role === 'admin' ? 'user' : 'admin';
    }
  }
}
```

**Demo trong UsersPage:**
- Fetch users từ API
- Toggle admin status (local only)
- Ban/Unban users (API calls)

### 3. Bài tập 2: Payments Management

**File: `src/redux/paymentsSlice.js`**

#### 3.1 Create Payment (POST)

```javascript
export const createPayment = createAsyncThunk(
  'payments/createPayment',
  async (paymentData, { rejectWithValue }) => {
    try {
      const newPayment = await api.createPayment(paymentData);
      return newPayment;
    } catch (error) {
      // Xử lý lỗi 402
      if (error.status === 402) {
        return rejectWithValue('Tài khoản không đủ tiền');
      }
      return rejectWithValue(error.message);
    }
  }
);
```

#### 3.2 Error Handling với 402

```javascript
.addCase(createPayment.rejected, (state, action) => {
  state.isLoading = false;
  state.error = action.payload; // "Tài khoản không đủ tiền"
})
```

#### 3.3 Reselect Selectors

```javascript
import { createSelector } from 'reselect';

// Selector với memoization
export const selectSuccessfulPayments = createSelector(
  [selectPayments],
  (payments) => payments.filter(payment => payment.status === 'SUCCESS')
);

// Selector với filtering và sorting
export const selectFilteredAndSortedPayments = createSelector(
  [selectPayments, selectPaymentsFilters],
  (payments, filters) => {
    // Complex logic here
    return filteredAndSorted;
  }
);
```

**Ưu điểm của Reselect:**
- ✅ Memoization - Chỉ tính toán lại khi input thay đổi
- ✅ Performance tốt hơn
- ✅ Có thể compose selectors

### 4. Using Redux trong Components

#### 4.1 Thay thế useContext bằng useSelector

**BEFORE (Context API):**
```javascript
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const { login, loading, error } = useAuth();
  // ...
}
```

**AFTER (Redux):**
```javascript
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, selectAuthLoading, selectAuthError } from '../redux/authSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  
  const handleLogin = () => {
    dispatch(loginUser(credentials));
  };
}
```

#### 4.2 Dispatch Actions

```javascript
// Sync action
dispatch(toggleAdminStatus(userId));

// Async thunk
const result = await dispatch(fetchUsers());
if (fetchUsers.fulfilled.match(result)) {
  // Success
}
```

## 🔍 So sánh: Context API vs Redux Toolkit

### Context API (progress-test1)

```javascript
// AuthContext.jsx
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true };
    case 'LOGIN_SUCCESS':
      return { ...state, user: action.payload, isLoading: false };
    // ...
  }
};

// Manual action creators
const login = async (credentials) => {
  dispatch({ type: 'LOGIN_START' });
  try {
    const user = await api.login(credentials);
    dispatch({ type: 'LOGIN_SUCCESS', payload: user });
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILURE', payload: error });
  }
};

// App.js
<AuthProvider>
  <PaymentProvider>
    <App />
  </PaymentProvider>
</AuthProvider>
```

### Redux Toolkit (lab6)

```javascript
// authSlice.js
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null; // Immer handles immutability
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      });
  }
});

// Async thunk tự động xử lý 3 states
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials) => await api.login(credentials)
);

// App.js
<Provider store={store}>
  <App />
</Provider>
```

**Ưu điểm Redux Toolkit:**
1. ✅ Code ngắn gọn hơn nhiều
2. ✅ Không cần định nghĩa action types
3. ✅ Async handling tự động
4. ✅ Immer tích hợp
5. ✅ DevTools mạnh mẽ
6. ✅ TypeScript support tốt hơn

## 🛠️ Redux DevTools

Cài đặt extension: [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/)

**Các tính năng:**
- 📊 Xem state tree
- 🔍 Theo dõi actions
- ⏮️ Time-travel debugging
- 📸 Export/Import state

## 📝 Bài tập Thực hành

### Bài tập 1: Users Management ✅

**Đã implement trong `usersSlice.js`:**
- [x] Fetch users (async thunk)
- [x] Toggle admin status (sync reducer)
- [x] Ban/Unban users (async thunks)
- [x] Error handling với 3 states

**Demo:** Vào trang `/users`

### Bài tập 2: Payments Management ✅

**Đã implement trong `paymentsSlice.js`:**
- [x] Create payment (POST)
- [x] Error handling với status 402
- [x] Reselect selectors
- [x] Filter và sort

**Demo:** Vào trang `/payments`

### Bài tập 3: Tự thực hành

Hãy thử:

1. **Thêm Update Payment**
   - Tạo async thunk `updatePayment`
   - Thêm modal edit payment
   - Handle trong extraReducers

2. **Thêm Filter cho Users**
   - Filter by role (admin/user)
   - Filter by status (active/locked)
   - Sử dụng reselect

3. **Thêm Statistics**
   - Tổng số users active/locked
   - Tổng số payments theo status
   - Sử dụng selectors

## 🐛 Troubleshooting

### JSON Server không chạy

```bash
# Kiểm tra port 3001 có bị chiếm không
netstat -ano | findstr :3001

# Hoặc dùng port khác
json-server --watch db-pt2.json --port 3002
```

### Redux DevTools không hiển thị

1. Đảm bảo đã cài extension
2. Mở DevTools (F12) > Redux tab
3. Refresh trang

### Actions không dispatch

1. Kiểm tra Redux DevTools xem action có được dispatch không
2. Check console cho errors
3. Verify selectors đang dùng đúng state path

## 📚 Tài liệu Tham khảo

- [Redux Toolkit Official Docs](https://redux-toolkit.js.org/)
- [Redux Thunk](https://github.com/reduxjs/redux-thunk)
- [Reselect](https://github.com/reduxjs/reselect)
- [Immer](https://immerjs.github.io/immer/)

## ✅ Checklist Hoàn thành

- [x] Đọc và hiểu lý thuyết trong README.md
- [x] Cài đặt dependencies
- [x] Chạy JSON Server và React App
- [x] Login thành công
- [x] Test UsersPage - Bài tập 1
- [x] Test PaymentsPage - Bài tập 2
- [x] Mở Redux DevTools và quan sát actions
- [ ] Thực hành thêm các bài tập mở rộng

## 🎉 Kết luận

Lab 6 đã giúp bạn:
- ✅ Hiểu về Redux Thunk và async operations
- ✅ Nắm vững Redux Toolkit
- ✅ Biết cách migrate từ Context API sang Redux
- ✅ Sử dụng Reselect cho performance
- ✅ Error handling với rejectWithValue

**Next steps:**
- Thử implement các features mới
- Tối ưu performance với memoization
- Học TypeScript với RTK
- Tìm hiểu RTK Query cho data fetching

Good luck! 🚀
