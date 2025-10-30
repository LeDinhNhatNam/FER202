import React from 'react';
import { Container, Alert } from 'react-bootstrap';
import { MovieProvider, useMovieState, useMovieDispatch } from '../contexts/MovieContext';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import MovieForm from '../components/MovieForm';
import MovieTable from '../components/MovieTable';

// Component con hiển thị nội dung, được bọc bởi MovieProvider
const MovieManagerContent = () => {
    const { user } = useAuth();
    const { 
        movies, 
        genres, 
        loading
    } = useMovieState();
    const { dispatch } = useMovieDispatch();

    const handleEditMovie = (movie) => {
        dispatch({ type: 'EDIT_MOVIE', payload: movie });
    };

    const handleDeleteMovie = (movieId) => {
        dispatch({ type: 'OPEN_DELETE_MODAL', payload: { id: movieId } });
    };

    return (
        <>
            <Header />
            <Container className="mt-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1>🎬 Quản lý Phim</h1>
                    <Alert variant="success" className="mb-0 py-2">
                        Chào mừng, <strong>{user?.username}</strong>! 
                        Bạn đang đăng nhập với quyền <strong>{user?.role?.toUpperCase()}</strong>
                    </Alert>
                </div>
                
                {/* Form thêm phim - chỉ hiện với admin/manager */}
                <MovieForm /> 
                
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2>Danh sách Phim</h2>
                    <small className="text-muted">
                        {user?.role === 'admin' && '(Bạn có thể thêm, sửa, xóa phim)'}
                        {user?.role === 'manager' && '(Bạn có thể thêm, sửa phim)'}
                        {user?.role === 'user' && '(Bạn chỉ có thể xem phim)'}
                    </small>
                </div>
                
                <MovieTable 
                    movies={movies}
                    genres={genres}
                    loading={loading}
                    onEdit={handleEditMovie}
                    onDelete={handleDeleteMovie}
                /> 
            </Container>
        </>
    );
}

// Component chính cung cấp MovieContext
const MovieManager = () => (
    <MovieProvider>
        <MovieManagerContent />
    </MovieProvider>
);

export default MovieManager;