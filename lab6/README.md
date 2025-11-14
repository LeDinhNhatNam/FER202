# Lab 6 - Redux, Redux Thunk và Redux Toolkit

## 🚀 Quick Start

```bash
# 1. Cài đặt dependencies
npm install

# 2. Chạy JSON Server (Terminal 1)
npm run server

# 3. Chạy React App (Terminal 2)
npm start

# 4. Login với: nam123 / 123456
```

📖 **Đọc file [GUIDE.md](GUIDE.md) để hiểu chi tiết implementation**

---

## Câu hỏi lý thuyết

### 1. Redux Thunk là gì? Giải thích vai trò của nó trong việc xử lý các tác vụ bất đồng bộ

**Redux Thunk** là một middleware cho Redux, cho phép chúng ta viết các action creators trả về **function** thay vì **action object**.

#### Vai trò trong xử lý tác vụ bất đồng bộ:
- **Cho phép dispatch actions sau khi hoàn thành các tác vụ async** (như gọi API, setTimeout, v.v.)
- **Trì hoãn (delay) việc dispatch action** cho đến khi có kết quả từ API
- **Có thể dispatch nhiều actions** trong một async operation (ví dụ: loading, success, error)

#### Tại sao không thể thực hiện trực tiếp trong Reducer?

```javascript
// ❌ KHÔNG THỂ làm như này trong Reducer
const reducer = (state, action) => {
  switch(action.type) {
    case 'FETCH_DATA':
      // Reducer PHẢI là pure function - không được có side effects
      // Không được gọi API, setTimeout, hoặc bất kỳ async operation nào
      fetch('/api/data') // ❌ WRONG!
        .then(data => /* ... */);
      return state;
  }
}
```

**Lý do:**
1. **Reducer phải là Pure Function**: Không được có side effects (API calls, random numbers, Date.now(), etc.)
2. **Reducer phải synchronous**: Phải return state mới ngay lập tức, không được async
3. **Predictable**: Với cùng state và action, reducer phải luôn trả về cùng một kết quả

**Giải pháp với Redux Thunk:**

```javascript
// ✅ ĐÚNG - Sử dụng Redux Thunk
const fetchData = () => {
  return async (dispatch) => {
    dispatch({ type: 'FETCH_START' }); // 1. Bắt đầu loading
    try {
      const data = await fetch('/api/data');
      dispatch({ type: 'FETCH_SUCCESS', payload: data }); // 2. Thành công
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error }); // 3. Lỗi
    }
  };
};
```

---

### 2. Ba ưu điểm chính của Redux Toolkit (RTK) so với Redux thuần

#### 1. **Giảm Boilerplate Code (Code dài dòng)**
```javascript
// ❌ Redux thuần - Nhiều code
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

const increment = () => ({ type: INCREMENT });
const decrement = () => ({ type: DECREMENT });

const counterReducer = (state = 0, action) => {
  switch(action.type) {
    case INCREMENT: return state + 1;
    case DECREMENT: return state - 1;
    default: return state;
  }
}

// ✅ Redux Toolkit - Ngắn gọn hơn nhiều
const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: state => state + 1,
    decrement: state => state - 1
  }
});
```

#### 2. **Immer tích hợp sẵn - Cho phép "mutate" state trực tiếp**
```javascript
// ❌ Redux thuần - Phải spread operator cẩn thận
const todosReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return [...state, action.payload]; // Phải copy array
    case 'TOGGLE_TODO':
      return state.map(todo => 
        todo.id === action.id 
          ? {...todo, completed: !todo.completed} // Phải copy object
          : todo
      );
  }
}

// ✅ Redux Toolkit - "Mutate" trực tiếp (Immer xử lý immutability)
const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload); // Có vẻ mutate, nhưng Immer xử lý
    },
    toggleTodo: (state, action) => {
      const todo = state.find(t => t.id === action.id);
      if (todo) {
        todo.completed = !todo.completed; // "Mutate" trực tiếp
      }
    }
  }
});
```

#### 3. **Tích hợp sẵn Redux Thunk và DevTools**
```javascript
// ❌ Redux thuần - Phải setup thủ công
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

// ✅ Redux Toolkit - Tự động có sẵn
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: rootReducer
  // Redux Thunk và DevTools đã được tích hợp sẵn!
});
```

---

### 3. Sự khác biệt giữa createSlice và createReducer

#### **createReducer**
- **Chỉ tạo reducer function**
- Phải tự định nghĩa action types và action creators
- Sử dụng Immer bên trong

```javascript
import { createReducer, createAction } from '@reduxjs/toolkit';

// Phải tự tạo actions
const increment = createAction('counter/increment');
const decrement = createAction('counter/decrement');

// Chỉ tạo reducer
const counterReducer = createReducer(0, (builder) => {
  builder
    .addCase(increment, (state) => state + 1)
    .addCase(decrement, (state) => state - 1);
});

// Phải export riêng
export { increment, decrement, counterReducer };
```

