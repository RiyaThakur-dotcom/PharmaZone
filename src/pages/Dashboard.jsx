import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [aiHealth, setAiHealth] = useState(null);

  useEffect(() => {
    fetchHealth();
  }, []);

  const fetchHealth = async () => {
    try {
      const res = await api.get('/ai/health');
      setAiHealth(res.data);
    } catch (e) {
      setAiHealth({ ai_service_status: "DOWN", spring_boot_status: "DOWN" });
    }
  };

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 style={{ marginBottom: '0.25rem' }}>Welcome, {user?.fullName}!</h2>
          <p className="text-muted">Manage your health and orders</p>
        </div>
      </div>

      <div className="grid grid-cols-3 mb-8">
        <Link to="/orders" className="card" style={{ padding: '2rem', textDecoration: 'none', color: 'inherit' }}>
          <div style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '1rem' }}>📦</div>
          <h3>My Orders</h3>
          <p className="text-muted">Track, return, or buy things again</p>
        </Link>
        
        <Link to="/search" className="card" style={{ padding: '2rem', textDecoration: 'none', color: 'inherit' }}>
          <div style={{ fontSize: '2rem', color: 'var(--secondary)', marginBottom: '1rem' }}>🔍</div>
          <h3>Find Medicines</h3>
          <p className="text-muted">Search with AI-powered substitutes</p>
        </Link>
        
        <div className="card" style={{ padding: '2rem' }}>
          <h3 className="mb-4">System Status</h3>
          <div className="flex justify-between items-center mb-2">
            <span>Spring Boot API</span>
            <span className={`badge ${aiHealth?.spring_boot_status === 'UP' ? 'badge-success' : 'badge-danger'}`}>
              {aiHealth?.spring_boot_status || 'CHECKING'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span>Python AI Service</span>
            <span className={`badge ${aiHealth?.ai_service_status === 'UP' ? 'badge-ai' : 'badge-danger'}`}>
              {aiHealth?.ai_service_status || 'CHECKING'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
