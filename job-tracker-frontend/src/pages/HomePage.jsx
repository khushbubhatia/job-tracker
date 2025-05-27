import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate(); // ✅ always inside the function, at the top

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">Job Tracker</h1>
      <p className="text-gray-600 text-lg md:text-xl mb-6 max-w-xl">
        Stay on top of your job applications with our easy-to-use tracking tool. Add jobs, update statuses, and never miss a follow-up.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => navigate('/signup')}
          className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
        >
          Get Started
        </button>
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-3 rounded-xl border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default HomePage;
