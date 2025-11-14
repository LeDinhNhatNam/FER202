import React from 'react';
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const TotalCard = ({ filteredExpenses }) => {
  const total = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  const formatVND = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <h5 className="mb-0">Total Expenses</h5>
        <h2 className="text-primary mb-0">{formatVND(total)}</h2>
      </Card.Body>
    </Card>
  );
};

export default TotalCard;
