// ✅ JobCard.jsx — Compact, Modern UI Preserving Logic
import { useState } from 'react';

function JobCard({ id, company, position, link, status, notes, dateApplied, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editCompany, setEditCompany] = useState(company);
  const [editPosition, setEditPosition] = useState(position);
  const [editLink, setEditLink] = useState(link);
  const [editStatus, setEditStatus] = useState(status || 'Applied');
  const [editNotes, setEditNotes] = useState(notes || '');
  const [editDate, setEditDate] = useState(
    dateApplied ? dateApplied.split('T')[0] : new Date().toISOString().split('T')[0]
  );

  const handleEditSubmit = () => {
    const updatedJob = {
      company: editCompany,
      position: editPosition,
      link: editLink,
      status: editStatus,
      notes: editNotes,
      dateApplied: new Date(editDate).toISOString(),
    };
    onEdit(id, updatedJob);
    setIsEditing(false);
  };

  const formattedDate = dateApplied && !isNaN(Date.parse(dateApplied))
    ? new Date(dateApplied).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'Not available';

  const getBadgeColor = (status) => {
    switch (status) {
      case 'Applied': return 'bg-yellow-300/30 text-yellow-800';
      case 'Interview': return 'bg-blue-300/30 text-blue-800';
      case 'Offer': return 'bg-green-300/30 text-green-800';
      case 'Rejected': return 'bg-red-300/30 text-red-800';
      default: return 'bg-gray-200 text-gray-600';
    }
  };

  return (
    <div className="max-w-md bg-white p-6 rounded-xl shadow-md border mx-auto mt-4 text-sm space-y-3">
      {!isEditing ? (
        <>
          <h3 className="text-xl font-semibold text-gray-900">{position}</h3>
          <p className="text-gray-700">{company}</p>

          {link && (
            <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline block">
              🔗 View Job
            </a>
          )}

          <div className={`inline-block px-3 py-1 mt-2 rounded-full text-xs font-medium ${getBadgeColor(status)}`}>
            {status}
          </div>

          <p className="text-gray-500 flex items-center gap-1">
            📅 <span>Applied on: {formattedDate}</span>
          </p>

          {notes && <p className="text-gray-700">📝 {notes}</p>}

          <div className="flex gap-3 pt-2">
            <button onClick={() => setIsEditing(true)} className="text-yellow-600 hover:underline">✏️ Edit</button>
            <button onClick={() => onDelete(id)} className="text-red-600 hover:underline">❌ Delete</button>
          </div>
        </>
      ) : (
        <div className="space-y-3">
          <input
            value={editCompany}
            onChange={(e) => setEditCompany(e.target.value)}
            placeholder="Company"
            className="w-full border p-3 rounded-xl text-sm"
          />
          <input
            value={editPosition}
            onChange={(e) => setEditPosition(e.target.value)}
            placeholder="Position"
            className="w-full border p-3 rounded-xl text-sm"
          />
          <input
            value={editLink}
            onChange={(e) => setEditLink(e.target.value)}
            placeholder="Job Link"
            className="w-full border p-3 rounded-xl text-sm"
          />
          <select
            value={editStatus}
            onChange={(e) => setEditStatus(e.target.value)}
            className="w-full border p-3 rounded-xl text-sm"
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
          <textarea
            value={editNotes}
            onChange={(e) => setEditNotes(e.target.value)}
            placeholder="Notes"
            className="w-full border p-3 rounded-xl text-sm"
            rows={3}
          />
          <input
            type="date"
            value={editDate}
            onChange={(e) => setEditDate(e.target.value)}
            className="w-full border p-3 rounded-xl text-sm"
          />
          <div className="flex gap-3 pt-2">
            <button onClick={handleEditSubmit} className="bg-green-500 text-white px-4 py-2 rounded-xl text-sm">Save</button>
            <button onClick={() => setIsEditing(false)} className="bg-gray-300 px-4 py-2 rounded-xl text-sm">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobCard;
