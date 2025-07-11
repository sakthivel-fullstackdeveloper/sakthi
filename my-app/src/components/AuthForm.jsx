import React, { useState } from 'react';
import axios from 'axios';

const baseURL = 'http://localhost:3000';

const AuthForm = () => {
  const [view, setView] = useState('login');
  const [formData, setFormData] = useState({ name: '', username: '', password: '', id: '' });
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post(`${baseURL}/register`, formData);
      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error');
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${baseURL}/login`, formData);
      setMessage(res.data.message);
      setToken(res.data.data);
      localStorage.setItem('token', res.data.data);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed');
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `${baseURL}/update/${formData.id}`,
        { username: formData.username, password: formData.password },
        { headers: { Authorization: token } }
      );
      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center capitalize">{view}</h2>

        {(view === 'register') && (
          <input
            name="name"
            onChange={handleChange}
            value={formData.name}
            placeholder="Name"
            className="w-full px-4 py-2 border rounded"
          />
        )}

        {(view === 'update') && (
          <input
            name="id"
            onChange={handleChange}
            value={formData.id}
            placeholder="User ID"
            className="w-full px-4 py-2 border rounded"
          />
        )}

        <input
          name="username"
          onChange={handleChange}
          value={formData.username}
          placeholder="Username"
          className="w-full px-4 py-2 border rounded"
        />
        <input
          name="password"
          type="password"
          onChange={handleChange}
          value={formData.password}
          placeholder="Password"
          className="w-full px-4 py-2 border rounded"
        />

        <button
          onClick={view === 'register' ? handleRegister : view === 'login' ? handleLogin : handleUpdate}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {view === 'register' ? 'Register' : view === 'login' ? 'Login' : 'Update Password'}
        </button>

        <div className="text-sm text-center space-x-4">
          <button onClick={() => setView('login')} className="text-blue-500 hover:underline">Login</button>
          <button onClick={() => setView('register')} className="text-blue-500 hover:underline">Signup</button>
          <button onClick={() => setView('update')} className="text-blue-500 hover:underline">Forget Password</button>
        </div>

        {message && <p className="text-center text-sm text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default AuthForm;
