import React, { useState, useMemo } from "react";
import { Container } from "react-bootstrap";
import NavBar from "../components/NavBar/NavBar";
import HomeCarousel from "../components/Carousel/HomeCarousel";
import Filter from "../components/Filter/Filter";
import MoviesList from "../components/Movies/MoviesList";
import { movies } from "../data/movies";

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState('all');
  const [sortOption, setSortOption] = useState('title-asc');

  // Filter and sort movies based on current settings
  const filteredAndSortedMovies = useMemo(() => {
    let filteredMovies = [...movies];

    // Search filter
    if (searchTerm) {
      filteredMovies = filteredMovies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Year filter
    if (yearFilter !== 'all') {
      filteredMovies = filteredMovies.filter(movie => {
        const year = movie.year;
        switch (yearFilter) {
          case 'old':
            return year <= 2000;
          case 'middle':
            return year >= 2001 && year <= 2015;
          case 'new':
            return year > 2015;
          default:
            return true;
        }
      });
    }

    // Sort movies
    filteredMovies.sort((a, b) => {
      switch (sortOption) {
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        case 'year-asc':
          return a.year - b.year;
        case 'year-desc':
          return b.year - a.year;
        case 'duration-asc':
          return a.duration - b.duration;
        case 'duration-desc':
          return b.duration - a.duration;
        default:
          return 0;
      }
    });

    return filteredMovies;
  }, [searchTerm, yearFilter, sortOption]);

  return (
    <div>
      <NavBar />
      <HomeCarousel />
      <Container className="mt-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary mb-3">Featured Movies Collections</h2>
          <p className="text-secondary fs-5">
            Discover our carefully curated selection of the latest and greatest movies
          </p>
        </div>
        
        <Filter 
          onSearchChange={setSearchTerm}
          onYearFilterChange={setYearFilter}
          onSortChange={setSortOption}
        />
        
        <MoviesList movies={filteredAndSortedMovies} />
      </Container>
    </div>
  );
}
