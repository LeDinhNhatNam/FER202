# 🎓 Lab 6 - Redux Toolkit - HOÀN THÀNH

## ✅ Tổng quan

Đã tạo xong **Lab 6** - Tìm hiểu về Redux, Redux Thunk và Redux Toolkit dựa trên project **progress-test1**.

## 📂 Cấu trúc Đã tạo

```
lab6/
├── README.md                 ✅ Câu trả lời 5 câu hỏi lý thuyết
├── GUIDE.md                  ✅ Hướng dẫn chi tiết từng bước
├── package.json              ✅ Redux Toolkit + React Redux
├── db-pt2.json              ✅ Database với status field
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
└── src/
    ├── redux/               ⭐ Core Redux Toolkit
    │   ├── store.js        ✅ Store configuration
    │   ├── authSlice.js    ✅ Authentication management
    │   ├── usersSlice.js   ✅ BÀITẬP 1: Users management
    │   └── paymentsSlice.js ✅ BÀITẬP 2: Payments management
    ├── services/
    │   └── api.js          ✅ API calls với error handling
    ├── pages/
    │   ├── LoginPage.jsx   ✅ Login với Redux
    │   ├── DashboardPage.jsx ✅ Dashboard
    │   ├── UsersPage.jsx   ✅ Demo Bài tập 1
    │   └── PaymentsPage.jsx ✅ Demo Bài tập 2
    ├── routes/
    │   └── AppRoutes.jsx   ✅ Protected routes
    ├── App.js              ✅ Redux Provider
    ├── App.css
    ├── index.js
    ├── index.css
    └── ... (other files)
```

## 📝 Câu hỏi Lý thuyết - ĐÃ TRẢ LỜI

### ✅ Câu 1: Redux Thunk là gì?
- Middleware cho phép dispatch functions thay vì objects
- Xử lý async operations (API calls)
- Không thể trong Reducer vì Reducer phải là pure function

### ✅ Câu 2: 3 Ưu điểm Redux Toolkit
1. **Giảm Boilerplate** - Code ngắn hơn nhiều
2. **Immer tích hợp** - "Mutate" state trực tiếp
3. **DevTools & Thunk tự động** - Không cần setup thủ công

### ✅ Câu 3: createSlice vs createReducer
- `createReducer`: Chỉ tạo reducer
- `createSlice`: Tạo cả reducer VÀ actions
- ➡️ `createSlice` được khuyến khích vì DRY và ít lỗi

### ✅ Câu 4: Async Thunk cho Refund
```javascript
export const refundPayment = createAsyncThunk(
  'payments/refund',
  async (paymentId, { rejectWithValue }) => {
    // Implementation
  }
);
```
**3 trạng thái:**
1. `pending` - Đang xử lý
2. `fulfilled` - Thành công
3. `rejected` - Thất bại

### ✅ Câu 5: User State Initialization
```javascript
const initialState = {
  list: [],
  isLoading: false,
  error: null
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  // ...
});
```

## 💪 Bài tập Thực hành - ĐÃ IMPLEMENT

### ✅ Bài tập 1: Quản Lý Người Dùng (Users)

**File:** `src/redux/usersSlice.js`

**Đã implement:**
- ✅ **createSlice** với initial state
- ✅ **createAsyncThunk** - `fetchUsers()` với 3 states
- ✅ **Sync reducer** - `toggleAdminStatus()` (local only)
- ✅ **Async thunks** - `banUser()`, `unbanUser()` (API calls)
- ✅ **extraReducers** - Xử lý pending/fulfilled/rejected
- ✅ **Selectors** - `selectUsers`, `selectUsersByRole`, etc.

**Demo:** `src/pages/UsersPage.jsx`

### ✅ Bài tập 2: Quản Lý Thanh Toán (Payments)

**File:** `src/redux/paymentsSlice.js`

**Đã implement:**
- ✅ **POST operation** - `createPayment()` thêm vào state
- ✅ **Error handling 402** - `rejectWithValue("Tài khoản không đủ tiền")`
- ✅ **Reselect selectors**:
  - `selectSuccessfulPayments` - Lọc status: 'SUCCESS'
  - `selectFilteredAndSortedPayments` - Filter + Sort
  - `selectTotalAmount` - Tính tổng
- ✅ CRUD operations đầy đủ
- ✅ Filters management

