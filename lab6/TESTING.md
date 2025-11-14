# 🧪 Testing Guide - Lab 6

Hướng dẫn test từng tính năng của Lab 6 Redux Toolkit.

---

## ✅ Checklist Testing

### 1. Setup & Installation

- [ ] Đã cd vào thư mục `lab6`
- [ ] Chạy `npm install` thành công
- [ ] Không có lỗi trong quá trình install

### 2. JSON Server

```bash
npm run server
```

**Kiểm tra:**
- [ ] Server chạy tại http://localhost:3001
- [ ] Mở http://localhost:3001/users → Thấy danh sách users
- [ ] Mở http://localhost:3001/payments → Thấy danh sách payments

### 3. React App

```bash
npm start
```

**Kiểm tra:**
- [ ] App mở tại http://localhost:3000
- [ ] Không có lỗi trong console
- [ ] Hiển thị Login page

---

## 🔐 Test Authentication

### Login Success

**Steps:**
1. Nhập username: `nam123`
2. Nhập password: `123456`
3. Click "Login"

**Expected:**
- [ ] Loading spinner hiện ra
- [ ] Redirect đến `/dashboard`
- [ ] Hiển thị welcome message với tên "Nguyễn Văn Nam"
- [ ] Không có error

**Redux DevTools:**
- [ ] Thấy action `auth/login/pending`
- [ ] Thấy action `auth/login/fulfilled`
- [ ] State `auth.user` có dữ liệu
- [ ] State `auth.isAuthenticated = true`

### Login Failed - Invalid Credentials

**Steps:**
1. Nhập username: `wrong`
2. Nhập password: `wrong`
3. Click "Login"

**Expected:**
- [ ] Hiển thị error: "Invalid username/email or password!"
- [ ] Vẫn ở trang login
- [ ] Error biến mất khi typing

**Redux DevTools:**
- [ ] Thấy action `auth/login/rejected`
- [ ] State `auth.error` chứa error message

### Login Failed - Locked Account

**Steps:**
1. Nhập username: `thanh123` (locked account)
2. Nhập password: `123456`
3. Click "Login"

**Expected:**
- [ ] Error: "Tài khoản bị khóa..."

### Logout

**Steps:**
1. Login thành công
2. Click button "Logout" ở Dashboard

**Expected:**
- [ ] Redirect về trang login
- [ ] localStorage.user bị xóa

**Redux DevTools:**
- [ ] Thấy action `auth/logout`
- [ ] State `auth` reset về initial

---

## 👥 Test Users Management (Bài tập 1)

### Fetch Users

**Steps:**
1. Login và vào `/users`

**Expected:**
- [ ] Loading spinner hiện ra
- [ ] Hiển thị table với 4 users
- [ ] Badge "Total Users: 4"
- [ ] Thông tin users đúng (username, role, status)

**Redux DevTools:**
- [ ] Action `users/fetchUsers/pending`
- [ ] Action `users/fetchUsers/fulfilled`
- [ ] State `users.list` có 4 users

### Toggle Admin Status (Synchronous)

**Steps:**
1. Tìm user "Nguyễn Hải" (role: user)
2. Click button "Toggle Admin"

**Expected:**
- [ ] Badge role đổi từ "user" → "admin"
- [ ] Thay đổi ngay lập tức (không có loading)
- [ ] ⚠️ Chỉ thay đổi trong Redux state (không gọi API)

**Redux DevTools:**
- [ ] Action `users/toggleAdminStatus`
- [ ] Payload = userId
- [ ] State `users.list[1].role` thay đổi

**Test lại:**
3. Click "Toggle Admin" lần nữa

**Expected:**
- [ ] Badge đổi lại về "user"

### Ban User (Asynchronous)

**Steps:**
1. Tìm user "Nguyễn Hải" (status: active)
2. Click button "Ban"

**Expected:**
- [ ] Button disabled khi loading
- [ ] Badge status đổi từ "active" → "locked"
- [ ] Button đổi thành "Unban"
- [ ] ✅ Thay đổi trong database (API call)

