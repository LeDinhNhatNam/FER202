import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import LoginForm from './components/LoginForm';
import CounterComponent from './components/CounterComponent';
import LightSwitch from './components/LightSwitch';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="App">
          <h1>Exercise 2: AuthContext + ThemeContext với useReducer</h1>
          <LoginForm />
          <hr />
          <CounterComponent />
          <hr />
          <LightSwitch />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
