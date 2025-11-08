// UserListPage.jsx - Trang quản lý users
import React, { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { getUsers, banUser, unbanUser } from '../services/api';
import NavigationHeader from '../components/NavigationHeader';
import UserFilter from '../components/UserFilter';
import UserTable from '../components/UserTable';
import UserDetailsModal from '../components/UserDetailsModal';
import ConfirmModal from '../components/ConfirmModal';

const UserListPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [sortBy, setSortBy] = useState('id');
    const [sortOrder, setSortOrder] = useState('asc');

    // Modal states
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null);

    // Load users
    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            setLoading(true);
            const usersData = await getUsers();
            setUsers(usersData);
            setError(null);
        } catch (err) {
            setError('Failed to load users. Please try again.');
            console.error('Error loading users:', err);
        } finally {
            setLoading(false);
        }
    };

    // Filter and sort users
    const filteredAndSortedUsers = useMemo(() => {
        let filtered = users.filter(user => {
            const matchesSearch = 
                user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.fullName.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesRole = !roleFilter || user.role === roleFilter;
            const matchesStatus = !statusFilter || user.status === statusFilter;
            
            return matchesSearch && matchesRole && matchesStatus;
        });

        // Sort users
        filtered.sort((a, b) => {
            let aValue = a[sortBy];
            let bValue = b[sortBy];
            
            if (typeof aValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }
            
            if (sortOrder === 'asc') {
                return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
            } else {
                return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
            }
        });

        return filtered;
    }, [users, searchTerm, roleFilter, statusFilter, sortBy, sortOrder]);

    // Reset filters
    const handleResetFilters = () => {
        setSearchTerm('');
        setRoleFilter('');
        setStatusFilter('');
        setSortBy('id');
        setSortOrder('asc');
    };

    // View user details
    const handleViewDetails = (user) => {
        setSelectedUser(user);
        setShowDetailsModal(true);
    };

    // Ban user
    const handleBanUser = (user) => {
        setSelectedUser(user);
        setConfirmAction({
            type: 'ban',
            title: 'Ban User Account',
            message: `Are you sure you want to ban user "${user.username}"? This will prevent them from accessing the system.`,
            confirmText: '🚫 Ban Account',
            variant: 'danger'
        });
        setShowConfirmModal(true);
    };

    // Unban user
    const handleUnbanUser = (user) => {
        setSelectedUser(user);
        setConfirmAction({
            type: 'unban',
            title: 'Unban User Account',
            message: `Are you sure you want to unban user "${user.username}"? This will restore their access to the system.`,
            confirmText: '✅ Unban Account',
            variant: 'success'
        });
        setShowConfirmModal(true);
    };

    // Execute confirmed action
    const handleConfirmAction = async () => {
        if (!selectedUser || !confirmAction) return;

        try {
            setLoading(true);
            
            if (confirmAction.type === 'ban') {
                await banUser(selectedUser.id);
            } else if (confirmAction.type === 'unban') {
                await unbanUser(selectedUser.id);
            }
            
            // Reload users to reflect changes
            await loadUsers();
            
            setShowConfirmModal(false);
            setSelectedUser(null);
            setConfirmAction(null);
        } catch (err) {
            setError(`Failed to ${confirmAction.type} user. Please try again.`);
            console.error(`Error ${confirmAction.type} user:`, err);
        } finally {
            setLoading(false);
        }
    };

    if (loading && users.length === 0) {
        return (
            <div>
                <NavigationHeader />
                <Container className="mt-4">
                    <div className="text-center">
                        <Spinner animation="border" variant="primary" />
                        <p className="mt-2">Loading users...</p>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div>
            <NavigationHeader />
            <Container className="mt-4">
                <Row>
                    <Col>
                        <h2>👥 User Management</h2>
                        <p className="text-muted">Manage user accounts, roles, and permissions</p>
                        
                        {error && (
                            <Alert variant="danger" className="mb-4">
                                {error}
                            </Alert>
                        )}

                        <UserFilter
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            roleFilter={roleFilter}
                            setRoleFilter={setRoleFilter}
                            statusFilter={statusFilter}
                            setStatusFilter={setStatusFilter}
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                            sortOrder={sortOrder}
                            setSortOrder={setSortOrder}
                            onResetFilters={handleResetFilters}
                        />

                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5>📋 Users List</h5>
                            <small className="text-muted">
                                Showing {filteredAndSortedUsers.length} of {users.length} users
                            </small>
                        </div>

                        {loading && (
                            <Alert variant="info">
                                <Spinner animation="border" size="sm" className="me-2" />
                                Processing...
                            </Alert>
                        )}

                        <UserTable 
                            users={filteredAndSortedUsers}
                            onViewDetails={handleViewDetails}
                            onBanUser={handleBanUser}
                            onUnbanUser={handleUnbanUser}
                        />
                    </Col>
                </Row>

                {/* User Details Modal */}
                <UserDetailsModal
                    show={showDetailsModal}
                    onHide={() => setShowDetailsModal(false)}
                    user={selectedUser}
                />

                {/* Confirmation Modal */}
                <ConfirmModal
                    show={showConfirmModal}
                    onHide={() => setShowConfirmModal(false)}
                    onConfirm={handleConfirmAction}
                    title={confirmAction?.title}
                    message={confirmAction?.message}
                    confirmText={confirmAction?.confirmText}
                    variant={confirmAction?.variant}
                />
            </Container>
        </div>
    );
};

export default UserListPage;