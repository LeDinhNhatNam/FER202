import React from 'react';
import { Table, Button, Image, Badge, Alert, Spinner, ButtonGroup } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

const MovieTable = ({ movies, genres, loading, onEdit, onDelete }) => {
  const { user } = useAuth();

  const getGenreName = (genreId) => {
    const genre = genres.find(g => g.id === genreId);
    return genre ? genre.genreName : 'Không xác định';
  };

  const getCategoryBadgeVariant = (genreName) => {
    const variants = {
      'Action': 'danger',
      'Comedy': 'warning', 
      'Drama': 'info',
      'Horror': 'dark',
      'Romance': 'success',
      'Sci-Fi': 'primary',
      'Thriller': 'secondary'
    };
    return variants[genreName] || 'secondary';
  };

  if (loading && movies.length === 0) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" role="status" variant="primary" className="me-2" />
        <Alert variant="info" className="mt-3">Đang tải dữ liệu phim...</Alert>
      </div>
    );
  }

  return (
    <Table striped bordered hover responsive className="mt-4">
      <thead>
        <tr>
          <th>Poster</th>
          <th>ID</th>
          <th>Tên Phim</th>
          <th>Danh mục</th>
          <th>Thời lượng</th>
          <th>Năm</th>
          <th>Quốc gia</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {movies.length === 0 ? (
          <tr>
            <td colSpan="8" className="text-center">
              <Alert variant="info" className="mb-0">
                Không có phim nào để hiển thị
              </Alert>
            </td>
          </tr>
        ) : (
          movies.map((movie) => (
            <tr key={movie.id}>
              <td>
                <Image 
                  src={movie.poster} 
                  alt={movie.movieName} 
                  style={{ width: '50px', height: '70px', objectFit: 'cover' }} 
                  rounded 
                />
              </td>
              <td>#{movie.id}</td>
              <td>
                <strong>{movie.movieName}</strong>
                <br />
                <small className="text-muted">
                  {movie.description?.substring(0, 50)}...
                </small>
              </td>
              <td>
                <Badge bg={getCategoryBadgeVariant(getGenreName(movie.genreId))}>
                  {getGenreName(movie.genreId)}
                </Badge>
              </td>
              <td>{movie.duration} phút</td>
              <td>{movie.year}</td>
              <td>{movie.country}</td>
              <td>
                <ButtonGroup size="sm">
                  <Button 
                    variant="outline-primary" 
                    onClick={() => onEdit(movie)}
                    disabled={user?.role === 'user'}
                  >
                    Sửa
                  </Button>
                  <Button 
                    variant="outline-danger" 
                    onClick={() => onDelete(movie.id)}
                    disabled={user?.role === 'user'}
                  >
                    Xóa
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};

export default MovieTable;