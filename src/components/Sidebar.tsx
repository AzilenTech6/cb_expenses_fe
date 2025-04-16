import React from 'react';
import { Link, useParams } from 'react-router-dom';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const Sidebar: React.FC = () => {
  const { month } = useParams();

  return (
    <div className="w-1/5 bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Months</h2>
      <ul>
        {months.map((m) => (
          <li key={m} className={`p-2 ${month === m.toLowerCase() ? 'bg-blue-500' : ''}`}>
            <Link to={`/${m.toLowerCase()}/income-flow`} className="block">
              {m}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
