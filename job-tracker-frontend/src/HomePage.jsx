import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>

      {/* ====== HERO SECTION ====== */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <div
            className="bg-white shadow-lg rounded-4 p-5 mx-auto mb-5"
            style={{ maxWidth: '720px' }}
          >
            <h1 className="fw-bold text-primary mb-3">
              Seamless <span className="fst-italic fw-semibold">updates</span> on your job
              applications 🚀
            </h1>
            <p className="text-secondary mb-4 fs-5">
              Simplify your job application process by organizing and tracking your applications —
              powered by habit-building design.
            </p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <Link to="/signup" className="btn btn-primary px-4 py-2">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====== FEATURES SECTION ====== */}
      <section className="bg-white py-5 border-top">
        <div className="container text-center">
          <h2 className="fw-bold mb-4 text-dark">Why Use JobTracker?</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="p-4 shadow-sm rounded h-100">
                <h5 className="text-primary fw-semibold">📅 Organized Workflow</h5>
                <p className="text-muted">Track all your applications in one place and never miss a follow-up.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 shadow-sm rounded h-100">
                <h5 className="text-primary fw-semibold">📊 Progress Dashboard</h5>
                <p className="text-muted">Visualize your job search with response stats and status breakdowns.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 shadow-sm rounded h-100">
                <h5 className="text-primary fw-semibold">🤖 Smart Reminders</h5>
                <p className="text-muted">Stay on top of deadlines and interviews with automated reminders.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== FOOTER SECTION ====== */}
      <footer className="bg-light py-4 mt-5 border-top">
        <div className="container text-center">
          <p className="mb-2 fw-semibold text-primary fs-5">JobTracker</p>
          <p className="text-muted mb-2">
            Built for job seekers by job seekers. Stay organized, stay hired. 🚀
          </p>
          <div className="d-flex justify-content-center gap-4 mb-3">
            <Link className="text-decoration-none text-secondary" to="/about">
              About Us
            </Link>
            <Link className="text-decoration-none text-secondary" to="/contact">
              Contact
            </Link>
            <Link className="text-decoration-none text-secondary" to="/privacy">
              Privacy
            </Link>
          </div>
          <small className="text-muted">© {new Date().getFullYear()} JobTracker. All rights reserved.</small>
        </div>
      </footer>
    </>
  );
};

export default HomePage;
