import React, { useCallback, useRef, useState } from 'react';

import type {
  ColDef,
  RowSelectionOptions,
} from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-theme-alpine.css";

ModuleRegistry.registerModules([AllCommunityModule]);

interface Expense {
  id: number;
  amount: number;
  date: string;
  category: string;
  description: string;
  title: string;
}

const dummyExpenses: Expense[] = [
  {
    id: 1,
    amount: 45.5,
    date: "2025-04-01",
    category: "Food",
    description: "Lunch at Subway",
    title: "Subway Lunch",
  },
  {
    id: 2,
    amount: 120.0,
    date: "2025-04-03",
    category: "Transportation",
    description: "Monthly metro card",
    title: "Metro Pass",
  },
  {
    id: 3,
    amount: 300.0,
    date: "2025-03-28",
    category: "Rent",
    description: "Shared apartment rent",
    title: "April Rent",
  },
  {
    id: 4,
    amount: 19.99,
    date: "2025-04-02",
    category: "Entertainment",
    description: "Netflix subscription",
    title: "Netflix",
  },
  {
    id: 5,
    amount: 75.25,
    date: "2025-04-10",
    category: "Groceries",
    description: "Weekly grocery shopping",
    title: "Grocery Run",
  },
  {
    id: 6,
    amount: 50.0,
    date: "2025-04-12",
    category: "Health",
    description: "Doctor's appointment",
    title: "Clinic Visit",
  },
  {
    id: 7,
    amount: 15.0,
    date: "2025-04-14",
    category: "Utilities",
    description: "Electricity bill",
    title: "Electric Bill",
  },
  {
    id: 8,
    amount: 100.0,
    date: "2025-04-13",
    category: "Shopping",
    description: "New shoes",
    title: "Shoes",
  },
  {
    id: 9,
    amount: 12.5,
    date: "2025-04-15",
    category: "Food",
    description: "Coffee and bagel",
    title: "Breakfast",
  },
  {
    id: 10,
    title: "Taxi",
    amount: 22.0,
    date: "2025-04-08",
    category: "Transportation",
    description: "Cab fare",
  },
];

const predefinedCategories = ['Food', 'Transport', 'Utilities'];

const ExpenseManagement: React.FC = () => {
  const rowSelection: RowSelectionOptions = {
    mode: "multiRow",
  };

  const gridRef = useRef<AgGridReact>(null);

  const [colDefs] = useState<ColDef[]>([
    {
      field: "id",
      headerName: "Sr.No",
      width: 100,
    },
    {
      field: "title",
      headerName: "Title",
      width: 180,
    },
    {
      field: "amount",
      headerName: "Amount ($)",
      width: 180,
    },
    {
      field: "date",
      headerName: "Date",
      width: 180,
    },
    {
      field: "category",
      headerName: "Category",
      width: 180,
    },
    {
      field: "description",
      headerName: "Description",
      width: 300,
      flex: 1,
    },
  ]);

  const pagination = true;
  const paginationPageSize = 10;
  const paginationPageSizeSelectors = [5, 10, 20, 50];

  const defaultColDef = {
    filter: true,
    floatingFilter: true,
  };

  const [expenses, setExpenses] = useState<Expense[]>(dummyExpenses);
  const [categories, setCategories] = useState(predefinedCategories);
  const [form, setForm] = useState({
    amount: '',
    date: '',
    category: '',
    description: '',
    title: '',
  });
  const [error, setError] = useState('');
  const [spendingLimits, setSpendingLimits] = useState<{ [key: string]: number }>({});
  const [alerts, setAlerts] = useState<string>('');

  const onBtnExport = useCallback(() => {
    const params = {
      fileName: "expenses.csv",
    };
    gridRef.current!.api.exportDataAsCsv(params);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSetLimit = (category: string, limit: number) => {
    setSpendingLimits({ ...spendingLimits, [category]: limit });
  };

  const checkSpendingLimit = (category: string, amount: number) => {
    if (spendingLimits[category] && amount > spendingLimits[category]) {
      setAlerts(`You have exceeded the spending limit for ${category}!`);
    }
  };

  const addExpense = () => {
    if (!form.amount || !form.date) {
      setError('Amount and Date are required.');
      return;
    }
    setError('');
    checkSpendingLimit(form.category, parseFloat(form.amount));
    const newExpense: Expense = {
      id: expenses.length + 1,
      amount: parseFloat(form.amount),
      date: form.date,
      category: form.category || 'Uncategorized',
      title: form.title || 'No Title',
      description: form.description,
    };
    setExpenses([...expenses, newExpense]);
    setForm({ amount: '', date: '', category: '', description: '', title: '' });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">Expense Management</h2>
      <div className="mb-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleInputChange}
          className="border p-2 mr-2"
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleInputChange}
          className="border p-2 mr-2"
        />
        <input
          type="date"
          name="date"
          placeholder="Date"
          value={form.date}
          onChange={handleInputChange}
          className="border p-2 mr-2"
        />
        <select
          name="category"
          value={form.category}
          title='Category'
          onChange={handleInputChange}
          className="border p-2 mr-2"
        >
          <option value="">Select Category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleInputChange}
          className="border p-2 mr-2"
        />
        <button onClick={addExpense} className="bg-blue-500 text-white p-2 mt-3">
          Add Expense
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {alerts && <p className="text-red-500">{alerts}</p>}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Set Spending Limits</h3>
        {categories.map((cat, index) => (
          <div key={index} className="mb-2">
            <label className="mr-2">{cat}:</label>
            <input
              type="number"
              placeholder="Set limit"
              onBlur={(e) => handleSetLimit(cat, parseFloat(e.target.value))}
              className="border p-2"
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <button
          onClick={onBtnExport}
          className="bg-blue-500 hover:bg-blue-600 text-white ml-auto font-bold py-2 px-4 rounded shadow-lg transition duration-300"
        >
          Download CSV Export File
        </button>
        <div className='ag-theme-alpine rounded shadow-lg' style={{ width: "100%", height: "550px" }}>
          <AgGridReact
            ref={gridRef}
            rowData={expenses}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            rowSelection={rowSelection}
            suppressExcelExport={true}
            pagination={pagination}
            paginationPageSize={paginationPageSize}
            animateRows={true}
            domLayout="autoHeight"
            onGridReady={(params) => params.api.sizeColumnsToFit()}
          />
        </div>
      </div>
    </div>
  );
};

export default ExpenseManagement;