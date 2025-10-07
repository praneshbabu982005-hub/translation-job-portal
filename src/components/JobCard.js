import React from 'react';

function JobCard({ job, onApply }) {
  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p>{job.description}</p>
      {onApply && <button onClick={() => onApply(job.id)}>Apply</button>}
    </div>
  );
}

export default JobCard;
