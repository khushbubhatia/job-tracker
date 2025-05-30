import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddJobForm from '../AddJobForm';
import JobCard from '../JobCard';

function Dashboard() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');

  // ✅ Redirect to login if not authenticated
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
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error('Failed to load jobs:', err));
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
    <div className="min-h-screen bg-gray-100 p-6">
      <AddJobForm onAddJob={handleAddJob} />

      <div className="max-w-4xl mx-auto mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="All">All</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-10 max-w-4xl mx-auto">
        {jobs
          .filter((job) => filterStatus === 'All' || job.status === filterStatus)
          .map((job) => (
            <JobCard
              key={job._id}
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
          ))}
      </div>
    </div>
  );
}

export default Dashboard;
