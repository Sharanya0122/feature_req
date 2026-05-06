import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Check, X, Shield, Inbox } from 'lucide-react';

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const response = await api.get('/requests');
      setRequests(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch requests', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await api.put(`/requests/${id}/status`, { status: newStatus });
      // Update local state
      setRequests(requests.map(req => 
        req._id === id ? { ...req, status: newStatus } : req
      ));
    } catch (err) {
      alert('Failed to update status');
    }
  };

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', color: 'var(--text-secondary)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid var(--primary-glow)', borderTopColor: 'var(--primary-color)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <p>Loading requests...</p>
      </div>
      <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
        <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px', color: 'var(--error-color)' }}>
          <Shield size={32} />
        </div>
        <div>
          <h1 className="page-title" style={{ marginBottom: 0 }}>Admin Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Review and manage all user feature requests</p>
        </div>
      </div>
      
      <div className="table-container">
        <table className="modern-table">
          <thead>
            <tr>
              <th>Feature Details</th>
              <th>Submitted By</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td>
                  <div style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.25rem', fontFamily: 'Outfit' }}>{req.title}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', maxWidth: '400px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {req.description}
                  </div>
                </td>
                <td>
                  <div style={{ fontWeight: '500' }}>{req.createdBy.name}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{req.createdBy.email}</div>
                </td>
                <td>
                  <span className={`badge badge-${req.status.toLowerCase()}`}>
                    {req.status}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  {req.status === 'Pending' && (
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button 
                        onClick={() => handleStatusUpdate(req._id, 'Approved')}
                        className="btn btn-success" 
                        title="Approve"
                        style={{ padding: '0.5rem', borderRadius: '50%' }}
                      >
                        <Check size={18} />
                      </button>
                      <button 
                        onClick={() => handleStatusUpdate(req._id, 'Rejected')}
                        className="btn btn-danger" 
                        title="Reject"
                        style={{ padding: '0.5rem', borderRadius: '50%' }}
                      >
                        <X size={18} />
                      </button>
                    </div>
                  )}
                  {req.status !== 'Pending' && (
                     <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontStyle: 'italic' }}>Reviewed</span>
                  )}
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan="4" style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '50%' }}>
                      <Inbox size={48} style={{ opacity: 0.2 }} />
                    </div>
                    <p>No feature requests to review.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
