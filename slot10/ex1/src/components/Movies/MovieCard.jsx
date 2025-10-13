import React, { useState } from 'react';
import { Card, Badge, Button, Toast, Modal, Row, Col } from 'react-bootstrap';
import "./MovieCard.css";

export default function MovieCard({img, title, text, genre, year, country, duration, movie}) {
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Rút gọn description
  const truncateDescription = (text, maxLength = 100) => {
    if (text && text.length <= maxLength) return text;
    return text ? text.substring(0, maxLength) + '...' : '';
  };

  // Thêm vào favourites
  const addToFavourites = () => {
    const favourites = JSON.parse(localStorage.getItem('favourites') || '[]');
    const isAlreadyFavourite = favourites.some(fav => fav.id === movie.id);
    
    if (!isAlreadyFavourite) {
      favourites.push(movie);
      localStorage.setItem('favourites', JSON.stringify(favourites));
      setShowToast(true);
    }
  };

  // Mở modal chi tiết
  const showDetails = () => {
    setShowModal(true);
  };

  return (
    <>
      <Card className="movie-card h-100 shadow-sm">
        <div className="movie-poster-container">
          <Card.Img 
            variant="top" 
            src={img} 
            alt={`${title} poster`}
            className="movie-poster"
          />
          <div className="movie-overlay">
            <Badge bg="primary" className="genre-badge">
              {genre}
            </Badge>
          </div>
        </div>
        
        <Card.Body className="d-flex flex-column">
          <Card.Title className="movie-title">
            {title}
            <Badge bg="secondary" className="ms-2">
              {year}
            </Badge>
          </Card.Title>
          
          <Card.Text className="movie-description flex-grow-1">
            {truncateDescription(text)}
          </Card.Text>
          
          <div className="movie-info mb-3">
            <small className="text-muted d-block">
              📍 {country}
            </small>
            <small className="text-muted d-block">
              ⏱️ {duration} minutes
            </small>
          </div>
          
          <div className="movie-actions d-grid gap-2">
            <Button 
              variant="outline-primary" 
              size="sm"
              onClick={addToFavourites}
            >
              Add to Favourites
            </Button>
            <Button 
              variant="primary" 
              size="sm"
              onClick={showDetails}
            >
              Details
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Toast notification */}
      <Toast 
        show={showToast} 
        onClose={() => setShowToast(false)}
        delay={3000}
        autohide
        className="position-fixed top-0 end-0 m-3"
        style={{ zIndex: 1050 }}
      >
        <Toast.Header>
          <strong className="me-auto">Success!</strong>
        </Toast.Header>
        <Toast.Body>
          Added to favourites!
        </Toast.Body>
      </Toast>

      {/* Details Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={4}>
              <img 
                src={img} 
                alt={`${title} poster`}
                className="img-fluid rounded"
              />
            </Col>
            <Col md={8}>
              <h5>Movie Information</h5>
              <p><strong>Genre:</strong> <Badge bg="primary">{genre}</Badge></p>
              <p><strong>Year:</strong> {year}</p>
              <p><strong>Country:</strong> {country}</p>
              <p><strong>Duration:</strong> {duration} minutes</p>
              
              <h6 className="mt-3">Description</h6>
              <p>{text}</p>
              
              <h6 className="mt-3">Showtimes</h6>
              <div className="d-flex gap-2 flex-wrap">
                {movie.showtimes?.map((time, index) => (
                  <Badge key={index} bg="info" className="fs-6">
                    {time}
                  </Badge>
                ))}
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={addToFavourites}>
            Add to Favourites
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}      

