import React from 'react';
import { Form, InputGroup, Row, Col } from 'react-bootstrap';

const AccountForm = ({ formData, setFormData, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div>
      <div className="mb-4 text-center">
        <h4>
          <span className="tab-icon me-2">🔒</span>
          Account Security
        </h4>
        <p className="text-muted">Create your login credentials</p>
      </div>
      
      <Form>
        <Row className="g-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>
                <span className="me-2">👤</span>
                Username <span className="text-danger">*</span>
              </Form.Label>
              <InputGroup>
                <InputGroup.Text>👤</InputGroup.Text>
                <Form.Control
                  type="text"
                  name="username"
                  value={formData.username || ''}
                  onChange={handleChange}
                  placeholder="Enter username"
                  isInvalid={errors.username}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Username is required
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>
                <span className="me-2">🔒</span>
                Password <span className="text-danger">*</span>
              </Form.Label>
              <InputGroup>
                <InputGroup.Text>🔒</InputGroup.Text>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password || ''}
                  onChange={handleChange}
                  placeholder="Enter password"
                  isInvalid={errors.password}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Password is required
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>

          <Col md={12}>
            <Form.Group>
              <Form.Label>
                <span className="me-2">🔒</span>
                Confirm Password <span className="text-danger">*</span>
              </Form.Label>
              <InputGroup>
                <InputGroup.Text>🔒</InputGroup.Text>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword || ''}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  isInvalid={errors.confirmPassword}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Passwords do not match
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>

          <Col md={12}>
            <Form.Group>
              <Form.Label>
                <span className="me-2">❓</span>
                Secret Question <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                name="secretQuestion"
                value={formData.secretQuestion || ''}
                onChange={handleChange}
                isInvalid={errors.secretQuestion}
                required
              >
                <option value="">Choose a secret question...</option>
                <option value="pet">What was the name of your first pet?</option>
                <option value="school">What elementary school did you attend?</option>
                <option value="city">In what city were you born?</option>
                <option value="mother">What is your mother's maiden name?</option>
                <option value="book">What is your favorite book?</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select a secret question
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={12}>
            <Form.Group>
              <Form.Label>
                <span className="me-2">💬</span>
                Answer <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="secretAnswer"
                value={formData.secretAnswer || ''}
                onChange={handleChange}
                placeholder="Enter your answer"
                isInvalid={errors.secretAnswer}
                required
              />
              <Form.Control.Feedback type="invalid">
                Answer is required
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AccountForm;