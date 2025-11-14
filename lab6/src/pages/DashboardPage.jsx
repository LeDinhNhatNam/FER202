// DashboardPage.jsx - Dashboard với Redux
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { logout, selectCurrentUser } from '../redux/authSlice';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h3>Dashboard - Redux Toolkit Lab 6</h3>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Card.Header>
        
        <Card.Body>
          <h4>Welcome, {user?.fullName}!</h4>
          <p>Username: {user?.username}</p>
          <p>Role: {user?.role}</p>
          
          <hr />
          
          <h5>Lab 6 Exercises:</h5>
          
          <Row className="mt-3">
            <Col md={6}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Bài tập 1: Users Management</Card.Title>
                  <Card.Text>
                    Quản lý người dùng với:
                    <ul>
                      <li>Async thunks (fetchUsers, banUser, unbanUser)</li>
                      <li>Synchronous reducer (toggleAdminStatus)</li>
                      <li>Error handling với 3 states</li>
                    </ul>
                  </Card.Text>
                  <Button 
                    variant="primary" 
                    onClick={() => navigate('/users')}
                  >
                    Go to Users
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Bài tập 2: Payments Management</Card.Title>
                  <Card.Text>
                    Quản lý thanh toán với:
                    <ul>
                      <li>POST operation (createPayment)</li>
                      <li>Custom error handling (402 status)</li>
                      <li>Reselect selectors</li>
                    </ul>
                  </Card.Text>
                  <Button 
                    variant="primary" 
                    onClick={() => navigate('/payments')}
                  >
                    Go to Payments
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Card className="mt-3 bg-light">
            <Card.Body>
              <h5>Redux Toolkit Features Demonstrated:</h5>
              <ul>
                <li>✅ createSlice - Tạo reducers và actions tự động</li>
                <li>✅ createAsyncThunk - Xử lý async operations</li>
                <li>✅ extraReducers - Handle async thunk states</li>
                <li>✅ Immer - "Mutate" state trực tiếp</li>
                <li>✅ Reselect - Memoized selectors</li>
                <li>✅ Redux DevTools - Debug state changes</li>
              </ul>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DashboardPage;
