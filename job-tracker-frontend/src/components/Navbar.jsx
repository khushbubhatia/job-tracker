import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const showBack = location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/signup';

  return (
    <nav className="sticky top-0 bg-white shadow-md p-4 flex justify-between items-center z-50">
      <Link to="/" className="text-xl font-bold text-indigo-600">JobTracker</Link>
      <div className="space-x-4">
        {showBack && (
          <button onClick={() => navigate(-1)} className="text-gray-600 hover:underline">← Back</button>
        )}
        <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
        <Link to="/signup" className="text-indigo-600 hover:underline">Sign Up</Link>
      </div>
    </nav>
  );
}

export default Navbar;
