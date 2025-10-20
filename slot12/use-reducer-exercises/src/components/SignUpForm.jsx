import React from 'react';
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap';

function SignUpForm() {
  return (
    <Container fluid>
      <div className="p-5 bg-primary text-white text-center" style={{height: '200px'}}>
      </div>

      <Card className='mx-5 mb-5 p-4 shadow' style={{marginTop: '-100px', backgroundColor: 'rgba(255, 255, 255, 0.95)'}}>
        <Card.Body className='p-4 text-center'>
          <h2 className="fw-bold mb-4">Sign up </h2>

          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className='mb-4'>
                  <Form.Label>First name</Form.Label>
                  <Form.Control type='text' />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className='mb-4'>
                  <Form.Label>Last name</Form.Label>
                  <Form.Control type='text' />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className='mb-4'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' />
            </Form.Group>

            <Form.Group className='mb-4'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' />
            </Form.Group>

            <Button variant="primary" className='w-100 mb-4' size='lg'>
              Sign Up
            </Button>
          </Form>

        </Card.Body>
      </Card>

    </Container>
  );
}

export default SignUpForm;