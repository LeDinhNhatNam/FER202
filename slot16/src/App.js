import React from 'react';
import './App.css';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/LoginForm';
import MovieManager from './pages/MovieManager';
import 'bootstrap/dist/css/bootstrap.min.css';

// Component để kiểm tra authentication và render UI tương ứng
const AppContent = () => {
  const { isAuthenticated, loading } = useAuth();

  // Hiển thị loading nếu đang kiểm tra session
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Nếu chưa đăng nhập, hiển thị LoginForm
  if (!isAuthenticated) {
    return <LoginForm />;
  }

  // Nếu đã đăng nhập, hiển thị MovieManager
  return <MovieManager />;
};

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </div>
  );
}

export default App;
