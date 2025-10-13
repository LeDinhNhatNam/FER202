import React, { useState } from 'react';
import { Container, Card, Nav, ProgressBar, Button, Row, Col, Alert } from 'react-bootstrap';
import AboutForm from '../components/Account/AboutForm';
import AccountForm from '../components/Account/AccountForm';
import AddressForm from '../components/Account/AddressForm';
import './AccountPage.css';

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const tabs = [
    { key: 'about', title: 'About', icon: '👤', progress: 33 },
    { key: 'account', title: 'Account', icon: '🔒', progress: 67 },
    { key: 'address', title: 'Address', icon: '📍', progress: 100 }
  ];

  const validateCurrentStep = () => {
    const newErrors = {};

    if (activeTab === 'about') {
      if (!formData.firstName?.trim()) newErrors.firstName = true;
      if (!formData.lastName?.trim()) newErrors.lastName = true;
      if (!formData.email?.trim()) newErrors.email = true;
      if (!formData.phone?.trim()) newErrors.phone = true;
      if (!formData.age || formData.age < 1 || formData.age > 120) newErrors.age = true;
    } else if (activeTab === 'account') {
      if (!formData.username?.trim()) newErrors.username = true;
      if (!formData.password?.trim()) newErrors.password = true;
      if (!formData.confirmPassword?.trim() || formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = true;
      }
      if (!formData.secretQuestion?.trim()) newErrors.secretQuestion = true;
      if (!formData.secretAnswer?.trim()) newErrors.secretAnswer = true;
    } else if (activeTab === 'address') {
      if (!formData.street?.trim()) newErrors.street = true;
      if (!formData.city?.trim()) newErrors.city = true;
      if (!formData.state?.trim()) newErrors.state = true;
      if (!formData.zipCode?.trim()) newErrors.zipCode = true;
      if (!formData.country?.trim()) newErrors.country = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      const currentIndex = tabs.findIndex(tab => tab.key === activeTab);
      if (currentIndex < tabs.length - 1) {
        setActiveTab(tabs[currentIndex + 1].key);
      }
    }
  };

  const handlePrevious = () => {
    const currentIndex = tabs.findIndex(tab => tab.key === activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].key);
    }
  };

  const handleFinish = () => {
    if (validateCurrentStep()) {
      console.log('Form Data:', formData);
      setShowSuccess(true);
      // Reset form after successful submission
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({});
        setActiveTab('about');
        setErrors({});
      }, 3000);
    }
  };

  const getCurrentProgress = () => {
    const currentTab = tabs.find(tab => tab.key === activeTab);
    return currentTab ? currentTab.progress : 0;
  };

  const renderForm = () => {
    switch (activeTab) {
      case 'about':
        return <AboutForm formData={formData} setFormData={setFormData} errors={errors} />;
      case 'account':
        return <AccountForm formData={formData} setFormData={setFormData} errors={errors} />;
      case 'address':
        return <AddressForm formData={formData} setFormData={setFormData} errors={errors} />;
      default:
        return null;
    }
  };

  return (
    <Container className="account-page py-5">
      <Row className="justify-content-center">
        <Col lg={10}>
          {showSuccess && (
            <Alert variant="success" className="mb-4">
              🎉 Profile created successfully! Welcome to MovieHub!
            </Alert>
          )}

          <Card className="account-card shadow-lg">
            <Card.Header className="text-center">
              <h2 className="mb-3">🚀 Build Your Profile</h2>
              <ProgressBar 
                now={getCurrentProgress()} 
                label={`${getCurrentProgress()}%`}
                className="mb-3"
                variant="success"
              />
            </Card.Header>

            <Card.Body>
              {/* Tab Navigation */}
              <Nav variant="pills" className="justify-content-center mb-4">
                {tabs.map((tab) => (
                  <Nav.Item key={tab.key}>
                    <Nav.Link
                      active={activeTab === tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className="tab-link"
                    >
                      <span className="tab-icon">{tab.icon}</span>
                      {tab.title}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>

              {/* Form Content */}
              <div className="form-content">
                {renderForm()}
              </div>

              {/* Navigation Buttons */}
              <div className="d-flex justify-content-between mt-4">
                <Button
                  variant="outline-secondary"
                  onClick={handlePrevious}
                  disabled={activeTab === 'about'}
                >
                  ← Previous
                </Button>

                <div>
                  {activeTab === 'address' ? (
                    <Button
                      variant="success"
                      onClick={handleFinish}
                    >
                      ✅ Finish
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={handleNext}
                    >
                      Next →
                    </Button>
                  )}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AccountPage;