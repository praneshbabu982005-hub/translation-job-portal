import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

function Navbar() {
  const { token, role, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h2>Translation Job Portal</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
  {token && <li><Link to="/jobs">Jobs</Link></li>}
  {token && <li><Link to="/profile">Profile</Link></li>}
        {token && role === 'admin' && <li><Link to="/post-job">Post Job</Link></li>}
  {token && role === 'admin' && <li><Link to="/admin">Admin</Link></li>}
  {token && role === 'admin' && <li><Link to="/dashboard">Dashboard</Link></li>}
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        {!token && <li><Link to="/login">Login</Link></li>}
        {!token && <li><Link to="/register">Register</Link></li>}
        {token && <li><button style={{background:'none',border:'none',color:'#fff',cursor:'pointer'}} onClick={handleLogout}>Logout</button></li>}
      </ul>
    </nav>
  );
}

export default Navbar;
