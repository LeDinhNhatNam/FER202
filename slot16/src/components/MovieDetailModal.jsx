import React from 'react';
import { Modal, Button, Row, Col, Image, Badge, Table } from 'react-bootstrap';

const MovieDetailModal = ({ show, onHide, movie, genres }) => {
  if (!movie) return null;

  const getGenreName = (genreId) => {
    const genre = genres.find(g => parseInt(g.id) === parseInt(genreId));
    return genre ? genre.name : 'Không xác định';
  };

  const getCategoryBadgeVariant = (genreName) => {
    const variants = {
      'Sci-Fi': 'primary',
      'Comedy': 'warning', 
      'Drama': 'info',
      'Horror': 'dark',
      'Romance': 'danger',
      'Action': 'success',
      'Thriller': 'secondary'
    };
    return variants[genreName] || 'secondary';
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>🎬 Chi tiết phim</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          {/* Poster */}
          <Col md={4} className="text-center mb-3">
            <Image 
              src={movie.poster} 
              alt={movie.title}
              style={{ 
                width: '100%', 
                maxWidth: '200px',
                height: 'auto',
                objectFit: 'cover',
                borderRadius: '8px'
              }}
              className="shadow"
            />
          </Col>
          
          {/* Thông tin chi tiết */}
          <Col md={8}>
            <h3 className="mb-3 text-primary">{movie.title}</h3>
            
            <Table borderless className="mb-0">
              <tbody>
                <tr>
                  <td className="fw-bold text-muted" style={{width: '30%'}}>ID:</td>
                  <td>#{movie.id}</td>
                </tr>
                <tr>
                  <td className="fw-bold text-muted">Thể loại:</td>
                  <td>
                    <Badge bg={getCategoryBadgeVariant(getGenreName(movie.genreId))}>
                      {getGenreName(movie.genreId)}
                    </Badge>
                  </td>
                </tr>
                <tr>
                  <td className="fw-bold text-muted">Thời lượng:</td>
                  <td>{movie.duration} phút</td>
                </tr>
                <tr>
                  <td className="fw-bold text-muted">Năm sản xuất:</td>
                  <td>{movie.year}</td>
                </tr>
                <tr>
                  <td className="fw-bold text-muted">Quốc gia:</td>
                  <td>{movie.country}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        
        {/* Mô tả */}
        <Row className="mt-4">
          <Col>
            <h5 className="text-secondary mb-3">📝 Mô tả phim:</h5>
            <div 
              className="p-3 bg-light rounded"
              style={{ 
                minHeight: '80px',
                lineHeight: '1.6'
              }}
            >
              {movie.description || 'Chưa có mô tả cho phim này.'}
            </div>
          </Col>
        </Row>
        
        {/* Thông tin thêm */}
        <Row className="mt-3">
          <Col>
            <div className="d-flex justify-content-between align-items-center text-muted small">
              <span>
                <i className="bi bi-clock"></i> Thời lượng: <strong>{movie.duration}</strong> phút
              </span>
              <span>
                <i className="bi bi-calendar"></i> Năm: <strong>{movie.year}</strong>
              </span>
              <span>
                <i className="bi bi-geo-alt"></i> Quốc gia: <strong>{movie.country}</strong>
              </span>
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          ✖️ Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MovieDetailModal;