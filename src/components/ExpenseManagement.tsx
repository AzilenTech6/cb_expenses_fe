import React, { useState } from 'react';

interface Expense {
  id: number;
  amount: number;
  date: string;
  category: string;
  description: string;
}

const predefinedCategories = ['Food', 'Transport', 'Utilities'];

const ExpenseManagement: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState(predefinedCategories);
  const [form, setForm] = useState({
    amount: '',
    date: '',
    category: '',
    description: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addExpense = () => {
    if (!form.amount || !form.date) {
      setError('Amount and Date are required.');
      return;
    }
    setError('');
    const newExpense: Expense = {
      id: Date.now(),
      amount: parseFloat(form.amount),
      date: form.date,
      category: form.category || 'Uncategorized',
      description: form.description,
    };
    setExpenses([...expenses, newExpense]);
    setForm({ amount: '', date: '', category: '', description: '' });
  };

  const deleteExpense = (id: number) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const addCategory = (newCategory: string) => {
    if (!categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">Expense Management</h2>
      <div className="mb-4">
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleInputChange}
          className="border p-2 mr-2"
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleInputChange}
          className="border p-2 mr-2"
        />
        <select
          name="category"
          value={form.category}
          onChange={handleInputChange}
          className="border p-2 mr-2"
        >
          <option value="">Select Category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleInputChange}
          className="border p-2 mr-2"
        />
        <button onClick={addExpense} className="bg-blue-500 text-white p-2">
          Add Expense
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {expenses.map(expense => (
          <li key={expense.id} className="border p-2 mb-2">
            <p>
              <strong>Amount:</strong> ${expense.amount}
            </p>
            <p>
              <strong>Date:</strong> {expense.date}
            </p>
            <p>
              <strong>Category:</strong> {expense.category}
            </p>
            <p>
              <strong>Description:</strong> {expense.description}
            </p>
            <button
              onClick={() => deleteExpense(expense.id)}
              className="bg-red-500 text-white p-1 mt-2"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseManagement;
