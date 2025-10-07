
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../App';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

function AdminDashboard() {
  const { token } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [jobStats, setJobStats] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/admin/stats`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setStats(data));
    fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/jobs`)
      .then(res => res.json())
      .then(jobs => setJobStats(jobs));
  }, [token]);

  if (!stats) return <div>Loading dashboard...</div>;

  // Bar chart: Applications per Job
  const barData = {
    labels: jobStats.map(j => j.title),
    datasets: [
      {
        label: 'Applications',
        data: jobStats.map(j => (j.applicants ? j.applicants.length : 0)),
        backgroundColor: '#3f51b5',
      },
    ],
  };

  // Pie chart: Jobs vs Applications
  const pieData = {
    labels: ['Jobs', 'Applications'],
    datasets: [
      {
        data: [stats.jobCount, stats.applicationCount],
        backgroundColor: ['#7986cb', '#ffb300'],
      },
    ],
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div style={{display:'flex',gap:'2rem',marginBottom:'2rem'}}>
        <div style={{background:'#e3e3fa',padding:'1rem',borderRadius:'8px'}}>
          <h3>Total Users</h3>
          <p style={{fontSize:'2rem'}}>{stats.userCount}</p>
        </div>
        <div style={{background:'#e3e3fa',padding:'1rem',borderRadius:'8px'}}>
          <h3>Total Jobs</h3>
          <p style={{fontSize:'2rem'}}>{stats.jobCount}</p>
        </div>
        <div style={{background:'#e3e3fa',padding:'1rem',borderRadius:'8px'}}>
          <h3>Total Applications</h3>
          <p style={{fontSize:'2rem'}}>{stats.applicationCount}</p>
        </div>
      </div>
      <div style={{display:'flex',gap:'2rem',flexWrap:'wrap'}}>
        <div style={{width:'400px',background:'#fff',padding:'1rem',borderRadius:'8px'}}>
          <h4>Applications per Job</h4>
          <Bar data={barData} options={{responsive:true, plugins:{legend:{display:false}}}} />
        </div>
        <div style={{width:'300px',background:'#fff',padding:'1rem',borderRadius:'8px'}}>
          <h4>Jobs vs Applications</h4>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