#### **createSlice**
- **Tạo cả reducer VÀ actions một lúc**
- Tự động generate action types và action creators
- Đơn giản hơn, ít code hơn

```javascript
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1
  }
});

// Auto-generate actions và reducer
export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
```

#### **Tại sao createSlice được khuyến khích hơn?**

1. **DRY (Don't Repeat Yourself)**: Không phải viết action types và action creators riêng
2. **Ít lỗi hơn**: Tự động tạo action types, tránh typo
3. **Code ngắn gọn hơn**: Một nơi định nghĩa tất cả (name, state, reducers, actions)
4. **Dễ maintain**: Tất cả logic của một feature ở cùng một nơi
5. **Best practice**: Được Redux team khuyến nghị sử dụng

---

### 4. Async Thunk cho Payments - Hoàn tiền (Refund)

```javascript
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../services/api';

// Khai báo createAsyncThunk cho việc hoàn tiền
export const refundPayment = createAsyncThunk(
  'payments/refund', // Action type prefix
  async (paymentId, { rejectWithValue }) => {
    try {
      const response = await api.refundPayment(paymentId);
      return response.data; // Dữ liệu trả về khi thành công
    } catch (error) {
      // Xử lý lỗi tùy chỉnh
      return rejectWithValue(error.response.data);
    }
  }
);
```

#### **3 trạng thái (states) được tạo ra:**

1. **`payments/refund/pending`** - Đang xử lý
   - Được dispatch ngay khi gọi `refundPayment(paymentId)`
   - Dùng để hiển thị loading spinner
   - State: `isLoading = true`

2. **`payments/refund/fulfilled`** - Thành công
   - Được dispatch khi API trả về thành công (resolve)
   - Nhận `action.payload` = dữ liệu trả về từ API
   - State: `isLoading = false`, cập nhật payment đã refund

3. **`payments/refund/rejected`** - Thất bại
   - Được dispatch khi API trả về lỗi (reject)
   - Nhận `action.payload` = error message (nếu dùng rejectWithValue)
   - State: `isLoading = false, error = action.payload`

#### Sử dụng trong slice:

```javascript
const paymentsSlice = createSlice({
  name: 'payments',
  initialState: {
    list: [],
    isLoading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 1. Pending - Đang xử lý
      .addCase(refundPayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // 2. Fulfilled - Thành công
      .addCase(refundPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        // Cập nhật payment đã refund
        const index = state.list.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      // 3. Rejected - Thất bại
      .addCase(refundPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});
```

---

### 5. User State Initialization với createSlice

```javascript
import { createSlice } from '@reduxjs/toolkit';

// Initial State cho nghiệp vụ users
const initialState = {
  list: [],        // Danh sách người dùng
  isLoading: false, // Trạng thái đang tải
  error: null      // Thông báo lỗi
};

// Tạo slice cho users
const usersSlice = createSlice({
  name: 'users', // Tên của slice
  initialState,  // State khởi tạo
  reducers: {
    // Các reducers đồng bộ sẽ được thêm ở đây
  },
  extraReducers: (builder) => {
    // Các async reducers (từ createAsyncThunk) sẽ được thêm ở đây
  }
});

export default usersSlice.reducer;
```

#### Giải thích:

- **`name: 'users'`**: Prefix cho tất cả action types (VD: `users/fetchUsers`)
- **`initialState`**: Cấu trúc state ban đầu với 3 fields:
  - `list`: Mảng chứa danh sách users
  - `isLoading`: Boolean theo dõi trạng thái loading
  - `error`: Lưu thông báo lỗi (null nếu không có lỗi)
- **`reducers`**: Chứa các actions đồng bộ (không cần async)
- **`extraReducers`**: Chứa các actions bất đồng bộ (từ createAsyncThunk)

---

## Bài tập thực hành

Xem implementation trong thư mục `src/redux/`:
- **Bài tập 1**: `usersSlice.js` - Quản lý người dùng
- **Bài tập 2**: `paymentsSlice.js` - Quản lý thanh toán
- **Store**: `store.js` - Cấu hình Redux store

## Chạy ứng dụng

```bash
# Install dependencies
npm install

# Chạy JSON Server (Terminal 1)
npm run server

# Chạy React App (Terminal 2)
npm start
```

JSON Server sẽ chạy tại: http://localhost:3001
React App sẽ chạy tại: http://localhost:3000

## Kiến trúc Redux Toolkit

```
src/
├── redux/
│   ├── store.js              # Redux store configuration
│   ├── usersSlice.js         # User management slice
│   └── paymentsSlice.js      # Payment management slice
├── services/
│   └── api.js                # API calls
├── components/
├── pages/
└── App.js                    # Redux Provider setup
```
