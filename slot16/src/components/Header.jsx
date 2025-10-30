import React from 'react';
import { Navbar, Nav, Container, Dropdown, Badge } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    if (window.confirm('Bạn có chắc chắn muốn đăng xuất?')) {
      logout();
    }
  };

  const getRoleBadgeVariant = (role) => {
    switch (role) {
      case 'admin': return 'danger';
      case 'manager': return 'warning';
      case 'user': return 'info';
      default: return 'secondary';
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="#home">
          🎬 Movie Manager
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#movies">Danh sách phim</Nav.Link>
            {user?.role === 'admin' && (
              <Nav.Link href="#add-movie">Thêm phim</Nav.Link>
            )}
          </Nav>
          
          <Nav>
            <Dropdown align="end">
              <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                <i className="bi bi-person-circle me-2"></i>
                {user?.username}
                <Badge 
                  bg={getRoleBadgeVariant(user?.role)} 
                  className="ms-2"
                >
                  {user?.role?.toUpperCase()}
                </Badge>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.ItemText>
                  <div>
                    <strong>{user?.username}</strong>
                    <br />
                    <small className="text-muted">{user?.email}</small>
                  </div>
                </Dropdown.ItemText>
                <Dropdown.Divider />
                <Dropdown.Item href="#profile">
                  <i className="bi bi-person me-2"></i>
                  Hồ sơ
                </Dropdown.Item>
                <Dropdown.Item href="#settings">
                  <i className="bi bi-gear me-2"></i>
                  Cài đặt
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout} className="text-danger">
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Đăng xuất
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;