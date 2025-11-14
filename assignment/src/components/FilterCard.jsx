import React from 'react';
import { Card, Form } from 'react-bootstrap';

const FilterCard = ({ selectedCategory, onCategoryChange }) => {
  const categories = ['All', 'Food', 'Transport', 'Entertainment', 'Shopping', 'Other'];

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <h5>Filter by Category</h5>
        <Form.Select 
          value={selectedCategory} 
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Form.Select>
      </Card.Body>
    </Card>
  );
};

export default FilterCard;
