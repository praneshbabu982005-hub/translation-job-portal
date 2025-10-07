import React, { useState, useContext } from 'react';
import { AuthContext } from '../App';

function PostJobForm() {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const { token } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, company, location, description })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to post job');
      setSuccess('Job posted successfully!');
      setTitle(''); setCompany(''); setLocation(''); setDescription('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="post-job-form" onSubmit={handleSubmit}>
      <h2>Post a Job</h2>
      {error && <div style={{color:'red'}}>{error}</div>}
      {success && <div style={{color:'green'}}>{success}</div>}
      <input type="text" placeholder="Job Title" value={title} onChange={e => setTitle(e.target.value)} required />
      <input type="text" placeholder="Company" value={company} onChange={e => setCompany(e.target.value)} required />
      <input type="text" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} required />
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
      <button type="submit">Post Job</button>
    </form>
  );
}

export default PostJobForm;
