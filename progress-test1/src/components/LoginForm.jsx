import React, { useReducer, useState } from 'react';
import { Form, Button, Card, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import ConfirmModal from './ConfirmModal';
import { useNavigate } from 'react-router-dom'; // Thêm useNavigate để chuyển hướng

// 1. Khởi tạo trạng thái ban đầu cho form

const initialFormState = {
  formData: {
    identifier: '', // username hoặc email
    password: '',
  },
  errors: {},
  showSuccessModal: false,
};

// 2. Định nghĩa reducer cho form 
function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      // Cập nhật giá trị vào state.formData
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value,
        },
      };
    case 'SET_ERROR':
      // Cập nhật lỗi cho trường cụ thể
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.message },
      };
    case 'CLEAR_ERROR':
        // Sửa lỗi: Xóa lỗi cho trường cụ thể
      const { [action.field]: removed, ...restErrors } = state.errors;
      return {
        ...state,
        errors: restErrors,
      };
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.errors,
      };
    case 'SHOW_SUCCESS_MODAL':
      return {
        ...state,
        showSuccessModal: true,
      };
    case 'HIDE_SUCCESS_MODAL':
      return {
        ...state,
        showSuccessModal: false,
      };
    case 'RESET_FORM':
      return initialFormState;
    default:
      return state;
  }
}

