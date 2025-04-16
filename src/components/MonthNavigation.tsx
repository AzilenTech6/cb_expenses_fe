import React from 'react';

interface MonthNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs = [
  { id: 'expenses', label: 'Expense Management' },
  { id: 'charts', label: 'Charts & Reports' },
  { id: 'budget', label: 'Budget Management' },
  { id: 'goals', label: 'Goals & Support' },
  { id: 'income', label: 'Income Flow' },
];

const MonthNavigation: React.FC<MonthNavigationProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-full bg-gray-100 p-4 border-b">
      <nav className="flex space-x-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`p-2 ${activeTab === tab.id ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default MonthNavigation;
