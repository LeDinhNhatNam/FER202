// UsersPage.jsx - Quản lý Users với Redux Toolkit
// Bài tập 1: Demo các tính năng của usersSlice

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Card, Button, Table, Badge, Spinner, Alert } from 'react-bootstrap';
import { 
  fetchUsers, 
  toggleAdminStatus, 
  banUser, 
  unbanUser,
  selectUsers,
  selectUsersLoading,
  selectUsersError
} from '../redux/usersSlice';

const UsersPage = () => {
  const dispatch = useDispatch();
  
  // Sử dụng Redux selectors thay vì Context
  const users = useSelector(selectUsers);
  const loading = useSelector(selectUsersLoading);
  const error = useSelector(selectUsersError);

  // Fetch users khi component mount
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  /**
   * Bài tập 1.3 - Thao tác Cục bộ
   * Toggle Admin Status - Sử dụng synchronous reducer
   */
  const handleToggleAdmin = (userId) => {
    dispatch(toggleAdminStatus(userId));
  };

  /**
   * Bài tập 1.2 - Xử lý Thao tác Đọc với Async Thunk
   * Ban/Unban user - Sử dụng async thunk
   */
  const handleBanUser = async (userId) => {
    await dispatch(banUser(userId));
  };

  const handleUnbanUser = async (userId) => {
    await dispatch(unbanUser(userId));
  };

  if (loading && users.length === 0) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading users...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h3>Users Management (Redux Toolkit)</h3>
          <Button 
            variant="primary" 
            onClick={() => dispatch(fetchUsers())}
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </Button>
        </Card.Header>
        
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <div className="mb-3">
            <Badge bg="info">Total Users: {users.length}</Badge>
          </div>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Full Name</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.fullName}</td>
                  <td>
                    <Badge bg={user.role === 'admin' ? 'primary' : 'secondary'}>
                      {user.role}
                    </Badge>
                  </td>
                  <td>
                    <Badge bg={user.status === 'active' ? 'success' : 'danger'}>
                      {user.status}
                    </Badge>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      {/* Bài tập 1.3 - Toggle Admin (Synchronous) */}
                      <Button 
                        size="sm" 
                        variant="warning"
                        onClick={() => handleToggleAdmin(user.id)}
                        title="Toggle Admin Status (Local)"
                      >
                        Toggle Admin
                      </Button>
                      
                      {/* Bài tập 1.2 - Ban/Unban (Asynchronous) */}
                      {user.status === 'active' ? (
                        <Button 
                          size="sm" 
                          variant="danger"
                          onClick={() => handleBanUser(user.id)}
                          disabled={loading}
                        >
                          Ban
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          variant="success"
                          onClick={() => handleUnbanUser(user.id)}
                          disabled={loading}
                        >
                          Unban
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="mt-3">
            <h5>Ghi chú:</h5>
            <ul>
              <li><strong>Toggle Admin</strong>: Reducer đồng bộ (local state only)</li>
              <li><strong>Ban/Unban</strong>: Async thunk (gọi API và cập nhật server)</li>
              <li>Quan sát Redux DevTools để thấy actions được dispatch</li>
            </ul>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UsersPage;
