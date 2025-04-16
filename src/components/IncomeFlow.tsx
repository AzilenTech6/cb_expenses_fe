import React, { useState } from 'react';

interface Income {
  id: number;
  amount: number;
  date: string;
  source: string;
}

const IncomeFlow: React.FC = () => {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [form, setForm] = useState({ amount: '', date: '', source: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addIncome = () => {
    if (form.amount && form.date && form.source) {
      const newIncome: Income = {
        id: Date.now(),
        amount: parseFloat(form.amount),
        date: form.date,
        source: form.source,
      };
      setIncomes([...incomes, newIncome]);
      setForm({ amount: '', date: '', source: '' });
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">Income Flow</h2>
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
        <input
          type="text"
          name="source"
          placeholder="Source"
          value={form.source}
          onChange={handleInputChange}
          className="border p-2 mr-2"
        />
        <button onClick={addIncome} className="bg-blue-500 text-white p-2">
          Add Income
        </button>
      </div>
      <ul>
        {incomes.map((income) => (
          <li key={income.id} className="border p-2 mb-2">
            <p>
              <strong>Amount:</strong> ${income.amount}
            </p>
            <p>
              <strong>Date:</strong> {income.date}
            </p>
            <p>
              <strong>Source:</strong> {income.source}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IncomeFlow;
