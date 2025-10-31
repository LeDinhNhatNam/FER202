import React, { useState, useMemo } from 'react';
import { Container, Alert, Row, Col, Form, InputGroup, Button, Card } from 'react-bootstrap';
import { MovieProvider, useMovieState, useMovieDispatch } from '../contexts/MovieContext';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import MovieForm from '../components/MovieForm';
import MovieTable from '../components/MovieTable';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import MovieDetailModal from '../components/MovieDetailModal';

const MovieManagerContent = () => {
    const { user } = useAuth();
    const { 
        movies, 
        genres, 
        loading,
        showDeleteModal,
        movieToDelete,
        showDetailModal,
        movieToView
    } = useMovieState();
    const { dispatch, confirmDelete } = useMovieDispatch();

    // State cho tìm kiếm và lọc
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');

    const handleEditMovie = (movie) => {
        dispatch({ type: 'EDIT_MOVIE', payload: movie });
    };

    const handleDeleteMovie = (movieId) => {
        const movieToDelete = movies.find(movie => movie.id === movieId);
        dispatch({ type: 'OPEN_DELETE_MODAL', payload: movieToDelete });
    };

    const handleCloseDeleteModal = () => {
        dispatch({ type: 'CLOSE_DELETE_MODAL' });
    };

    const handleConfirmDelete = () => {
        if (movieToDelete?.id) {
            confirmDelete(movieToDelete.id);
        }
    };

    const handleViewDetail = (movie) => {
        dispatch({ type: 'OPEN_DETAIL_MODAL', payload: movie });
    };

    const handleCloseDetailModal = () => {
        dispatch({ type: 'CLOSE_DETAIL_MODAL' });
    };

    // Lọc phim dựa trên criteria
    const filteredMovies = useMemo(() => {
        return movies.filter(movie => {
            const matchesSearch = movie.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                movie.description?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesGenre = selectedGenre === '' || movie.genreId.toString() === selectedGenre;
            const matchesYear = selectedYear === '' || movie.year.toString() === selectedYear;
            const matchesCountry = selectedCountry === '' || movie.country?.toLowerCase().includes(selectedCountry.toLowerCase());
            
            return matchesSearch && matchesGenre && matchesYear && matchesCountry;
        });
    }, [movies, searchTerm, selectedGenre, selectedYear, selectedCountry]);

    // Lấy danh sách năm và quốc gia unique
    const uniqueYears = [...new Set(movies.map(movie => movie.year))].sort((a, b) => b - a);
    const uniqueCountries = [...new Set(movies.map(movie => movie.country))].sort();

    // Reset filters
    const handleResetFilters = () => {
        setSearchTerm('');
        setSelectedGenre('');
        setSelectedYear('');
        setSelectedCountry('');
    };

    // Check quyền thêm phim
    const canAddMovie = user?.role === 'admin' || user?.role === 'manager';

    return (
        <>
            <Header />
            <Container className="mt-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1>🎬 Quản lý Phim</h1>
                    <Alert variant="success" className="mb-0 py-2">
                        Welcome <strong>{user?.role?.toUpperCase()}</strong> - <strong>{user?.username}</strong>!
                    </Alert>
                </div>
                
                {/* Form thêm phim - chỉ hiện với admin/manager */}
                {canAddMovie && <MovieForm />}
                
                {/* Search và Filter Section */}
                <Card className="mb-4">
                    <Card.Header>
                        <h5 className="mb-0">🔍 Tìm kiếm và Lọc phim</h5>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col md={6} lg={3} className="mb-3">
                                <Form.Label>Tìm kiếm theo tên/mô tả:</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nhập tên phim hoặc mô tả..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </InputGroup>
                            </Col>
                            
                            <Col md={6} lg={2} className="mb-3">
                                <Form.Label>Thể loại:</Form.Label>
                                <Form.Select
                                    value={selectedGenre}
                                    onChange={(e) => setSelectedGenre(e.target.value)}
                                >
                                    <option value="">Tất cả thể loại</option>
                                    {genres.map(genre => (
                                        <option key={genre.id} value={genre.id}>
                                            {genre.name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Col>
                            
                            <Col md={6} lg={2} className="mb-3">
                                <Form.Label>Năm:</Form.Label>
                                <Form.Select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                >
                                    <option value="">Tất cả năm</option>
                                    {uniqueYears.map(year => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Col>
                            
                            <Col md={6} lg={2} className="mb-3">
                                <Form.Label>Quốc gia:</Form.Label>
                                <Form.Select
                                    value={selectedCountry}
                                    onChange={(e) => setSelectedCountry(e.target.value)}
                                >
                                    <option value="">Tất cả quốc gia</option>
                                    {uniqueCountries.map(country => (
                                        <option key={country} value={country}>
                                            {country}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Col>
                            
                            <Col md={12} lg={3} className="d-flex align-items-end mb-3">
                                <Button 
                                    variant="outline-secondary" 
                                    onClick={handleResetFilters}
                                    className="w-100"
                                >
                                    🔄 Reset bộ lọc
                                </Button>
                            </Col>
                        </Row>
                        
                        <Row>
                            <Col>
                                <small className="text-muted">
                                    Tìm thấy <strong>{filteredMovies.length}</strong> phim 
                                    {searchTerm && ` chứa "${searchTerm}"`}
                                    {selectedGenre && ` thuộc thể loại "${genres.find(g => g.id === selectedGenre)?.name}"`}
                                    {selectedYear && ` năm ${selectedYear}`}
                                    {selectedCountry && ` từ ${selectedCountry}`}
                                </small>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2>📋 Danh sách Phim</h2>
                    <small className="text-muted">
                        {user?.role === 'admin' && '(Bạn có thể thêm, sửa, xóa phim)'}
                        {user?.role === 'manager' && '(Bạn có thể thêm, sửa phim - không thể xóa)'}
                        {user?.role === 'user' && '(Bạn chỉ có thể xem phim)'}
                    </small>
                </div>
                
                <MovieTable 
                    movies={filteredMovies}
                    genres={genres}
                    loading={loading}
                    onEdit={handleEditMovie}
                    onDelete={handleDeleteMovie}
                    onViewDetail={handleViewDetail}
                />

                {/* Modal xác nhận xóa */}
                <DeleteConfirmModal
                    show={showDeleteModal}
                    onHide={handleCloseDeleteModal}
                    onConfirm={handleConfirmDelete}
                    movieTitle={movieToDelete?.title || 'N/A'}
                />

                {/* Modal xem chi tiết */}
                <MovieDetailModal
                    show={showDetailModal}
                    onHide={handleCloseDetailModal}
                    movie={movieToView}
                    genres={genres}
                />
            </Container>
        </>
    );
}

const MovieManager = () => (
    <MovieProvider>
        <MovieManagerContent />
    </MovieProvider>
);

export default MovieManager;