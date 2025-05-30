import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light px-3 py-5">
      <div className="container text-center">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            {/* Signup Card */}
            <div className="bg-white shadow-lg rounded-4 p-5">
              <h2 className="fw-bold text-primary mb-2">Create an Account 📝</h2>
              <p className="text-muted mb-4">Start tracking your job applications like a pro. Organized. Clean. Effortless.</p>

              <form onSubmit={handleSubmit} className="text-start">
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {error && (
                  <div className="alert alert-danger py-2 mb-3" role="alert">
                    {error}
                  </div>
                )}

                <button type="submit" className="btn btn-primary w-100 mt-2">
                  Sign Up
                </button>
              </form>

              <p className="text-muted mt-4 mb-0 text-center">
                Already have an account? <a href="/login" className="text-primary text-decoration-none">Log in</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
