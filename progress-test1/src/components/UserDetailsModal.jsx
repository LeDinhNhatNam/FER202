// UserDetailsModal.jsx - Component modal hiển thị chi tiết user
import React from 'react';
import { Modal, Row, Col, Badge, Image, Button } from 'react-bootstrap';

const UserDetailsModal = ({ show, onHide, user }) => {
    if (!user) return null;

    const getRoleBadgeVariant = (role) => {
        return role === 'admin' ? 'danger' : 'primary';
    };

    const getStatusBadgeVariant = (status) => {
        return status === 'active' ? 'success' : 'secondary';
    };

    const formatStatus = (status) => {
        return status === 'active' ? 'Active' : 'Locked';
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>👤 User Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="g-3">
                    {/* Avatar Section */}
                    <Col md={4} className="text-center">
                        <Image 
                            src={user.avatar || '/images/users/default-avatar.png'} 
                            alt={user.username}
                            width={150}
                            height={150}
                            roundedCircle
                            className="border border-3 border-light shadow"
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/150x150/6c757d/ffffff?text=' + user.username.charAt(0).toUpperCase();
                            }}
                        />
                        <div className="mt-3">
                            <h5>{user.username}</h5>
                            <Badge bg={getRoleBadgeVariant(user.role)} className="me-2">
                                {user.role.toUpperCase()}
                            </Badge>
                            <Badge bg={getStatusBadgeVariant(user.status)}>
                                {formatStatus(user.status)}
                            </Badge>
                        </div>
                    </Col>

                    {/* User Info Section */}
                    <Col md={8}>
                        <h6 className="text-primary mb-3">📋 User Information</h6>
                        
                        <Row className="mb-2">
                            <Col sm={4}><strong>User ID:</strong></Col>
                            <Col sm={8}>#{user.id}</Col>
                        </Row>

                        <Row className="mb-2">
                            <Col sm={4}><strong>Username:</strong></Col>
                            <Col sm={8}>{user.username}</Col>
                        </Row>

                        <Row className="mb-2">
                            <Col sm={4}><strong>Full Name:</strong></Col>
                            <Col sm={8}>{user.fullName}</Col>
                        </Row>

                        <Row className="mb-2">
                            <Col sm={4}><strong>Role:</strong></Col>
                            <Col sm={8}>
                                <Badge bg={getRoleBadgeVariant(user.role)}>
                                    {user.role.toUpperCase()}
                                </Badge>
                            </Col>
                        </Row>

                        <Row className="mb-2">
                            <Col sm={4}><strong>Status:</strong></Col>
                            <Col sm={8}>
                                <Badge bg={getStatusBadgeVariant(user.status)}>
                                    {formatStatus(user.status)}
                                </Badge>
                            </Col>
                        </Row>

                        {/* Additional Info */}
                        <hr />
                        <h6 className="text-primary mb-3">ℹ️ Additional Information</h6>
                        
                        <Row className="mb-2">
                            <Col sm={4}><strong>Account Type:</strong></Col>
                            <Col sm={8}>
                                {user.role === 'admin' ? 'Administrator' : 'Regular User'}
                            </Col>
                        </Row>

                        <Row className="mb-2">
                            <Col sm={4}><strong>Access Level:</strong></Col>
                            <Col sm={8}>
                                {user.role === 'admin' ? 'Full Access' : 'Limited Access'}
                            </Col>
                        </Row>

                        <Row className="mb-2">
                            <Col sm={4}><strong>Can Login:</strong></Col>
                            <Col sm={8}>
                                {user.status === 'active' && user.role === 'admin' ? (
                                    <span className="text-success">✅ Yes</span>
                                ) : (
                                    <span className="text-danger">❌ No</span>
                                )}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <div className="text-muted small me-auto">
                    User information is read-only. Use action buttons in the user list to modify user status.
                </div>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UserDetailsModal;