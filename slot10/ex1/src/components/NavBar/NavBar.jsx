import React from 'react';
import { Navbar, Nav, Form, InputGroup, Button, NavDropdown, Container } from 'react-bootstrap';
import './NavBar.css';

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand href="#home">🎬 MovieHub</Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
          
          {/* Quick Search Form */}
          <Form className="d-flex me-3">
            <InputGroup>
              <Form.Control
                type="search"
                placeholder="Quick search..."
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-light">🔍 Search</Button>
            </InputGroup>
          </Form>
          
          {/* User Actions */}
          <Nav>
            {/* Accounts Dropdown */}
            <NavDropdown title="👤 Account" id="account-dropdown">
              <NavDropdown.Item href="#manage-profiles">
                👥 Manage Your Profiles
              </NavDropdown.Item>
              <NavDropdown.Item href="#build-account">
                🔧 Build your Account
              </NavDropdown.Item>
              <NavDropdown.Item href="#change-password">
                🔒 Change Password
              </NavDropdown.Item>
            </NavDropdown>
            
            {/* Login */}
            <Nav.Link href="#login">🔑 Login</Nav.Link>
            
            {/* Favourites */}
            <Nav.Link href="#favourites">❤️ Favourites</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;