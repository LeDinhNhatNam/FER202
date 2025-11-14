import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense, editExpense } from '../redux/expenseSlice';

const ExpenseForm = ({ expenseToEdit, onCancelEdit }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'Food',
    date: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (expenseToEdit) {
      setFormData({
        description: expenseToEdit.description,
        amount: expenseToEdit.amount,
        category: expenseToEdit.category,
        date: expenseToEdit.date,
      });
    } else {
      resetForm();
    }
  }, [expenseToEdit]);

  const resetForm = () => {
    setFormData({
      description: '',
      amount: '',
      category: 'Food',
      date: '',
    });
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const expenseData = {
      ...formData,
      amount: parseFloat(formData.amount),
      userId: user.id,
    };

    if (expenseToEdit) {
      dispatch(editExpense({ id: expenseToEdit.id, expense: expenseData }));
      onCancelEdit();
    } else {
      dispatch(addExpense(expenseData));
      resetForm();
    }
  };

  const handleCancel = () => {
    resetForm();
    if (onCancelEdit) onCancelEdit();
  };

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <h5>{expenseToEdit ? 'Edit Expense' : 'Add New Expense'}</h5>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Amount (VND)</Form.Label>
            <Form.Control
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              isInvalid={!!errors.amount}
            />
            <Form.Control.Feedback type="invalid">
              {errors.amount}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Shopping">Shopping</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              isInvalid={!!errors.date}
            />
            <Form.Control.Feedback type="invalid">
              {errors.date}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex gap-2">
            <Button variant="primary" type="submit">
              {expenseToEdit ? 'Update' : 'Add'}
            </Button>
            {expenseToEdit && (
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            )}
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ExpenseForm;