**Demo:** `src/pages/PaymentsPage.jsx`

### ✅ Bài tập 3: Redux Toolkit trong Progress-test1

**Đã áp dụng:**
- ✅ Thay thế `AuthContext` → `authSlice`
- ✅ Thay thế `PaymentContext` → `paymentsSlice`
- ✅ Thêm `usersSlice` cho user management
- ✅ `useContext` → `useSelector` + `useDispatch`
- ✅ Context Providers → Redux Provider

## 🚀 Cách Chạy

### Bước 1: Cài đặt
```bash
cd lab6
npm install
```

### Bước 2: Chạy JSON Server (Terminal 1)
```bash
npm run server
```
→ http://localhost:3001

### Bước 3: Chạy React App (Terminal 2)
```bash
npm start
```
→ http://localhost:3000

### Bước 4: Login
- Username: `nam123`
- Password: `123456`

## 🎯 Các Tính năng Đã Implement

### Authentication
- ✅ Login với Redux Toolkit
- ✅ Logout
- ✅ Protected Routes
- ✅ localStorage persistence

### Users Management (Bài tập 1)
- ✅ Fetch all users
- ✅ Toggle admin status (synchronous)
- ✅ Ban/Unban users (asynchronous)
- ✅ Error handling
- ✅ Loading states

### Payments Management (Bài tập 2)
- ✅ Fetch all payments
- ✅ Create new payment (POST)
- ✅ Delete payment
- ✅ Filter by search term
- ✅ Sort by multiple fields
- ✅ Error handling với 402 status
- ✅ Reselect selectors với memoization
- ✅ Statistics (total amount, successful payments)

## 📊 Redux Toolkit Features Demonstrated

1. ✅ **configureStore** - Store setup tự động
2. ✅ **createSlice** - Tạo reducers + actions
3. ✅ **createAsyncThunk** - Async operations
4. ✅ **extraReducers** - Handle async states
5. ✅ **Immer** - Mutate state trực tiếp
6. ✅ **createSelector** (Reselect) - Memoization
7. ✅ **rejectWithValue** - Custom error handling
8. ✅ **Redux DevTools** - Debug state

## 🔍 So sánh: Context API vs Redux Toolkit

| Feature | Context API | Redux Toolkit |
|---------|-------------|---------------|
| Boilerplate | Nhiều | Ít hơn nhiều |
| Action Types | Manual | Auto-generated |
| Async Handling | Tự code | createAsyncThunk |
| Immutability | Spread operator | Immer (mutate-like) |
| DevTools | Không có | Mạnh mẽ |
| Performance | OK | Tốt hơn |
| Code Length | Dài | Ngắn gọn |

## 📚 Files Quan trọng

1. **README.md** - Câu trả lời 5 câu hỏi lý thuyết chi tiết
2. **GUIDE.md** - Hướng dẫn từng bước, troubleshooting
3. **src/redux/usersSlice.js** - Bài tập 1 implementation
4. **src/redux/paymentsSlice.js** - Bài tập 2 implementation
5. **src/pages/UsersPage.jsx** - Demo Bài tập 1
6. **src/pages/PaymentsPage.jsx** - Demo Bài tập 2

## 🎓 Kiến thức Đã học

### Redux Core Concepts
- ✅ Store, State, Actions, Reducers
- ✅ Middleware (Redux Thunk)
- ✅ Async operations
- ✅ State immutability

### Redux Toolkit
- ✅ Modern Redux patterns
- ✅ Reduced boilerplate
- ✅ Immer integration
- ✅ Best practices

### Reselect
- ✅ Memoized selectors
- ✅ Performance optimization
- ✅ Derived state

## 🎉 Hoàn thành

Lab 6 đã được tạo hoàn chỉnh với:
- ✅ Tất cả câu hỏi lý thuyết
- ✅ Tất cả bài tập thực hành
- ✅ Code hoàn chỉnh có thể chạy
- ✅ Hướng dẫn chi tiết
- ✅ Demo pages đầy đủ
- ✅ Comments giải thích code

**Chúc bạn học tốt Redux Toolkit! 🚀**

---

📌 **Ghi chú:** 
- Mở Redux DevTools (F12 > Redux tab) để xem state changes
- Thử dispatch các actions khác nhau
- Quan sát 3 states (pending/fulfilled/rejected)
- Experiment với selectors và filters
