// App.jsx — Full Working App with Routing and Basic Pages
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import HomePage from './pages/HomePage';

function SignUp() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <h2 className="text-3xl font-bold mb-4 text-indigo-700">Create an Account</h2>
      <form className="w-full max-w-sm space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border border-gray-300 p-3 rounded-lg"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 p-3 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 p-3 rounded-lg"
        />
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg font-semibold">
          Sign Up
        </button>
      </form>
    </div>
  );
}

function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <h2 className="text-3xl font-bold mb-4 text-indigo-700">Login</h2>
      <form className="w-full max-w-sm space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 p-3 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 p-3 rounded-lg"
        />
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg font-semibold">
          Login
        </button>
      </form>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <h2 className="text-2xl font-semibold text-gray-700">Your Job Tracker Dashboard</h2>
    </div>
  );
}
function App() {
  const [jobs, setJobs] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All'); // ✅ MOVE THIS HERE

  // Load jobs on mount
  useEffect(() => {
    fetch('http://localhost:5000/api/jobs')
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error('Failed to load jobs:', err));
  }, []);

  const handleAddJob = (job) => {
    setJobs((prev) => [...prev, job]);
  };

  const handleDeleteJob = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: 'DELETE',
      });
      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (err) {
      console.error('Failed to delete job:', err);
    }
  };

  const handleEditJob = async (id, updatedJob) => {
    try {
      const res = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedJob),
      });

      const data = await res.json();

      setJobs((prev) =>
        prev.map((job) => (job._id === id ? { ...job, ...data } : job))
      );
    } catch (err) {
      console.error('Failed to edit job:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <AddJobForm onAddJob={handleAddJob} />

      <div className="max-w-4xl mx-auto mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Filter by Status
        </label>
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

export default App;
