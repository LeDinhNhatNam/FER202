import React from 'react';
import { Table, Button, Image, Badge, Alert, Spinner, ButtonGroup } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

const MovieTable = ({ movies, genres, loading, onEdit, onDelete, onViewDetail }) => {
  const { user } = useAuth();

  const getGenreName = (genreId) => {
    // Chuyển đổi cả hai về cùng kiểu dữ liệu để so sánh
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
                  alt={movie.title} 
                  style={{ width: '50px', height: '70px', objectFit: 'cover' }} 
                  rounded 
                />
              </td>
              <td>#{movie.id}</td>
              <td>
                <strong>{movie.title}</strong>
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
                    variant="outline-info" 
                    onClick={() => onViewDetail(movie)}
                    title="Xem chi tiết phim"
                  >
                    Chi tiết
                  </Button>
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
                    disabled={user?.role !== 'admin'}
                    title={user?.role !== 'admin' ? 'Chỉ admin mới có quyền xóa phim' : 'Xóa phim'}
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