// ✅ AddJobForm.jsx
import { useState } from 'react';

function AddJobForm({ onAddJob }) {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [link, setLink] = useState('');
  const [status, setStatus] = useState('Applied');
  const [notes, setNotes] = useState('');
  const [dateApplied, setDateApplied] = useState(new Date().toISOString());

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!company || !position) return;

  const newJob = { company, position, link, status, notes, dateApplied };

  try {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5000/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(newJob),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to add job');
    }

    const savedJob = await res.json();
    onAddJob(savedJob);

    // Reset form
    setCompany('');
    setPosition('');
    setLink('');
    setStatus('Applied');
    setNotes('');
    setDateApplied(new Date().toISOString());
  } catch (err) {
    console.error('Failed to add job:', err.message);
  }
};

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-6 rounded shadow-md mt-10 space-y-4"
    >
      <h2 className="text-2xl font-semibold">Add a Job</h2>
      <input
        type="text"
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="url"
        placeholder="Job Link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>
      <textarea
        placeholder="Notes (optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full p-2 border rounded"
        rows={3}
      />
      <input
        type="datetime-local"
        value={dateApplied.slice(0, 16)}
        onChange={(e) => setDateApplied(new Date(e.target.value).toISOString())}
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
}

export default AddJobForm;


