import React, { useState } from 'react';
import './styles/index.css';
import Sidebar from './components/Sidebar';
import MonthNavigation from './components/MonthNavigation';
import ExpenseManagement from './components/ExpenseManagement';
import Charts from './components/Charts';

const App: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [activeTab, setActiveTab] = useState('expenses');

  return (
    <div className="flex h-screen">
      <Sidebar selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
      <div className="flex flex-col flex-1">
        <MonthNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="p-4 flex-1 overflow-y-auto">
          {activeTab === 'expenses' && <ExpenseManagement />}
          {activeTab === 'charts' && <Charts expenses={[]} />}
          {/* Add more components for other tabs */}
        </main>
      </div>
    </div>
  );
};

export default App;