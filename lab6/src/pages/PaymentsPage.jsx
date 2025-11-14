// PaymentsPage.jsx - Quản lý Payments với Redux Toolkit
// Bài tập 2: Demo các tính năng của paymentsSlice

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Card, Button, Table, Badge, Spinner, Alert, Modal, Form } from 'react-bootstrap';
import { 
  fetchPayments,
  createPayment,
  deletePayment,
  selectFilteredAndSortedPayments,
  selectPaymentsLoading,
  selectPaymentsError,
  selectTotalAmount,
  selectSuccessfulPayments,
  setFilter,
  clearFilters
} from '../redux/paymentsSlice';

const PaymentsPage = () => {
  const dispatch = useDispatch();
  
  // Redux selectors
  const payments = useSelector(selectFilteredAndSortedPayments);
  const successfulPayments = useSelector(selectSuccessfulPayments);
  const loading = useSelector(selectPaymentsLoading);
  const error = useSelector(selectPaymentsError);
  const totalAmount = useSelector(selectTotalAmount);

  const [showModal, setShowModal] = useState(false);
  const [newPayment, setNewPayment] = useState({
    userId: '1',
    semester: 'Fall 2025',
    courseName: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    status: 'SUCCESS'
  });

  // Fetch payments khi component mount
  useEffect(() => {
    dispatch(fetchPayments());
  }, [dispatch]);

  /**
   * Bài tập 2.1 - Tạo Payment Mới
   */
  const handleCreatePayment = async () => {
    const result = await dispatch(createPayment(newPayment));
    
    if (createPayment.fulfilled.match(result)) {
      setShowModal(false);
      setNewPayment({
        userId: '1',
        semester: 'Fall 2025',
        courseName: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        status: 'SUCCESS'
      });
    }
  };

  const handleDeletePayment = async (paymentId) => {
    if (window.confirm('Are you sure you want to delete this payment?')) {
      await dispatch(deletePayment(paymentId));
    }
  };

  const handleFilterChange = (field, value) => {
    dispatch(setFilter({ field, value }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  if (loading && payments.length === 0) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading payments...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h3>Payments Management (Redux Toolkit)</h3>
          <div className="d-flex gap-2">
            <Button 
              variant="success" 
              onClick={() => setShowModal(true)}
            >
              + New Payment
            </Button>
            <Button 
              variant="primary" 
              onClick={() => dispatch(fetchPayments())}
              disabled={loading}
            >
              {loading ? 'Refreshing...' : 'Refresh'}
            </Button>
          </div>
        </Card.Header>
        
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          
          {/* Statistics */}
          <div className="mb-3 d-flex gap-3">
            <Badge bg="info">Total Payments: {payments.length}</Badge>
            <Badge bg="success">Successful: {successfulPayments.length}</Badge>
            <Badge bg="primary">Total Amount: {formatCurrency(totalAmount)}</Badge>
          </div>

          {/* Filters */}
          <div className="mb-3 d-flex gap-2">
            <Form.Control
              type="text"
              placeholder="Search by semester or course..."
              onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
              style={{ maxWidth: '300px' }}
            />
            
            <Form.Select
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              style={{ maxWidth: '200px' }}
            >
              <option value="date_desc">Date (Newest)</option>
              <option value="date_asc">Date (Oldest)</option>
              <option value="amount_desc">Amount (High-Low)</option>
              <option value="amount_asc">Amount (Low-High)</option>
              <option value="course_asc">Course (A-Z)</option>
              <option value="course_desc">Course (Z-A)</option>
            </Form.Select>

            <Button 
              variant="secondary" 
              onClick={() => dispatch(clearFilters())}
            >
              Clear Filters
            </Button>
          </div>

          {/* Payments Table */}
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Semester</th>
                <th>Course Name</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(payment => (
                <tr key={payment.id}>
                  <td>{payment.id}</td>
                  <td>{payment.userId}</td>
                  <td>{payment.semester}</td>
                  <td>{payment.courseName}</td>
                  <td>{formatCurrency(payment.amount)}</td>
                  <td>{new Date(payment.date).toLocaleDateString()}</td>
                  <td>
                    <Badge bg={
                      payment.status === 'SUCCESS' ? 'success' : 
                      payment.status === 'PENDING' ? 'warning' : 
                      'danger'
                    }>
                      {payment.status}
                    </Badge>
                  </td>
                  <td>
                    <Button 
                      size="sm" 
                      variant="danger"
                      onClick={() => handleDeletePayment(payment.id)}
                      disabled={loading}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {payments.length === 0 && (
            <div className="text-center text-muted">
              No payments found
            </div>
          )}

          <div className="mt-3">
            <h5>Ghi chú:</h5>
            <ul>
              <li><strong>Bài tập 2.1</strong>: Create Payment sử dụng async thunk</li>
              <li><strong>Bài tập 2.2</strong>: Xử lý lỗi 402 với rejectWithValue</li>
              <li><strong>Bài tập 2.3</strong>: Selector selectSuccessfulPayments sử dụng reselect</li>
            </ul>
          </div>
        </Card.Body>
      </Card>

      {/* Create Payment Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>User ID</Form.Label>
              <Form.Control
                type="text"
                value={newPayment.userId}
                onChange={(e) => setNewPayment({...newPayment, userId: e.target.value})}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Semester</Form.Label>
              <Form.Control
                type="text"
                value={newPayment.semester}
                onChange={(e) => setNewPayment({...newPayment, semester: e.target.value})}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Course Name</Form.Label>
              <Form.Control
                type="text"
                value={newPayment.courseName}
                onChange={(e) => setNewPayment({...newPayment, courseName: e.target.value})}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                value={newPayment.amount}
                onChange={(e) => setNewPayment({...newPayment, amount: parseInt(e.target.value)})}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={newPayment.date}
                onChange={(e) => setNewPayment({...newPayment, date: e.target.value})}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={newPayment.status}
                onChange={(e) => setNewPayment({...newPayment, status: e.target.value})}
              >
                <option value="SUCCESS">SUCCESS</option>
                <option value="PENDING">PENDING</option>
                <option value="REFUNDED">REFUNDED</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleCreatePayment}
            disabled={loading || !newPayment.courseName || !newPayment.amount}
          >
            {loading ? 'Creating...' : 'Create Payment'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PaymentsPage;
