import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { PlusCircle, Clock, CheckCircle, XCircle } from 'lucide-react';

const UserDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchRequests = async () => {
    try {
      const response = await api.get('/requests/my');
      setRequests(response.data);
    } catch (err) {
      console.error('Failed to fetch requests', err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await api.post('/requests', { title, description });
      setSuccess('Feature request submitted successfully!');
      setTitle('');
      setDescription('');
      fetchRequests();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit request');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved': return <CheckCircle size={18} className="text-success" />;
      case 'Rejected': return <XCircle size={18} className="text-danger" />;
      default: return <Clock size={18} className="text-warning" />;
    }
  };

  return (
    <div>
      <h1 className="page-title">My Feature Requests</h1>
      
      <div className="grid grid-cols-2">
        <div>
          <div className="card">
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <PlusCircle size={20} /> Submit New Request
            </h2>
            {error && <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem' }}>{error}</div>}
            {success && <div style={{ backgroundColor: '#d1fae5', color: '#059669', padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem' }}>{success}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Feature Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Dark Mode Support"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-input"
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the feature in detail..."
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit Request
              </button>
            </form>
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {requests.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem', color: 'var(--text-secondary)' }}>
                You haven't submitted any feature requests yet.
              </div>
            ) : (
              requests.map((req) => (
                <div key={req._id} className="card" style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '600' }}>{req.title}</h3>
                    <span className={`badge badge-${req.status.toLowerCase()}`} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      {getStatusIcon(req.status)}
                      {req.status}
                    </span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>{req.description}</p>
                  <div style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
                    Submitted on: {new Date(req.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
