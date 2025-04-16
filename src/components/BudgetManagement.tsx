import React, { useState } from 'react';

const BudgetManagement: React.FC = () => {
  const [budgets, setBudgets] = useState<{ category: string; amount: number }[]>([]);
  const [form, setForm] = useState({ category: '', amount: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addBudget = () => {
    if (form.category && form.amount) {
      setBudgets([...budgets, { category: form.category, amount: parseFloat(form.amount) }]);
      setForm({ category: '', amount: '' });
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">Budget Management</h2>
      <div className="mb-4">
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleInputChange}
          className="border p-2 mr-2"
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleInputChange}
          className="border p-2 mr-2"
        />
        <button onClick={addBudget} className="bg-blue-500 text-white p-2">
          Add Budget
        </button>
      </div>
      <ul>
        {budgets.map((budget, index) => (
          <li key={index} className="border p-2 mb-2">
            <p>
              <strong>Category:</strong> {budget.category}
            </p>
            <p>
              <strong>Amount:</strong> ${budget.amount}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetManagement;
