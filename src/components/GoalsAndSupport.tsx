import React, { useState } from 'react';

interface Goal {
  id: number;
  name: string;
  targetAmount: number;
  savedAmount: number;
  deadline: string;
}

const GoalsAndSupport: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [form, setForm] = useState({ name: '', targetAmount: '', deadline: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addGoal = () => {
    if (form.name && form.targetAmount && form.deadline) {
      const newGoal: Goal = {
        id: Date.now(),
        name: form.name,
        targetAmount: parseFloat(form.targetAmount),
        savedAmount: 0,
        deadline: form.deadline,
      };
      setGoals([...goals, newGoal]);
      setForm({ name: '', targetAmount: '', deadline: '' });
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">Goals and Support</h2>
      <div className="mb-4">
        <input
          type="text"
          name="name"
          placeholder="Goal Name"
          value={form.name}
          onChange={handleInputChange}
          className="border p-2 mr-2"
        />
        <input
          type="number"
          name="targetAmount"
          placeholder="Target Amount"
          value={form.targetAmount}
          onChange={handleInputChange}
          className="border p-2 mr-2"
        />
        <input
          type="date"
          name="deadline"
          value={form.deadline}
          onChange={handleInputChange}
          className="border p-2 mr-2"
        />
        <button onClick={addGoal} className="bg-blue-500 text-white p-2">
          Add Goal
        </button>
      </div>
      <ul>
        {goals.map((goal) => (
          <li key={goal.id} className="border p-2 mb-2">
            <p>
              <strong>Name:</strong> {goal.name}
            </p>
            <p>
              <strong>Target Amount:</strong> ${goal.targetAmount}
            </p>
            <p>
              <strong>Saved Amount:</strong> ${goal.savedAmount}
            </p>
            <p>
              <strong>Deadline:</strong> {goal.deadline}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoalsAndSupport;
