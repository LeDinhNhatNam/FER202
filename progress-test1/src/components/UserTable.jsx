// UserTable.jsx - Component hiển thị bảng users
import React from 'react';
import { Table, Badge, Button, Image, ButtonGroup, Alert } from 'react-bootstrap';

const UserTable = ({ users, onViewDetails, onBanUser, onUnbanUser }) => {
    const getRoleBadgeVariant = (role) => {
        return role === 'admin' ? 'danger' : 'primary';
    };

    const getStatusBadgeVariant = (status) => {
        return status === 'active' ? 'success' : 'secondary';
    };

    const formatStatus = (status) => {
        return status === 'active' ? 'Active' : 'Locked';
    };

    if (users.length === 0) {
        return (
            <Alert variant="info" className="text-center">
                <h5>📭 No users found</h5>
                <p>No users match your current filter criteria.</p>
            </Alert>
        );
    }

    return (
        <div className="table-responsive">
            <Table striped bordered hover>
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Avatar</th>
                        <th>Username</th>
                        <th>Full Name</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>#{user.id}</td>
                            <td>
                                <Image 
                                    src={user.avatar || '/images/users/default-avatar.png'} 
                                    alt={user.username}
                                    width={40}
                                    height={40}
                                    roundedCircle
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/40x40/6c757d/ffffff?text=U';
                                    }}
                                />
                            </td>
                            <td>
                                <strong>{user.username}</strong>
                            </td>
                            <td>{user.fullName}</td>
                            <td>
                                <Badge bg={getRoleBadgeVariant(user.role)}>
                                    {user.role.toUpperCase()}
                                </Badge>
                            </td>
                            <td>
                                <Badge bg={getStatusBadgeVariant(user.status)}>
                                    {formatStatus(user.status)}
                                </Badge>
                            </td>
                            <td>
                                <ButtonGroup size="sm">
                                    <Button 
                                        variant="outline-info"
                                        onClick={() => onViewDetails(user)}
                                        title="View user details"
                                    >
                                        👁️ View Details
                                    </Button>
                                    {user.status === 'active' ? (
                                        <Button 
                                            variant="outline-danger"
                                            onClick={() => onBanUser(user)}
                                            title="Ban this user"
                                        >
                                            🚫 Ban Account
                                        </Button>
                                    ) : (
                                        <Button 
                                            variant="outline-success"
                                            onClick={() => onUnbanUser(user)}
                                            title="Unban this user"
                                        >
                                            ✅ Unban Account
                                        </Button>
                                    )}
                                </ButtonGroup>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default UserTable;