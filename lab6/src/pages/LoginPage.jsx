// LoginPage.jsx - Login với Redux Toolkit
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { loginUser, clearError, selectIsAuthenticated, selectAuthLoading, selectAuthError } from '../redux/authSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Redux selectors thay thế useAuth() từ Context
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: ''
  });

  // Redirect nếu đã login
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // Clear error khi user typing
    if (error) {
      dispatch(clearError());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Dispatch async thunk
    const result = await dispatch(loginUser(formData));
    
    if (loginUser.fulfilled.match(result)) {
      navigate('/dashboard');
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '400px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Login - Redux Toolkit</h2>
          
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username or Email</Form.Label>
              <Form.Control
                type="text"
                name="usernameOrEmail"
                value={formData.usernameOrEmail}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </Form.Group>

            <Button 
              variant="primary" 
              type="submit" 
              className="w-100"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Form>

          <div className="mt-3 text-center text-muted">
            <small>Test: nam123 / 123456 (admin, active)</small>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginPage;