function LoginForm() {
  const navigate = useNavigate(); // Sử dụng useNavigate

  // 3. Sử dụng useReducer cho form state
  const [formState, dispatch] = useReducer(formReducer, initialFormState);

  // 4. Sử dụng AuthContext (Giả định AuthContext đã cung cấp đủ các giá trị này)
  const { login, loading, error, clearError, user } = useAuth();

  // 5. Validation helpers
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmail = (v) => v.includes('@');

  // 6. Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Cập nhật giá trị field (SỬ DỤNG action SET_FIELD đã sửa)
    dispatch({ type: 'SET_FIELD', field: name, value });

    // Clear auth error khi user nhập (Giả định clearError tồn tại trong useAuth)
    if (error) clearError();

    // Validation real-time
    let message = '';
    if (name === 'identifier') {
      if (!value.trim()) {
        message = 'Username or Email is required.';
      } else if (isEmail(value) && !emailRe.test(value)) {
        message = 'Email is invalid format.';
      }
    }

    if (name === 'password') {
      if (!value.trim()) {
        message = 'Password is required.';
      } else if (value.length < 6) { // Thêm validation min length 6
        message = 'Password must be at least 6 characters.';
      }
    }

    if (message) {
      dispatch({ type: 'SET_ERROR', field: name, message });
    } else {
      dispatch({ type: 'CLEAR_ERROR', field: name });
    }
  };

  // 7. Validation form
  const validateForm = () => {
    const errors = {};
    const { identifier, password } = formState.formData; // Lấy từ formData đã sửa

    if (!identifier.trim()) {
      errors.identifier = 'Username or Email is required.';
    } else if (isEmail(identifier) && !emailRe.test(identifier)) {
      errors.identifier = 'Email is invalid format.';
    }

    if (!password.trim()) {
     errors.password = 'Password is required.';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }

    return errors;
  };

  // 8. Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error) clearError(); // Clear error trước khi submit lại

    // Validate form
    const validationErrors = validateForm();
    dispatch({ type: 'SET_ERRORS', errors: validationErrors });

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      // Gọi login từ AuthContext
      const result = await login({ // SỬA LỖI: login cần nhận object {usernameOrEmail, password}
        usernameOrEmail: formState.formData.identifier.trim(), 
        password: formState.formData.password,
      });

      // result.success là cách logic tốt hơn để kiểm tra thành công
      if (result && result.success) { 
        // Hiển thị modal thành công
        dispatch({ type: 'SHOW_SUCCESS_MODAL' });
      }
     // Lỗi sẽ được xử lý và hiển thị qua AuthContext error (như "Invalid username/email or password!"[cite: 16])
    } catch (err) {
      // Lỗi mạng hoặc lỗi không xác định
      console.error('Login error:', err);
    }
  };
  //9. Xử lý reset form
    const handleReset = () => { 
    //1. Reset form state về ban đầu
    dispatch({ type: 'RESET_FORM' });
    //2. Xóa lỗi từ AuthContext nếu có
    if (error) clearError();
  };

  // 10. Xử lý đóng modal thành công
  const handleCloseSuccessModal = () => {
    dispatch({ type: 'HIDE_SUCCESS_MODAL' });
    dispatch({ type: 'RESET_FORM' });
    // Chuyển hướng đến /home sau khi đóng modal[cite: 17]
    navigate('/home'); 
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={11} md={10} lg={8} xl={7}>
          <Card className="shadow-sm border-0" style={{ borderRadius: '15px', width: '100%' }}>
            <Card.Body className="px-5 py-4">
              <h3 className="text-center mb-4 fw-bold text-dark">Login</h3>
              {/* Hiển thị lỗi từ AuthContext ("Invalid username/email or password!")*/}
              {error && (
                <Alert variant="danger" className="mb-3" onClose={clearError} dismissible>
                  {error}
                </Alert>
              )}
              
              <Form onSubmit={handleSubmit} noValidate>
                {/* Identifier Field */}
                <Form.Group controlId="identifier" className="mb-3">
                  <Form.Label className="d-block text-start mb-2 text-dark">Username or email</Form.Label>
                  <Form.Control
                    type="text"
                    name="identifier"
                    value={formState.formData.identifier}
                    onChange={handleChange}
                    placeholder="Enter username or email"
                    disabled={loading}
                    style={{ 
                      borderRadius: '5px',
                      padding: '10px 12px',
                      fontSize: '14px',
                      border: formState.errors.identifier ? '2px solid #dc3545' : '1px solid #ced4da'
                    }}
                  />
                  {formState.errors.identifier && (
                    <div className="text-danger small mt-1">
                      {formState.errors.identifier}
                    </div>
                  )}
                </Form.Group>

                {/* Password Field */}
                <Form.Group controlId="password" className="mb-4">
                  <Form.Label className="d-block text-start mb-2 text-dark">Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formState.formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    disabled={loading}
                    style={{ 
                      borderRadius: '5px',
                      padding: '10px 12px',
                      fontSize: '14px',
                      border: formState.errors.password ? '2px solid #dc3545' : '1px solid #ced4da'
                    }}
                  />
                  {formState.errors.password && (
                    <div className="text-danger small mt-1">
                      {formState.errors.password}
                    </div>
                  )}
                </Form.Group>

                <Row className="g-3">
                  <Col xs={6}>
                    <Button 
                      variant="primary" 
                      type="submit" 
                      className="w-100"
                      disabled={loading}
                      style={{
                        borderRadius: '8px',
                        padding: '12px',
                        fontWeight: '600',
                        backgroundColor: '#007bff',
                        border: 'none',
                        fontSize: '16px'
                      }}
                    >
                      {loading ? (
                        <>
                          <Spinner size="sm" animation="border" role="status" className="me-2" />
                          Logging in...
                        </>
                      ) : (
                        'Login'
                      )}
                    </Button>
                  </Col>
                  <Col xs={6}>
                    <Button 
                      variant="secondary" 
                      type="button" 
                      className="w-100"
                      onClick={handleReset}
                      disabled={loading}
                      style={{
                        borderRadius: '8px',
                        padding: '12px',
                        fontWeight: '600',
                        backgroundColor: '#6c757d',
                        border: 'none',
                        fontSize: '16px'
                      }}
                    >
                      Cancel
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal thông báo thành công, gọi ConfirmModal */}
      <ConfirmModal
        show={formState.showSuccessModal}
        title="Login Successful!"
        message={`Welcome, ${user?.username}!, login successful.`}
        onConfirm={handleCloseSuccessModal}
        onHide={handleCloseSuccessModal}
        confirmText="Continue"
        showCancel={false}
        variant="success"
      />
    </Container>
  );
}

export default LoginForm;
