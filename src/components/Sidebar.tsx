import React from 'react';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

interface SidebarProps {
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedMonth, setSelectedMonth }) => {
  return (
    <div className="w-1/5 bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Months</h2>
      <ul>
        {months.map((month) => (
          <li
            key={month}
            className={`p-2 cursor-pointer ${selectedMonth === month ? 'bg-blue-500' : ''}`}
            onClick={() => setSelectedMonth(month)}
          >
            {month}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
