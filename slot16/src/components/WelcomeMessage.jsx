import React, { useEffect, useState } from 'react';
import { Container, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

const WelcomeMessage = ({ onContinue }) => {
  const { user } = useAuth();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onContinue();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onContinue]);

  const getRoleDisplayName = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return 'QUẢN TRỊ VIÊN';
      case 'manager':
        return 'QUẢN LÝ';
      case 'user':
        return 'NGƯỜI DÙNG';
      default:
        return role?.toUpperCase() || 'NGƯỜI DÙNG';
    }
  };

  const getRoleColor = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return 'danger';
      case 'manager':
        return 'warning';
      case 'user':
        return 'info';
      default:
        return 'primary';
    }
  };

  return (
    <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="text-center">
        <div className="mb-4">
          <h1 className="display-4 mb-3">🎬</h1>
          <h2 className="text-primary mb-4">Chào mừng bạn!</h2>
        </div>

        <Alert variant={getRoleColor(user?.role)} className="py-4 px-5 shadow">
          <h3 className="mb-3">
            Welcome <strong>{getRoleDisplayName(user?.role)}</strong>
          </h3>
          <h4 className="mb-3">
            <strong>{user?.username}</strong>
          </h4>
          <p className="mb-3 text-muted">
            Bạn đã đăng nhập thành công vào hệ thống quản lý phim
          </p>
          
          <div className="d-flex align-items-center justify-content-center">
            <Spinner animation="border" size="sm" className="me-2" />
            <span>Đang chuyển hướng sau {countdown} giây...</span>
          </div>
        </Alert>

        <button 
          className="btn btn-outline-primary"
          onClick={onContinue}
        >
          Tiếp tục ngay →
        </button>
      </div>
    </Container>
  );
};

export default WelcomeMessage;