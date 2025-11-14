import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExpenses } from '../redux/expenseSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TotalCard from '../components/TotalCard';
import FilterCard from '../components/FilterCard';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable';

const HomePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items: expenses, loading } = useSelector((state) => state.expenses);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expenseToEdit, setExpenseToEdit] = useState(null);

  useEffect(() => {
    if (user) {
      dispatch(fetchExpenses(user.id));
    }
  }, [dispatch, user]);

  const filteredExpenses = selectedCategory === 'All' 
    ? expenses 
    : expenses.filter(expense => expense.category === selectedCategory);

  const handleEdit = (expense) => {
    setExpenseToEdit(expense);
  };

  const handleCancelEdit = () => {
    setExpenseToEdit(null);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Container className="flex-grow-1">
        <h1 className="mb-4">Personal Budget Management</h1>
        
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <TotalCard filteredExpenses={filteredExpenses} />
            <FilterCard 
              selectedCategory={selectedCategory} 
              onCategoryChange={setSelectedCategory} 
            />
            <ExpenseForm 
              expenseToEdit={expenseToEdit} 
              onCancelEdit={handleCancelEdit} 
            />
            <ExpenseTable 
              expenses={filteredExpenses} 
              onEdit={handleEdit} 
            />
          </>
        )}
      </Container>
      <Footer />
    </div>
  );
};

export default HomePage;
