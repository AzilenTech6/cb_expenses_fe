import React from 'react';
import './styles/index.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ExpenseManagement from './components/ExpenseManagement';
import Charts from './components/Charts';
import BudgetManagement from './components/BudgetManagement';
import GoalsAndSupport from './components/GoalsAndSupport';
import IncomeFlow from './components/IncomeFlow';
import Login from './components/Login';
import Register from './components/Register';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/login" />} />
          <Route path=":month/expense-management" element={<ExpenseManagement />} />
          <Route path=":month/income-flow" element={<IncomeFlow />} />
          <Route path=":month/charts" element={<Charts expenses={[]} />} />
          <Route path=":month/budget-management" element={<BudgetManagement />} />
          <Route path=":month/goals-support" element={<GoalsAndSupport />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;