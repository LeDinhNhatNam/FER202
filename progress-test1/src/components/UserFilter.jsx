// UserFilter.jsx - Component lọc và tìm kiếm users
import React from 'react';
import { Row, Col, Form, InputGroup, Button, Card } from 'react-bootstrap';

const UserFilter = ({ 
    searchTerm, 
    setSearchTerm, 
    roleFilter, 
    setRoleFilter, 
    statusFilter, 
    setStatusFilter,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    onResetFilters
}) => {
    return (
        <Card className="mb-4">
            <Card.Header>
                <h6 className="mb-0">🔍 Filter & Search Users</h6>
            </Card.Header>
            <Card.Body>
                <Row className="g-3">
                    {/* Search */}
                    <Col md={6}>
                        <Form.Label>Search Users</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Search by username or full name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {searchTerm && (
                                <Button 
                                    variant="outline-secondary" 
                                    onClick={() => setSearchTerm('')}
                                >
                                    ✕
                                </Button>
                            )}
                        </InputGroup>
                    </Col>

                    {/* Role Filter */}
                    <Col md={3}>
                        <Form.Label>Role</Form.Label>
                        <Form.Select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                        >
                            <option value="">All Roles</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </Form.Select>
                    </Col>

                    {/* Status Filter */}
                    <Col md={3}>
                        <Form.Label>Status</Form.Label>
                        <Form.Select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="">All Status</option>
                            <option value="active">Active</option>
                            <option value="locked">Locked</option>
                        </Form.Select>
                    </Col>

                    {/* Sort By */}
                    <Col md={4}>
                        <Form.Label>Sort By</Form.Label>
                        <Form.Select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="id">ID</option>
                            <option value="username">Username</option>
                            <option value="fullName">Full Name</option>
                            <option value="role">Role</option>
                            <option value="status">Status</option>
                        </Form.Select>
                    </Col>

                    {/* Sort Order */}
                    <Col md={4}>
                        <Form.Label>Sort Order</Form.Label>
                        <Form.Select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </Form.Select>
                    </Col>

                    {/* Reset Button */}
                    <Col md={4} className="d-flex align-items-end">
                        <Button 
                            variant="outline-secondary" 
                            onClick={onResetFilters}
                            className="w-100"
                        >
                            🔄 Reset Filters
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default UserFilter;