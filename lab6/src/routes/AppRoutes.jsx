// AppRoutes.jsx - Routing với Redux
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../redux/authSlice';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import UsersPage from '../pages/UsersPage';
import PaymentsPage from '../pages/PaymentsPage';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<LoginPage />} />
        
        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/users" 
          element={
            <ProtectedRoute>
              <UsersPage />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/payments" 
          element={
            <ProtectedRoute>
              <PaymentsPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
