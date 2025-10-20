import React from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

function LoginForm() {
  return (
    <Container className="p-3 my-5 d-flex flex-column w-50">
      <h2 className="text-center mb-4">Login Form</h2>
      
      <Form>
        <Form.Group className="mb-4">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" id="form1" />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" id="form2" />
        </Form.Group>

        <div className="d-flex justify-content-between mx-3 mb-4">
          <Form.Check 
            type="checkbox"
            id="flexCheckDefault"
            label="Remember me"
          />
          <a href="#!">Forgot password?</a>
        </div>

        <Button variant="primary" className="mb-4 w-100">
          Sign in
        </Button>
      </Form>

    </Container>
  );
}

export default LoginForm;