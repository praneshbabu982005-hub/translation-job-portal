import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../App';

function Profile() {
  const { token } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setUser(data));
    fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/jobs`)
      .then(res => res.json())
      .then(jobs => {
        const applied = jobs.filter(j => j.applicants && j.applicants.some(a => a.email === user?.email));
        setAppliedJobs(applied);
      });
  }, [token, user?.email]);

  if (!user) return <div>Loading profile...</div>;

  return (
    <div>
      <h2>Profile</h2>
      <p><b>Email:</b> {user.email}</p>
      <h3>Applied Jobs</h3>
      <ul>
        {appliedJobs.length === 0 && <li>No jobs applied yet.</li>}
        {appliedJobs.map(job => (
          <li key={job._id}>{job.title} at {job.company}</li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;
