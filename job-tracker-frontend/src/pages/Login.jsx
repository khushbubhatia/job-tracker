import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setPassword('');
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      setPassword('');
      setError(err.message);
    }
  };

  return (
    <div className="container py-5">
      <div className="row shadow-lg rounded-4 overflow-hidden">
        {/* Left side */}
        <div className="col-md-6 bg-light p-5">
          <h2 className="text-primary fw-bold mb-3">Welcome Back 👋</h2>
          <p className="text-secondary">
            Track your job applications like a pro. Stay organized. Stay ahead.
          </p>
        </div>

        {/* Right side */}
        <div className="col-md-6 p-5 bg-white">
          <h4 className="mb-4 fw-semibold">Login to Your Account</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="alert alert-danger py-2" role="alert">
                {error}
              </div>
            )}

            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
