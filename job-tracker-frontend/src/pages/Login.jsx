import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      alert('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 shadow-xl rounded-2xl overflow-hidden bg-white">
        <div className="bg-indigo-100 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-indigo-700 mb-4">Welcome Back 👋</h2>
          <p className="text-gray-700">Track your job applications like a pro. Stay organized. Stay ahead.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5 bg-white">
          <h3 className="text-xl font-semibold text-gray-800">Login to Your Account</h3>
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded-xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded-xl"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