**Redux DevTools:**
- [ ] Action `users/banUser/pending`
- [ ] Action `users/banUser/fulfilled`
- [ ] State `users.list[1].status = 'locked'`

**Verify:**
3. Refresh page (F5)
4. Hoặc check http://localhost:3001/users/2

**Expected:**
- [ ] User vẫn bị ban (lưu trong database)

### Unban User

**Steps:**
1. Tìm user đã bị ban
2. Click "Unban"

**Expected:**
- [ ] Status đổi về "active"
- [ ] Button đổi về "Ban"

### Refresh Users

**Steps:**
1. Click button "Refresh"

**Expected:**
- [ ] Loading state
- [ ] Re-fetch users từ server

---

## 💳 Test Payments Management (Bài tập 2)

### Fetch Payments

**Steps:**
1. Login và vào `/payments`

**Expected:**
- [ ] Loading spinner
- [ ] Table hiển thị 6 payments
- [ ] Statistics badges đúng:
  - Total Payments: 6
  - Successful: 5 (có status SUCCESS)
  - Total Amount: tổng tiền đúng

**Redux DevTools:**
- [ ] Action `payments/fetchPayments/fulfilled`
- [ ] State `payments.list` có 6 items

### Create New Payment (Bài tập 2.1)

**Steps:**
1. Click "+ New Payment"
2. Fill form:
   - User ID: `1`
   - Semester: `Fall 2025`
   - Course Name: `Redux Tutorial`
   - Amount: `5000000`
   - Status: `SUCCESS`
3. Click "Create Payment"

**Expected:**
- [ ] Modal đóng
- [ ] Payment mới xuất hiện ở đầu table
- [ ] Total amount tăng lên
- [ ] Total payments tăng lên 7

**Redux DevTools:**
- [ ] Action `payments/createPayment/pending`
- [ ] Action `payments/createPayment/fulfilled`
- [ ] Payload chứa payment mới
- [ ] State `payments.list` có payment mới ở đầu

**Verify in Database:**
- [ ] Check http://localhost:3001/payments
- [ ] Payment mới tồn tại

### Error Handling 402 (Bài tập 2.2)

**Note:** Cần modify API để test. Trong production:

**Scenario:** Nếu API trả về 402:

**Expected:**
- [ ] Error message: "Tài khoản không đủ tiền"
- [ ] Modal không đóng
- [ ] Payment không được tạo

### Delete Payment

**Steps:**
1. Chọn 1 payment
2. Click "Delete"
3. Confirm dialog

**Expected:**
- [ ] Payment biến mất khỏi table
- [ ] Total payments giảm
- [ ] Total amount giảm

### Filters

#### Search Filter

**Steps:**
1. Nhập "Spring" vào search box

**Expected:**
- [ ] Chỉ hiển thị payments có semester hoặc course chứa "Spring"
- [ ] Không re-fetch API (filter client-side)

**Redux DevTools:**
- [ ] Action `payments/setFilter`
- [ ] State `payments.filters.searchTerm = "Spring"`

#### Sort

**Steps:**
1. Chọn sort "Amount (High-Low)"

**Expected:**
- [ ] Payments sắp xếp theo amount giảm dần
- [ ] Payment có amount cao nhất lên đầu

#### Clear Filters

**Steps:**
1. Click "Clear Filters"

**Expected:**
- [ ] Search box trống
- [ ] Sort về default (Date - Newest)
- [ ] Hiển thị lại tất cả payments

### Reselect Selectors (Bài tập 2.3)

**Test trong Console:**

```javascript
// Mở Redux DevTools > Console
store.getState().payments.list

// Test selector
import { selectSuccessfulPayments } from './redux/paymentsSlice';
selectSuccessfulPayments(store.getState())
// → Chỉ trả về payments có status: 'SUCCESS'
```

**Verify Memoization:**
1. Change filter
2. Check if selector re-calculates (trong Redux DevTools)
3. Change filter về cũ
4. → Selector return cached result (performance!)

---

## 🔍 Redux DevTools Testing

