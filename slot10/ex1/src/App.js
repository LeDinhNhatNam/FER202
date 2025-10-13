import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import HomePage from './pages/HomePage.jsx';
import AccountPage from './pages/AccountPage.jsx';
import FooterPage from './pages/FooterPage.jsx';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  
  const renderPage = () => {
    switch(currentPage) {
      case 'account':
        return <AccountPage />;
      case 'home':
      default:
        return (
          <>
            <HomePage />
            <FooterPage />
          </>
        );
    }
  };
  
  return (
    <div>
      {/* Navigation để test dễ dàng */}
      <Container className="py-2 bg-light">
        <Row className="justify-content-center">
          <Col xs="auto">
            <Button 
              variant={currentPage === 'home' ? 'primary' : 'outline-primary'}
              onClick={() => setCurrentPage('home')}
              className="me-2"
            >
              🏠 Home Page
            </Button>
            <Button 
              variant={currentPage === 'account' ? 'primary' : 'outline-primary'}
              onClick={() => setCurrentPage('account')}
            >
              👤 Account Page
            </Button>
          </Col>
        </Row>
      </Container>
      
      {/* Render trang hiện tại */}
      {renderPage()}
    </div>
  );
}

export default App;
