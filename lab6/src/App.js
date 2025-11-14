// App.js - Main Application với Redux Provider
// Thay thế Context API bằng Redux Toolkit

import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './redux/store';
import { restoreUser } from './redux/authSlice';
import AppRoutes from './routes/AppRoutes';

/**
 * AppContent - Component để restore user từ localStorage
 */
function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Restore user từ localStorage khi app khởi động
    dispatch(restoreUser());
  }, [dispatch]);

  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
}

/**
 * App Component với Redux Provider
 * 
 * So sánh với progress-test1:
 * - BEFORE: Sử dụng AuthProvider và PaymentProvider từ Context API
 * - AFTER: Chỉ cần Provider từ react-redux với store
 * 
 * Ưu điểm:
 * 1. Code ngắn gọn hơn
 * 2. Không cần nested providers
 * 3. Performance tốt hơn với Redux
 * 4. DevTools mạnh mẽ hơn
 */
function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
