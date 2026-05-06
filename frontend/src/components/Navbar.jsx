import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="nav-brand">
          FeatureFlow
        </Link>
        <div className="nav-links">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
            <User size={18} />
            <span style={{ fontWeight: '500' }}>{user?.name} <span style={{ opacity: 0.7, fontSize: '0.85em' }}>({user?.role})</span></span>
          </div>
          <button onClick={handleLogout} className="btn btn-danger">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
