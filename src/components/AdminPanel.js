
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../App';

function AdminPanel() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applicants, setApplicants] = useState({});
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/jobs`)
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setLoading(false);
      });
  }, []);

  const fetchApplicants = async (jobId) => {
    if (applicants[jobId]) return; // already loaded
    const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/jobs/${jobId}/applicants`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    setApplicants(prev => ({ ...prev, [jobId]: data }));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Admin Panel</h2>
      <h3>Posted Jobs</h3>
      <ul>
        {jobs.map(job => (
          <li key={job._id}>
            <strong>{job.title}</strong> - {job.company} <br/>
            Applicants: {job.applicants ? job.applicants.length : 0}
            <button style={{marginLeft:'1rem'}} onClick={() => fetchApplicants(job._id)}>View Applicants</button>
            {applicants[job._id] && (
              <ul>
                {applicants[job._id].length === 0 && <li>No applicants yet.</li>}
                {applicants[job._id].map((a, idx) => (
                  <li key={idx}><b>{a.name}</b> ({a.email})<br/>{a.coverLetter}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <p>Total Users: <UserCount /></p>
    </div>
  );
}

function UserCount() {
  const [count, setCount] = useState(null);
  const { token } = useContext(AuthContext);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/admin/users`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setCount(data.length));
  }, [token]);
  return count === null ? 'Loading...' : count;
}

export default AdminPanel;
