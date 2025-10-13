import React from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import MovieCard from './MovieCard';

const MoviesList = ({ movies }) => {
  if (!Array.isArray(movies) || movies.length === 0) {
    return (
      <Container>
        <Alert variant="info" className="text-center">
          <h5>🔍 No movies found</h5>
          <p>Try adjusting your search criteria or filters.</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container>
      <div className="mb-3">
        <small className="text-muted">
          Showing {movies.length} movie{movies.length !== 1 ? 's' : ''}
        </small>
      </div>
      <Row className="g-4">
        {movies.map((movie) => (
          <Col 
            key={movie.id} 
            xs={12}    // 1 cột trên mobile
            md={6}     // 2 cột trên tablet
            lg={4}     // 3 cột trên desktop
          >
            <MovieCard 
              img={movie.poster}
              title={movie.title}
              text={movie.description}
              genre={movie.genre}
              year={movie.year}
              country={movie.country}
              duration={movie.duration}
              movie={movie}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MoviesList;