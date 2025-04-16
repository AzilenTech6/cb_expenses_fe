import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    category: 'personal',
  });
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Add registration logic here
    console.log('Register:', form);
    navigate('/login'); // Redirect after registration
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleInputChange}
          className="w-full p-2 border mb-4 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleInputChange}
          className="w-full p-2 border mb-4 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleInputChange}
          className="w-full p-2 border mb-4 rounded"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleInputChange}
          className="w-full p-2 border mb-4 rounded"
        />
        <select
          name="category"
          value={form.category}
          onChange={handleInputChange}
          className="w-full p-2 border mb-4 rounded"
        >
          <option value="personal">Personal</option>
          <option value="business">Business</option>
        </select>
        <button
          onClick={handleRegister}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Register
        </button>
        <p className="text-center mt-4">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-blue-500 underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
