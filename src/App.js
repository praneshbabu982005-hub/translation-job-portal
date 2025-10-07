import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import JobList from './components/JobList';
import JobCard from './components/JobCard';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import PostJobForm from './components/PostJobForm';
import ApplyForm from './components/ApplyForm';
import AdminPanel from './components/AdminPanel';
import Profile from './pages/Profile';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

function PrivateRoute({ children, adminOnly }) {
  const { token, role } = React.useContext(AuthContext);
  if (!token) {
    window.location.href = '/login';
    return null;
  }
  if (adminOnly && role !== 'admin') {
    return <div style={{color:'red'}}>Access denied: Admins only</div>;
  }
  return children;
}

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role'));

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setRole(decodedToken.role);
        localStorage.setItem('role', decodedToken.role);
      } catch {
        setRole(null);
        localStorage.removeItem('role');
      }
    } else {
      setRole(null);
      localStorage.removeItem('role');
    }
  }, [token]);

  const login = (tok) => {
    setToken(tok);
    localStorage.setItem('token', tok);
    try {
      const decodedTok = jwtDecode(tok);
      setRole(decodedTok.role);
      localStorage.setItem('role', decodedTok.role);
    } catch {
      setRole(null);
      localStorage.removeItem('role');
    }
  };
  const logout = () => {
    setToken(null);
    setRole(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/jobs" element={<PrivateRoute><JobList /></PrivateRoute>} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/post-job" element={<PrivateRoute adminOnly={true}><PostJobForm /></PrivateRoute>} />
            <Route path="/apply/:jobId" element={<PrivateRoute><ApplyForm /></PrivateRoute>} />
            <Route path="/admin" element={<PrivateRoute adminOnly={true}><AdminPanel /></PrivateRoute>} />
            <Route path="/dashboard" element={<PrivateRoute adminOnly={true}><AdminDashboard /></PrivateRoute>} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
