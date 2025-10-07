
import React, { useEffect, useState, useContext } from 'react';
import JobCard from './JobCard';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [company, setCompany] = useState('');
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/jobs`)
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setLoading(false);
      });
  }, []);

  const handleApply = (jobId) => {
    navigate(`/apply/${jobId}`);
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase()) &&
    (location ? job.location.toLowerCase().includes(location.toLowerCase()) : true) &&
    (company ? job.company.toLowerCase().includes(company.toLowerCase()) : true)
  );

  if (loading) return <div>Loading jobs...</div>;

  return (
    <div>
      <h2>Available Jobs</h2>
      <div style={{marginBottom:'1rem'}}>
        <input placeholder="Search by title" value={search} onChange={e=>setSearch(e.target.value)} style={{marginRight:'0.5rem'}} />
        <input placeholder="Filter by location" value={location} onChange={e=>setLocation(e.target.value)} style={{marginRight:'0.5rem'}} />
        <input placeholder="Filter by company" value={company} onChange={e=>setCompany(e.target.value)} />
      </div>
      {filteredJobs.length === 0 && <p>No jobs found.</p>}
      {filteredJobs.map(job => (
        <JobCard key={job._id} job={job} onApply={handleApply} />
      ))}
    </div>
  );
}

export default JobList;
