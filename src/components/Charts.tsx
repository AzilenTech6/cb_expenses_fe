import React, { useEffect } from 'react';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { Pie, Line } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';

// Register required Chart.js components
ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const Charts: React.FC<{ expenses: any[] }> = ({ expenses }) => {
  const { month } = useParams();

  // Dummy data for expenses
  if (expenses.length === 0) {
    expenses = [
      { date: '2023-01-01', amount: 200, category: 'Food' },
      { date: '2023-01-02', amount: 150, category: 'Transport' },
      { date: '2023-01-03', amount: 300, category: 'Utilities' },
    ];
  }

  const categoryData = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: ['#FFB3C1', '#A2D2FF', '#FFE5A1'], // Updated to lighter colors
      },
    ],
  };

  const lineData = {
    labels: expenses.map((e) => e.date),
    datasets: [
      {
        label: `Spending Over Time (${month})`,
        data: expenses.map((e) => e.amount),
        fill: false,
        borderColor: '#A2D2FF', // Updated to a lighter color
      },
    ],
  };

  // Ensure charts are destroyed before re-rendering
  useEffect(() => {
    return () => {
      // ChartJS.instances.forEach((chart) => chart.destroy());
    };
  }, []);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Expense Charts for {month?.toLocaleUpperCase()}</h3>
      <div className="grid grid-cols-2 gap-4">
        <div style={{ width: '350px', height: '350px', margin: '0 auto' }}>
          <Pie data={pieData} />
        </div>
        <div>
          <Line data={lineData} />
        </div>
      </div>
    </div>
  );
};

export default Charts;
