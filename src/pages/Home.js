import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/jobs`)
      .then(res => res.json())
      .then(data => setJobs(data.slice(0, 3)));
  }, []);

  return (
    <div>
      <h1>Welcome to the Translation Job Portal</h1>
      <p>Find and post translation jobs easily. Register or login to get started!</p>

      <section style={{margin:'2rem 0'}}>
        <h2>Featured Jobs</h2>
        {jobs.length === 0 && <p>No jobs available right now.</p>}
        <ul>
          {jobs.map(job => (
            <li key={job._id} style={{marginBottom:'1rem'}}>
              <b>{job.title}</b> at {job.company} ({job.location})<br/>
              <Link to={`/apply/${job._id}`}>Apply Now</Link>
            </li>
          ))}
        </ul>
        <Link to="/jobs" style={{fontWeight:'bold'}}>View All Jobs</Link>
      </section>

      <section style={{margin:'2rem 0'}}>
        <h2>Why Choose Us?</h2>
        <ul>
          <li>Easy job search and application process</li>
          <li>Role-based access for users and admins</li>
          <li>Admin dashboard with analytics</li>
          <li>Email notifications for applications</li>
        </ul>
      </section>

      <section style={{margin:'2rem 0'}}>
        <h2>What Our Users Say</h2>
        <blockquote style={{fontStyle:'italic',color:'#3f51b5'}}>"I found my first translation job here in just a week!"</blockquote>
        <blockquote style={{fontStyle:'italic',color:'#3f51b5'}}>"The admin dashboard makes managing jobs so easy."</blockquote>
      </section>

      <section style={{margin:'2rem 0'}}>
        <h2>Get Started</h2>
        <Link to="/register" style={{marginRight:'1rem'}}>Register</Link>
        <Link to="/login">Login</Link>
      </section>
    </div>
  );
}

export default Home;