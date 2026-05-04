import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Check, X } from 'lucide-react';

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

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="page-title">Admin Dashboard - All Requests</h1>
      
      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid var(--border-color)' }}>
            <tr>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500', color: 'var(--text-secondary)' }}>Title</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500', color: 'var(--text-secondary)' }}>Description</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500', color: 'var(--text-secondary)' }}>Submitted By</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500', color: 'var(--text-secondary)' }}>Status</th>
              <th style={{ padding: '1rem', textAlign: 'right', fontWeight: '500', color: 'var(--text-secondary)' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '1rem', fontWeight: '500' }}>{req.title}</td>
                <td style={{ padding: '1rem', color: 'var(--text-secondary)', maxWidth: '300px' }}>
                  <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {req.description}
                  </div>
                </td>
                <td style={{ padding: '1rem' }}>
                  <div>{req.createdBy.name}</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{req.createdBy.email}</div>
                </td>
                <td style={{ padding: '1rem' }}>
                  <span className={`badge badge-${req.status.toLowerCase()}`}>
                    {req.status}
                  </span>
                </td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  {req.status === 'Pending' && (
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button 
                        onClick={() => handleStatusUpdate(req._id, 'Approved')}
                        className="btn btn-success" 
                        title="Approve"
                        style={{ padding: '0.5rem' }}
                      >
                        <Check size={16} />
                      </button>
                      <button 
                        onClick={() => handleStatusUpdate(req._id, 'Rejected')}
                        className="btn btn-danger" 
                        title="Reject"
                        style={{ padding: '0.5rem' }}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  No feature requests found.
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