### Installation

1. Install extension: [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/)
2. F12 → Tab "Redux"

### Features to Test

#### 1. State Tree

**Steps:**
1. Mở Redux tab
2. Click vào "State" tab

**Expected:**
- [ ] Thấy toàn bộ state tree:
  ```
  ├── auth
  │   ├── isAuthenticated
  │   ├── user
  │   ├── isLoading
  │   └── error
  ├── users
  │   ├── list
  │   ├── isLoading
  │   └── error
  └── payments
      ├── list
      ├── filters
      ├── isLoading
      └── error
  ```

#### 2. Action History

**Steps:**
1. Login
2. Fetch users
3. Toggle admin
4. Create payment

**Expected:**
- [ ] Thấy tất cả actions theo thứ tự:
  - `auth/login/pending`
  - `auth/login/fulfilled`
  - `users/fetchUsers/pending`
  - `users/fetchUsers/fulfilled`
  - `users/toggleAdminStatus`
  - `payments/createPayment/pending`
  - `payments/createPayment/fulfilled`

#### 3. Time Travel

**Steps:**
1. Click vào action cũ hơn

**Expected:**
- [ ] UI quay lại state tại thời điểm action đó
- [ ] Có thể "replay" actions

#### 4. Diff View

**Steps:**
1. Click vào 1 action
2. Chọn tab "Diff"

**Expected:**
- [ ] Thấy changes (before/after)
- [ ] Màu xanh = thêm mới
- [ ] Màu đỏ = xóa

---

## 🚨 Error Scenarios

### Network Error

**Test:**
1. Tắt JSON Server
2. Refresh users

**Expected:**
- [ ] Error message hiển thị
- [ ] Loading state kết thúc
- [ ] State `users.error` có message

### Protected Routes

**Test:**
1. Logout
2. Thử truy cập `/dashboard` directly

**Expected:**
- [ ] Redirect về `/` (login page)
- [ ] Không thể access protected pages

---

## ✅ Final Checklist

### Lý thuyết
- [ ] Đọc README.md - 5 câu hỏi
- [ ] Hiểu Redux Thunk
- [ ] Hiểu ưu điểm RTK
- [ ] Hiểu createSlice vs createReducer

### Bài tập 1 (Users)
- [ ] Fetch users thành công
- [ ] Toggle admin hoạt động (sync)
- [ ] Ban/Unban hoạt động (async)
- [ ] Error handling

### Bài tập 2 (Payments)
- [ ] Fetch payments
- [ ] Create payment (POST)
- [ ] Delete payment
- [ ] Filters hoạt động
- [ ] Selectors với reselect

### Redux DevTools
- [ ] Thấy state tree
- [ ] Track actions
- [ ] Time-travel works
- [ ] Diff view

### Code Quality
- [ ] Không có errors trong console
- [ ] Không có warnings
- [ ] Code có comments giải thích
- [ ] Follow best practices

---

## 📊 Performance Testing

### Selector Memoization

**Test:**
```javascript
// Console
import { selectFilteredAndSortedPayments } from './redux/paymentsSlice';

// Call 2 lần với cùng state
const result1 = selectFilteredAndSortedPayments(store.getState());
const result2 = selectFilteredAndSortedPayments(store.getState());

console.log(result1 === result2); // true (same reference = memoized)
```

### Re-render Optimization

**Test:**
1. Mở React DevTools
2. Enable "Highlight updates"
3. Toggle admin status
4. → Chỉ Users table re-render, không phải toàn app

---

## 🎓 Learning Objectives Achieved

Sau khi complete tất cả tests:

- [x] Hiểu Redux Thunk và async operations
- [x] Nắm vững Redux Toolkit patterns
- [x] Biết cách sử dụng createSlice, createAsyncThunk
- [x] Implement error handling với rejectWithValue
- [x] Sử dụng Reselect cho performance
- [x] Debug với Redux DevTools
- [x] Migrate từ Context API sang Redux

**Chúc mừng! Bạn đã hoàn thành Lab 6! 🎉**
