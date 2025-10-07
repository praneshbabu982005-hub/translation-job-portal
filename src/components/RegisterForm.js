import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      setSuccess('Registration successful! Please login.');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2>Register</h2>
      {error && <div style={{color:'red'}}>{error}</div>}
      {success && <div style={{color:'green'}}>{success}</div>}
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      <div style={{margin:'0.5rem 0'}}>
        <label>
          <input type="radio" name="role" value="user" checked={role==='user'} onChange={()=>setRole('user')} /> User
        </label>
        <label style={{marginLeft:'1rem'}}>
          <input type="radio" name="role" value="admin" checked={role==='admin'} onChange={()=>setRole('admin')} /> Admin
        </label>
      </div>
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterForm;
