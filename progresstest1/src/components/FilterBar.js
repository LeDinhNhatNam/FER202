import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Form, InputGroup } from 'react-bootstrap';

const FilterBar = ({ 
  onSearchChange, 
  onSemesterFilterChange, 
  onCourseFilterChange, 
  onSortChange, 
  semesters = [], 
  courses = [],
  searchTerm = '',
  selectedSemester = '',
  selectedCourse = '',
  sortBy = 'courseName_asc'
}) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(localSearchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearchTerm, onSearchChange]);

  const sortOptions = [
    { value: 'courseName_asc', label: 'Course name A→Z' },
    { value: 'courseName_desc', label: 'Course name Z→A' },
    { value: 'date_asc', label: 'Date ascending' },
    { value: 'date_desc', label: 'Date descending' },
    { value: 'amount_asc', label: 'Amount ascending' },
    { value: 'amount_desc', label: 'Amount descending' }
  ];

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header className="bg-light">
        <h5 className="mb-0 d-flex align-items-center">
          🔍 Filter and Sorting
        </h5>
      </Card.Header>
      <Card.Body>
        <Row className="g-3">
          {/* Search */}
          <Col md={6} lg={4}>
            <Form.Label className="fw-semibold">
              🔍 Search
            </Form.Label>
            <InputGroup>
              <InputGroup.Text>
                🔍
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search by semester or course name..."
                value={localSearchTerm}
                onChange={(e) => setLocalSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>

          {/* Semester Filter */}
          <Col md={6} lg={3}>
            <Form.Label className="fw-semibold">Filter by Semester</Form.Label>
            <Form.Select
              value={selectedSemester}
              onChange={(e) => onSemesterFilterChange(e.target.value)}
            >
              <option value="">All Semesters</option>
              {semesters.map((semester, index) => (
                <option key={index} value={semester}>
                  {semester}
                </option>
              ))}
            </Form.Select>
          </Col>

          {/* Course Filter */}
          <Col md={6} lg={3}>
            <Form.Label className="fw-semibold">Filter by Course</Form.Label>
            <Form.Select
              value={selectedCourse}
              onChange={(e) => onCourseFilterChange(e.target.value)}
            >
              <option value="">All Courses</option>
              {courses.map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
            </Form.Select>
          </Col>

          {/* Sort */}
          <Col md={6} lg={2}>
            <Form.Label className="fw-semibold">
              ⬇️ Sort by
            </Form.Label>
            <Form.Select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default FilterBar;