import React, { useState } from 'react';
import { Card, Form, Row, Col, InputGroup } from 'react-bootstrap';
import './Filter.css';

const Filter = ({ onSearchChange, onYearFilterChange, onSortChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState('all');
  const [sortOption, setSortOption] = useState('title-asc');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange && onSearchChange(value);
  };

  const handleYearFilterChange = (e) => {
    const value = e.target.value;
    setYearFilter(value);
    onYearFilterChange && onYearFilterChange(value);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOption(value);
    onSortChange && onSortChange(value);
  };

  return (
    <Card className="filter-card mb-4">
      <Card.Header>
        <h5 className="mb-0">🔍 Search & Filter Movies</h5>
      </Card.Header>
      <Card.Body>
        <Row className="g-3">
          {/* Search */}
          <Col md={4}>
            <Form.Group>
              <Form.Label>Search Movies</Form.Label>
              <InputGroup>
                <InputGroup.Text>🔎</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search by title or description..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </InputGroup>
            </Form.Group>
          </Col>

          {/* Year Filter */}
          <Col md={4}>
            <Form.Group>
              <Form.Label>Filter by Year</Form.Label>
              <Form.Select
                value={yearFilter}
                onChange={handleYearFilterChange}
              >
                <option value="all">All Years</option>
                <option value="old">≤ 2000</option>
                <option value="middle">2001 - 2015</option>
                <option value="new">&gt; 2015</option>
              </Form.Select>
            </Form.Group>
          </Col>

          {/* Sort */}
          <Col md={4}>
            <Form.Group>
              <Form.Label>Sort by</Form.Label>
              <Form.Select
                value={sortOption}
                onChange={handleSortChange}
              >
                <option value="title-asc">Title A → Z</option>
                <option value="title-desc">Title Z → A</option>
                <option value="year-asc">Year ↑</option>
                <option value="year-desc">Year ↓</option>
                <option value="duration-asc">Duration ↑</option>
                <option value="duration-desc">Duration ↓</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Filter;