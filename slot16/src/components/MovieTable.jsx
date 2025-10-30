import React from 'react';
import { Table, Button, Image, Modal, Alert, Spinner, Badge } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';
import { useAuth } from '../contexts/AuthContext';

const MovieTable = () => {
  const { user } = useAuth();
  const state = useMovieState();
  const { dispatch, confirmDelete } = useMovieDispatch(); 
  
  const { movies, genres, loading, movieToDelete, showDeleteModal } = state;

  // Chỉ admin mới được xóa phim, admin và manager được sửa
  const canEdit = user?.role === 'admin' || user?.role === 'manager';
  const canDelete = user?.role === 'admin';

  // Tạo genre map từ dữ liệu API
  const genreMap = genres.reduce((map, genre) => {
    map[genre.id] = genre.name;
    return map;
  }, {});

  // Hàm để lấy màu badge theo danh mục
  const getCategoryBadgeVariant = (genreName) => {
    const categoryColors = {
      'Sci-Fi': 'primary',
      'Comedy': 'warning',
      'Drama': 'info', 
      'Horror': 'dark',
      'Romance': 'danger',
      'Action': 'success',
      'Thriller': 'secondary'
    };
    return categoryColors[genreName] || 'secondary';
  };

  const handleEditClick = (movie) => {
      dispatch({ type: 'OPEN_EDIT_MODAL', payload: movie });
  };
  
  const handleDeleteClick = (movie) => {
      dispatch({ type: 'OPEN_DELETE_MODAL', payload: movie });
  };

  return (
    <>
      {loading && movies.length === 0 ? (
          <div className="text-center my-4">
              <Spinner animation="border" role="status" variant="primary" className="me-2" />
              <Alert variant="info" className="mt-3">Đang tải dữ liệu phim...</Alert>
          </div>
      ) : (
        <Table striped bordered hover responsive className="mt-4">
          <thead>
            <tr>
              <th>Avatar</th>
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
              movies.map((movie) => {
                const genreName = genreMap[movie.genreId] || 'Unknown';
                return (
                  <tr key={movie.id}>
                    <td>
                      <Image 
                        src={movie.avatar} 
                        alt={movie.title} 
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
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
                      <Badge bg={getCategoryBadgeVariant(genreName)}>
                        {genreName}
                      </Badge>
                    </td>
                    <td>{movie.duration} phút</td>
                    <td>{movie.year}</td>
                    <td>{movie.country}</td>
                    <td>
                      {canEdit && (
                        <Button 
                          variant="primary" 
                          size="sm" 
                          onClick={() => handleEditClick(movie)} 
                          className="me-2"
                        >
                          Sửa
                        </Button>
                      )}
                      {canDelete && (
                        <Button 
                          variant="danger" 
                          size="sm" 
                          onClick={() => handleDeleteClick(movie)}
                        >
                          Xóa
                        </Button>
                      )}
                      {!canEdit && !canDelete && (
                        <Badge variant="secondary">Chỉ xem</Badge>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </Table>
      )}

      {/* MODAL XÁC NHẬN XÓA */}
      <Modal show={showDeleteModal} onHide={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận Xóa Phim</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="warning">
            <strong>Cảnh báo!</strong> Bạn có chắc chắn muốn xóa phim{' '}
            <strong>"{movieToDelete?.title}"</strong> (ID: {movieToDelete?.id}) không?
            <br />
            <small>Hành động này không thể hoàn tác!</small>
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}>
            Hủy bỏ
          </Button>
          <Button variant="danger" onClick={() => confirmDelete(movieToDelete.id)}>
            <i className="bi bi-trash me-2"></i>
            Xác nhận Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MovieTable;