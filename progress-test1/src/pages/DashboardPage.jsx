import React, { useEffect } from 'react';
import { Container, Card, Table, Alert, Badge, Spinner } from 'react-bootstrap'; 
import NavigationHeader from '../components/NavigationHeader';
import FilterBar from '../components/FilterBar';
import { useAuth } from '../contexts/AuthContext';
import { usePayment } from '../contexts/PaymentContext';

const DashboardPage = () => {
    const { user } = useAuth();
    const { 
        filteredPayments, 
        isLoading, 
        error, 
        totalAmount, 
        fetchPaymentsByUserId,
        fetchAllPayments,
        clearError 
    } = usePayment();

    useEffect(() => {
        if (user && user.id) {
            // Nếu là admin, lấy tất cả payments, ngược lại chỉ lấy payments của user hiện tại
            if (user.role === 'admin') {
                fetchAllPayments();
            } else {
                fetchPaymentsByUserId(user.id);
            }
        }
    }, [user?.id, user?.role]); // Thêm user.role vào dependency

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('vi-VN');
    };
      
    return (
        <>
            {/* 1. Header (Navigation Bar) */}
            <NavigationHeader />
            {/* 2. Main Dashboard Content (Grid và Card) */}
            <Container>
                <FilterBar />
                
                {/* Payment Summary Card */}
                <Card className="mb-4 shadow-sm">
                    <Card.Header className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Dashboard Overview</h5>
                        <Badge bg="success" className="fs-6">
                            Total: {formatCurrency(totalAmount)}
                        </Badge>
                    </Card.Header>
                    <Card.Body>
                        {error && (
                            <Alert variant="danger" dismissible onClose={clearError}>
                                {error}
                            </Alert>
                        )}
                        
                        {isLoading ? (
                            <div className="text-center py-4">
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                                <p className="mt-2">Đang tải dữ liệu thanh toán...</p>
                            </div>
                        ) : (
                            <>
                                <h6>Lịch sử thanh toán của bạn:</h6>
                                {filteredPayments.length > 0 ? (
                                    <Table striped bordered hover responsive>
                                        <thead className="table-dark">
                                            <tr>
                                                <th width="5%">#</th>
                                                <th width="20%">Học kỳ</th>
                                                <th width="35%">Môn học</th>
                                                <th width="25%">Số tiền</th>
                                                <th width="15%">Ngày thanh toán</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredPayments.map((payment, index) => (
                                                <tr key={payment.id}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <Badge bg="info">{payment.semester}</Badge>
                                                    </td>
                                                    <td>{payment.courseName}</td>
                                                    <td>
                                                        <strong className="text-success">
                                                            {formatCurrency(payment.amount)}
                                                        </strong>
                                                    </td>
                                                    <td>{formatDate(payment.date)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                ) : (
                                    <Alert variant="info">
                                        <i className="bi bi-info-circle me-2"></i>
                                        {filteredPayments.length === 0 && !isLoading 
                                            ? "Không tìm thấy giao dịch nào với bộ lọc hiện tại."
                                            : "Bạn chưa có giao dịch thanh toán nào."
                                        }
                                    </Alert>
                                )}
                            </>
                        )}
                    </Card.Body>
                </Card>
            </Container>    
        </>
    );
};

export default DashboardPage;
