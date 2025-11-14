import axios from 'axios';

const API_URL = 'http://localhost:3001';

// Auth APIs
export const login = async (username, password) => {
  const response = await axios.get(`${API_URL}/users`);
  const user = response.data.find(
    u => u.username === username && u.password === password
  );
  return user;
};

// Expense APIs
export const getExpenses = async () => {
  const response = await axios.get(`${API_URL}/expenses`);
  return response.data;
};

export const getExpensesByUserId = async (userId) => {
  const response = await axios.get(`${API_URL}/expenses?userId=${userId}`);
  return response.data;
};

export const createExpense = async (expense) => {
  const response = await axios.post(`${API_URL}/expenses`, expense);
  return response.data;
};

export const updateExpense = async (id, expense) => {
  const response = await axios.put(`${API_URL}/expenses/${id}`, expense);
  return response.data;
};

export const deleteExpense = async (id) => {
  await axios.delete(`${API_URL}/expenses/${id}`);
};
