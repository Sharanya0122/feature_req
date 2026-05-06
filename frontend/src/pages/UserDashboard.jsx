import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { PlusCircle, Clock, CheckCircle, XCircle, FileText, Calendar, Send, AlertCircle } from 'lucide-react';

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
      case 'Approved': return <CheckCircle size={16} />;
      case 'Rejected': return <XCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
        <div style={{ padding: '1rem', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '12px', color: 'var(--primary-color)' }}>
          <FileText size={32} />
        </div>
        <div>
          <h1 className="page-title" style={{ marginBottom: 0 }}>My Feature Requests</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage and track your submitted feature requests</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2">
        <div>
          <div className="card">
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'Outfit' }}>
              <PlusCircle size={20} color="var(--primary-color)" /> Submit New Request
            </h2>
            
            {error && (
              <div className="alert-error">
                <AlertCircle size={18} /> {error}
              </div>
            )}
            
            {success && (
              <div className="alert-success">
                <CheckCircle size={18} /> {success}
              </div>
            )}
            
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
                  rows="5"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the feature in detail..."
                  required
                  style={{ resize: 'vertical' }}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.875rem' }}>
                <Send size={18} /> Submit Request
              </button>
            </form>
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'Outfit' }}>
              Recent Requests <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 10px', borderRadius: '12px', fontSize: '0.85rem' }}>{requests.length}</span>
            </h2>
            
            {requests.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '50%' }}>
                  <FileText size={48} style={{ opacity: 0.2 }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>No Requests Yet</h3>
                  <p>You haven't submitted any feature requests.</p>
                </div>
              </div>
            ) : (
              requests.map((req) => (
                <div key={req._id} className="card" style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: '600', fontFamily: 'Outfit' }}>{req.title}</h3>
                    <span className={`badge badge-${req.status.toLowerCase()}`}>
                      {getStatusIcon(req.status)}
                      {req.status}
                    </span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6' }}>{req.description}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <Calendar size={14} /> Submitted on: {new Date(req.createdAt).toLocaleDateString()}
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
