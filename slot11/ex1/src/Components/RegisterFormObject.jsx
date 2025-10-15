// Exercise 7: Form đăng ký với useState cho 1 object
import React, { useState } from 'react';
import { Form, Button, Container, Alert, Toast, ToastContainer, Modal, Card } from 'react-bootstrap';

function RegisterFormObject() {
    // State cho form data (sử dụng 1 object)
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // State cho errors
    const [errors, setErrors] = useState({});
    
    // State cho toast và modal
    const [showToast, setShowToast] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // Validation functions
    const validateUsername = (username) => {
        const trimmed = username.trim();
        if (trimmed.length < 3) return 'Username phải có ít nhất 3 ký tự';
        if (!/^[a-zA-Z0-9_.]+$/.test(trimmed)) return 'Username chỉ được chứa chữ, số, _ hoặc .';
        if (username !== trimmed) return 'Username không được có khoảng trắng đầu/cuối';
        return '';
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return 'Email không đúng định dạng';
        return '';
    };

    const validatePassword = (password) => {
        if (password.length < 8) return 'Password phải có ít nhất 8 ký tự';
        if (!/(?=.*[a-z])/.test(password)) return 'Password phải có ít nhất 1 chữ thường';
        if (!/(?=.*[A-Z])/.test(password)) return 'Password phải có ít nhất 1 chữ hoa';
        if (!/(?=.*\d)/.test(password)) return 'Password phải có ít nhất 1 chữ số';
        if (!/(?=.*[!@#$%^&*])/.test(password)) return 'Password phải có ít nhất 1 ký tự đặc biệt (!@#$%^&*)';
        return '';
    };

    const validateConfirmPassword = (confirmPassword, password) => {
        if (confirmPassword !== password) return 'Confirm password không khớp với password';
        return '';
    };

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Cập nhật form data
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Validate theo thời gian thực
        let error = '';
        switch (name) {
            case 'username':
                error = validateUsername(value);
                break;
            case 'email':
                error = validateEmail(value);
                break;
            case 'password':
                error = validatePassword(value);
                // Cũng kiểm tra lại confirm password nếu đã nhập
                if (formData.confirmPassword) {
                    setErrors(prev => ({
                        ...prev,
                        confirmPassword: validateConfirmPassword(formData.confirmPassword, value)
                    }));
                }
                break;
            case 'confirmPassword':
                error = validateConfirmPassword(value, formData.password);
                break;
            default:
                break;
        }

        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    // Check if form is valid
    const isFormValid = () => {
        const { username, email, password, confirmPassword } = formData;
        return username && email && password && confirmPassword &&
               !errors.username && !errors.email && !errors.password && !errors.confirmPassword &&
               validateUsername(username) === '' &&
               validateEmail(email) === '' &&
               validatePassword(password) === '' &&
               validateConfirmPassword(confirmPassword, password) === '';
    };

    // Handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isFormValid()) {
            setShowToast(true);
            setShowModal(true);
        }
    };

    // Handle cancel/reset
    const handleCancel = () => {
        setFormData({
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
        setErrors({});
    };

    return (
        <Container style={{ 
            maxWidth: '600px',
            margin: '20px auto',
            padding: '30px',
            border: '2px solid #007bff',
            borderRadius: '15px',
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e3f2fd 100%)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }}>
            <h2 className="text-center mb-4" style={{ 
                color: '#007bff', 
                fontWeight: 'bold',
                fontSize: '28px'
            }}>
                📝 Form Đăng Ký Tài Khoản (Object State)
            </h2>

            <Form onSubmit={handleSubmit}>
                {/* Username Field */}
                <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: '600', fontSize: '16px' }}>
                        Username: <span style={{ color: 'red' }}>*</span>
                    </Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Nhập username (≥3 ký tự, chỉ chữ/số/_/.)"
                        isInvalid={!!errors.username}
                        style={{ fontSize: '16px', padding: '12px' }}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.username}
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                        Username phải có ít nhất 3 ký tự, chỉ chứa chữ, số, _ hoặc .
                    </Form.Text>
                </Form.Group>

                {/* Email Field */}
                <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: '600', fontSize: '16px' }}>
                        Email: <span style={{ color: 'red' }}>*</span>
                    </Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Nhập email (example@domain.com)"
                        isInvalid={!!errors.email}
                        style={{ fontSize: '16px', padding: '12px' }}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Password Field */}
                <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: '600', fontSize: '16px' }}>
                        Password: <span style={{ color: 'red' }}>*</span>
                    </Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Nhập password (≥8 ký tự, có hoa/thường/số/ký tự đặc biệt)"
                        isInvalid={!!errors.password}
                        style={{ fontSize: '16px', padding: '12px' }}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.password}
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                        Ít nhất 8 ký tự, có chữ hoa, chữ thường, số và ký tự đặc biệt (!@#$%^&*)
                    </Form.Text>
                </Form.Group>

                {/* Confirm Password Field */}
                <Form.Group className="mb-4">
                    <Form.Label style={{ fontWeight: '600', fontSize: '16px' }}>
                        Confirm Password: <span style={{ color: 'red' }}>*</span>
                    </Form.Label>
                    <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Nhập lại password"
                        isInvalid={!!errors.confirmPassword}
                        style={{ fontSize: '16px', padding: '12px' }}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Action Buttons */}
                <div className="d-flex gap-3 justify-content-center">
                    <Button
                        type="submit"
                        variant="primary"
                        disabled={!isFormValid()}
                        style={{
                            padding: '12px 30px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            borderRadius: '8px',
                            minWidth: '120px'
                        }}
                    >
                        ✅ Submit
                    </Button>
                    
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={handleCancel}
                        style={{
                            padding: '12px 30px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            borderRadius: '8px',
                            minWidth: '120px'
                        }}
                    >
                        🔄 Cancel
                    </Button>
                </div>
            </Form>

            {/* Form Data Preview */}
            <div className="mt-4" style={{ 
                background: '#f8f9fa', 
                padding: '15px', 
                borderRadius: '8px',
                border: '1px solid #dee2e6'
            }}>
                <h6 style={{ color: '#007bff', marginBottom: '10px' }}>📊 Preview Form Data:</h6>
                <pre style={{ fontSize: '14px', color: '#6c757d', margin: 0 }}>
                    {JSON.stringify(formData, null, 2)}
                </pre>
            </div>

            {/* Toast Notification */}
            <ToastContainer position="top-end" className="p-3">
                <Toast 
                    show={showToast} 
                    onClose={() => setShowToast(false)}
                    delay={3000}
                    autohide
                    bg="success"
                >
                    <Toast.Header>
                        <strong className="me-auto">✅ Thành công!</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">
                        Submitted successfully!
                    </Toast.Body>
                </Toast>
            </ToastContainer>

            {/* Success Modal */}
            <Modal 
                show={showModal} 
                onHide={() => setShowModal(false)}
                centered
                size="lg"
            >
                <Modal.Header closeButton style={{ background: '#007bff', color: 'white' }}>
                    <Modal.Title>🎉 Đăng Ký Thành Công!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card style={{ border: 'none', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                        <Card.Header style={{ background: '#28a745', color: 'white', textAlign: 'center' }}>
                            <h5 className="mb-0">✅ Thông Tin Đăng Ký</h5>
                        </Card.Header>
                        <Card.Body>
                            <div className="row">
                                <div className="col-md-6">
                                    <p><strong>👤 Username:</strong></p>
                                    <div style={{ 
                                        background: '#e3f2fd', 
                                        padding: '10px', 
                                        borderRadius: '6px',
                                        marginBottom: '15px'
                                    }}>
                                        {formData.username}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <p><strong>📧 Email:</strong></p>
                                    <div style={{ 
                                        background: '#e8f5e8', 
                                        padding: '10px', 
                                        borderRadius: '6px',
                                        marginBottom: '15px'
                                    }}>
                                        {formData.email}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <p><strong>🔐 Password:</strong></p>
                                    <div style={{ 
                                        background: '#fff3cd', 
                                        padding: '10px', 
                                        borderRadius: '6px',
                                        marginBottom: '15px'
                                    }}>
                                        {'*'.repeat(formData.password.length)} (Độ dài: {formData.password.length} ký tự)
                                    </div>
                                </div>
                            </div>
                            <Alert variant="success" className="mb-0">
                                <strong>🎊 Chúc mừng!</strong> Tài khoản của bạn đã được đăng ký thành công với tất cả thông tin hợp lệ!
                            </Alert>
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant="primary" 
                        onClick={() => setShowModal(false)}
                        style={{ padding: '10px 20px', fontWeight: 'bold' }}
                    >
                        👍 Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default RegisterFormObject;