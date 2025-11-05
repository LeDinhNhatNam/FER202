import React, { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col, Card, Table, Badge, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { paymentsAPI, semestersAPI } from '../services/api';
import Header from '../components/Header';
import FilterBar from '../components/FilterBar';

const Home = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter and sort states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [sortBy, setSortBy] = useState('courseName_asc');

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch payments and semesters in parallel
        const [paymentsData, semestersData] = await Promise.all([
          user.role === 'admin' ? paymentsAPI.getAllPayments() : paymentsAPI.getPayments(user.id),
          semestersAPI.getSemesters()
        ]);

        setPayments(paymentsData);
        setSemesters(semestersData);
      } catch (err) {
        setError('Failed to fetch data. Please try again.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user.id, user.role]);

  // Get unique course names for filter
  const uniqueCourses = useMemo(() => {
    return [...new Set(payments.map(payment => payment.courseName))];
  }, [payments]);

  // Filter and sort payments
  const filteredAndSortedPayments = useMemo(() => {
    let filtered = payments;

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(payment => 
        payment.semester.toLowerCase().includes(term) ||
        payment.courseName.toLowerCase().includes(term) ||
        payment.courseCode.toLowerCase().includes(term)
      );
    }

    // Apply semester filter
    if (selectedSemester) {
      filtered = filtered.filter(payment => payment.semester === selectedSemester);
    }

    // Apply course filter
    if (selectedCourse) {
      filtered = filtered.filter(payment => payment.courseName === selectedCourse);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'courseName_asc':
          return a.courseName.localeCompare(b.courseName);
        case 'courseName_desc':
          return b.courseName.localeCompare(a.courseName);
        case 'date_asc':
          return new Date(a.date) - new Date(b.date);
        case 'date_desc':
          return new Date(b.date) - new Date(a.date);
        case 'amount_asc':
          return a.amount - b.amount;
        case 'amount_desc':
          return b.amount - a.amount;
        default:
          return 0;
      }
    });

    return filtered;
  }, [payments, searchTerm, selectedSemester, selectedCourse, sortBy]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);
    const paidAmount = payments
      .filter(payment => payment.status === 'paid')
      .reduce((sum, payment) => sum + payment.amount, 0);
    const pendingAmount = totalAmount - paidAmount;
    const totalCourses = uniqueCourses.length;

    return {
      totalAmount,
      paidAmount,
      pendingAmount,
      totalCourses
    };
  }, [payments, uniqueCourses]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  if (loading) {
    return (
      <>
        <Header />
        <Container className="mt-4 text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-3">Loading dashboard...</p>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header />
      <Container className="mt-4">
        <Row className="mb-4">
          <Col>
            <h2 className="text-primary mb-0">
              Dashboard - Tuition Payment System
            </h2>
            <p className="text-muted">
              Welcome back, {user.fullName}! Here's your payment overview.
            </p>
          </Col>
        </Row>

        {error && (
          <Alert variant="danger" className="mb-4">
            {error}
          </Alert>
        )}

        {/* Statistics Cards */}
        <Row className="mb-4">
          <Col md={3}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body className="text-center">
                💰
                <h5 className="card-title">Total Amount</h5>
                <h4 className="text-success">{formatCurrency(stats.totalAmount)}</h4>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body className="text-center">
                📅
                <h5 className="card-title">Paid Amount</h5>
                <h4 className="text-primary">{formatCurrency(stats.paidAmount)}</h4>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body className="text-center">
                ⏰
                <h5 className="card-title">Pending Amount</h5>
                <h4 className="text-warning">{formatCurrency(stats.pendingAmount)}</h4>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body className="text-center">
                📚
                <h5 className="card-title">Total Courses</h5>
                <h4 className="text-info">{stats.totalCourses}</h4>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Filter Bar */}
        <FilterBar
          onSearchChange={setSearchTerm}
          onSemesterFilterChange={setSelectedSemester}
          onCourseFilterChange={setSelectedCourse}
          onSortChange={setSortBy}
          semesters={semesters}
          courses={uniqueCourses}
          searchTerm={searchTerm}
          selectedSemester={selectedSemester}
          selectedCourse={selectedCourse}
          sortBy={sortBy}
        />

        {/* Payments Table */}
        <Card className="shadow-sm">
          <Card.Header className="bg-primary text-white">
            <h5 className="mb-0">Payment History ({filteredAndSortedPayments.length} records)</h5>
          </Card.Header>
          <Card.Body className="p-0">
            {filteredAndSortedPayments.length === 0 ? (
              <div className="text-center py-5">
                <p className="text-muted mb-0">No payments found matching your criteria.</p>
              </div>
            ) : (
              <Table responsive striped hover className="mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Course Code</th>
                    <th>Course Name</th>
                    <th>Semester</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedPayments.map((payment) => (
                    <tr key={payment.id}>
                      <td className="fw-semibold">{payment.courseCode}</td>
                      <td>{payment.courseName}</td>
                      <td>{payment.semester}</td>
                      <td className="fw-semibold">{formatCurrency(payment.amount)}</td>
                      <td>{formatDate(payment.date)}</td>
                      <td>
                        <Badge 
                          bg={payment.status === 'paid' ? 'success' : 'warning'}
                          className="px-2 py-1"
                        >
                          {payment.status === 'paid' ? 'Paid' : 'Pending'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Home;