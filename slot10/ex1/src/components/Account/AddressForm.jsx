import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const AddressForm = ({ formData, setFormData, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const countries = [
    'Vietnam', 'United States', 'United Kingdom', 'Canada', 'Australia',
    'Germany', 'France', 'Japan', 'South Korea', 'Singapore', 'Thailand',
    'Malaysia', 'Indonesia', 'Philippines', 'India', 'China'
  ];

  return (
    <div>
      <div className="mb-4 text-center">
        <h4>
          <span className="tab-icon me-2">📍</span>
          Address Information
        </h4>
        <p className="text-muted">Where can we reach you?</p>
      </div>
      
      <Form>
        <Row className="g-3">
          <Col md={12}>
            <Form.Group>
              <Form.Label>
                <span className="me-2">🏠</span>
                Street Address <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="street"
                value={formData.street || ''}
                onChange={handleChange}
                placeholder="Enter street address"
                isInvalid={errors.street}
                required
              />
              <Form.Control.Feedback type="invalid">
                Street address is required
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>
                <span className="me-2">🏙️</span>
                City <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={formData.city || ''}
                onChange={handleChange}
                placeholder="Enter city"
                isInvalid={errors.city}
                required
              />
              <Form.Control.Feedback type="invalid">
                City is required
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>
                <span className="me-2">�️</span>
                State/Province <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="state"
                value={formData.state || ''}
                onChange={handleChange}
                placeholder="Enter state/province"
                isInvalid={errors.state}
                required
              />
              <Form.Control.Feedback type="invalid">
                State is required
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>
                <span className="me-2">📮</span>
                Zip Code <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="zipCode"
                value={formData.zipCode || ''}
                onChange={handleChange}
                placeholder="Enter zip code"
                isInvalid={errors.zipCode}
                required
              />
              <Form.Control.Feedback type="invalid">
                Zip code is required
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>
                <span className="me-2">🌍</span>
                Country <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                name="country"
                value={formData.country || ''}
                onChange={handleChange}
                isInvalid={errors.country}
                required
              >
                <option value="">Select a country...</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select a country
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddressForm;