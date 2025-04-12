import React from 'react';
import './styles/index.css';
import ExpenseManagement from './components/ExpenseManagement';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-3xl font-bold">Expense Manager</h1>
      </header>
      <main className="p-4">
        <ExpenseManagement />
      </main>
    </div>
  );
};

export default App;