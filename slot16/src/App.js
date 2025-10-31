import React from 'react';
import './App.css';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/LoginForm';
import WelcomeMessage from './components/WelcomeMessage';
import MovieManager from './pages/MovieManager';
import 'bootstrap/dist/css/bootstrap.min.css';

const AppContent = () => {
  const { isAuthenticated, loading, showWelcome, hideWelcome } = useAuth();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  if (showWelcome) {
    return <WelcomeMessage onContinue={hideWelcome} />;
  }

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
