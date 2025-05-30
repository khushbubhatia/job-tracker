import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddJobForm from '../AddJobForm';
import JobCard from '../JobCard';

function Dashboard() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Redirect to login if not authenticated + handle 401 error
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetch('http://localhost:5000/api/jobs', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(async (res) => {
        const data = await res.json();

        if (res.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
          alert('Session expired or unauthorized. Please login again.');
          return;
        }

        setJobs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load jobs:', err);
        setError('Something went wrong. Please try again later.');
        setLoading(false);
      });
  }, [navigate]);

  // ✅ Add a new job
  const handleAddJob = (job) => {
    setJobs((prev) => [...prev, job]);
  };

  // ✅ Delete a job
  const handleDeleteJob = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (err) {
      console.error('Failed to delete job:', err);
    }
  };

  // ✅ Edit a job
  const handleEditJob = async (id, updatedJob) => {
    try {
      const res = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updatedJob),
      });
      const data = await res.json();
      setJobs((prev) => prev.map((job) => (job._id === id ? { ...job, ...data } : job)));
    } catch (err) {
      console.error('Failed to edit job:', err);
    }
  };

  return (
    <div className="min-vh-100 bg-light p-4">
      <div className="container">
        <h1 className="text-center mb-4 text-primary fw-bold">Your Job Applications Dashboard</h1>

        {/* Form to add new job */}
        <AddJobForm onAddJob={handleAddJob} />

        {/* Filter Dropdown */}
        <div className="my-4">
          <label className="form-label fw-semibold">Filter by Status</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="form-select"
          >
            <option value="All">All</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Display Jobs */}
        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-3">Loading jobs...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger text-center">{error}</div>
        ) : jobs.length === 0 ? (
          <div className="alert alert-warning text-center">No jobs to show. Add your first one above!</div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 g-4 mt-3">
            {jobs
              .filter((job) => filterStatus === 'All' || job.status === filterStatus)
              .map((job) => (
                <div key={job._id} className="col">
                  <JobCard
                    id={job._id}
                    company={job.company}
                    position={job.position}
                    link={job.link}
                    status={job.status}
                    notes={job.notes}
                    dateApplied={job.dateApplied}
                    onDelete={handleDeleteJob}
                    onEdit={handleEditJob}
                  />
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
