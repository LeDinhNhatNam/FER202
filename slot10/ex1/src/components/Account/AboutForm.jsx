import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const AboutForm = ({ formData, setFormData, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      avatar: file
    }));
  };

  return (
    <div>
      <div className="mb-4 text-center">
        <h4>
          <span className="tab-icon me-2">👤</span>
          Personal Information
        </h4>
        <p className="text-muted">Tell us about yourself</p>
      </div>
      
      <Form>
        <Row className="g-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>
                <span className="me-2">👤</span>
                First Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName || ''}
                onChange={handleChange}
                placeholder="Enter first name"
                isInvalid={errors.firstName}
                required
              />
              <Form.Control.Feedback type="invalid">
                First name is required
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>
                <span className="me-2">👤</span>
                Last Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName || ''}
                onChange={handleChange}
                placeholder="Enter last name"
                isInvalid={errors.lastName}
                required
              />
              <Form.Control.Feedback type="invalid">
                Last name is required
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>
                <span className="me-2">📧</span>
                Email <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                placeholder="Enter email address"
                isInvalid={errors.email}
                required
              />
              <Form.Control.Feedback type="invalid">
                Valid email is required
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>
                <span className="me-2">📱</span>
                Phone <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone || ''}
                onChange={handleChange}
                placeholder="Enter phone number"
                isInvalid={errors.phone}
                required
              />
              <Form.Control.Feedback type="invalid">
                Phone number is required
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>
                <span className="me-2">🎂</span>
                Age <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={formData.age || ''}
                onChange={handleChange}
                placeholder="Enter age"
                min="1"
                max="120"
                isInvalid={errors.age}
                required
              />
              <Form.Control.Feedback type="invalid">
                Age is required (1-120)
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>
                <span className="me-2">🖼️</span>
                Avatar (Optional)
              </Form.Label>
              <Form.Control
                type="file"
                name="avatar"
                onChange={handleFileChange}
                accept="image/*"
              />
              <Form.Text className="text-muted">
                Upload a profile picture (JPG, PNG, GIF)
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AboutForm;