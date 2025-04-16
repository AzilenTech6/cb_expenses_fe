import React from 'react';
import { Pie, Line } from 'react-chartjs-2';

const Charts: React.FC<{ expenses: any[] }> = ({ expenses }) => {
  const categoryData = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const lineData = {
    labels: expenses.map((e) => e.date),
    datasets: [
      {
        label: 'Spending Over Time',
        data: expenses.map((e) => e.amount),
        fill: false,
        borderColor: '#36A2EB',
      },
    ],
  };

  return (
    <div>
      <h3 className="text-lg font-semibold">Expense Charts</h3>
      <div className="mb-4">
        <Pie data={pieData} />
      </div>
      <div>
        <Line data={lineData} />
      </div>
    </div>
  );
};

export default Charts;
