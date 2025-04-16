import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <header className="bg-gray-900 text-white p-4">
          <nav className="flex space-x-4">
            <Link to="/january/expense-management" className="hover:underline">
              Expense Management
            </Link>
            <Link to="/january/income-flow" className="hover:underline">
              Income Flow
            </Link>
            <Link to="/january/charts" className="hover:underline">
              Charts
            </Link>
            <Link to="/january/budget-management" className="hover:underline">
              Budget Management
            </Link>
            <Link to="/january/goals-support" className="hover:underline">
              Goals and Support
            </Link>
          </nav>
        </header>
        <main className="p-4 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
