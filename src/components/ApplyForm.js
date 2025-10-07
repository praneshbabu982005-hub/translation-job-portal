
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ApplyForm() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/jobs`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(j => j._id === jobId);
        setJob(found);
        setLoading(false);
      });
  }, [jobId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/jobs/${jobId}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, coverLetter })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to apply');
      setSuccess('Application submitted!');
      setName(''); setEmail(''); setCoverLetter('');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (success) return <div style={{color:'green',fontWeight:'bold',fontSize:'1.2rem'}}>Successfully applied!</div>;
  if (!job) return <p>Job not found.</p>;

  return (
    <form className="apply-form" onSubmit={handleSubmit}>
      <h2>Apply for {job.title}</h2>
      {error && <div style={{color:'red'}}>{error}</div>}
      <input type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} required />
      <input type="email" placeholder="Your Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <textarea placeholder="Cover Letter" value={coverLetter} onChange={e => setCoverLetter(e.target.value)} required />
      <button type="submit">Submit Application</button>
    </form>
  );
}

export default ApplyForm;
