// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom shadow-sm py-3 sticky-top">
      <div className="container d-flex justify-content-between">
        <Link className="navbar-brand fw-bold text-primary fs-4" to="/">
          JobTracker
        </Link>
        <div className="d-flex gap-3">
          <Link className="btn btn-outline-primary" to="/login">
            Login
          </Link>
          <Link className="btn btn-primary" to="/signup">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
