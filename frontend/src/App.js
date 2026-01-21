import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [healthLoading, setHealthLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL || '';

  // Fetch health status
  const fetchHealth = async () => {
    try {
      setHealthLoading(true);
      const response = await fetch(`${API_URL}/api/health`);
      const data = await response.json();
      setHealth(data);
    } catch (err) {
      console.error('Health check failed:', err);
      setHealth({ status: 'unhealthy', error: err.message });
    } finally {
      setHealthLoading(false);
    }
  };

  // Fetch items from API
  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/api/items`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setItems(data.data);
      } else {
        throw new Error(data.message || 'Failed to fetch items');
      }
    } catch (err) {
      console.error('Error fetching items:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchHealth();
    fetchItems();

    // Refresh health every 30 seconds
    const healthInterval = setInterval(fetchHealth, 30000);

    return () => clearInterval(healthInterval);
  }, []);

  const handleRefresh = () => {
    fetchItems();
    fetchHealth();
  };

  return (
    <div className='app'>
      <div className='container'>
        {/* Header */}
        <header className='header'>
          <h1>🚀 DevOps Sample Application</h1>
          <p>
            A three-tier full-stack application for learning DevOps deployment
            practices
          </p>
        </header>

        {/* Health Status Section */}
        <section className='health-section'>
          <div className='health-card'>
            <div className='health-header'>
              <h2>🏥 System Health Monitoring</h2>
              {healthLoading ? (
                <span className='status-badge loading'>
                  <span className='status-indicator'></span>
                  Checking...
                </span>
              ) : (
                <span
                  className={`status-badge ${health?.status === 'healthy' ? 'healthy' : 'unhealthy'
                    }`}
                >
                  <span className='status-indicator'></span>
                  {health?.status === 'healthy'
                    ? 'All Systems Operational'
                    : 'System Issues Detected'}
                </span>
              )}
            </div>

            {health && !healthLoading && (
              <div className='health-details'>
                <div className='health-detail'>
                  <div className='health-detail-label'>Service</div>
                  <div className='health-detail-value'>
                    {health.service || 'main-backend'}
                  </div>
                </div>
                <div className='health-detail'>
                  <div className='health-detail-label'>Uptime</div>
                  <div className='health-detail-value'>
                    {health.uptime ? `${Math.floor(health.uptime)}s` : 'N/A'}
                  </div>
                </div>
                <div className='health-detail'>
                  <div className='health-detail-label'>Internal Backend</div>
                  <div className='health-detail-value'>
                    {health.dependencies?.internalBackend?.status || 'Unknown'}
                  </div>
                </div>
                <div className='health-detail'>
                  <div className='health-detail-label'>Last Check</div>
                  <div className='health-detail-value'>
                    {health.timestamp
                      ? new Date(health.timestamp).toLocaleTimeString()
                      : 'N/A'}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Items Section */}
        <section className='items-section'>
          <div className='items-header'>
            <h2>📦 Items Catalog</h2>
            <button
              className='refresh-button'
              onClick={handleRefresh}
              disabled={loading}
            >
              <span>🔄</span>
              {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className='loading'>
              <div className='loading-spinner'></div>
              <p>Fetching items from backend...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className='error'>
              <h3>⚠️ Error Loading Items</h3>
              <p>{error}</p>
              <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
                Make sure the backend server is running on port 5000
              </p>
            </div>
          )}

          {/* Items Grid */}
          {!loading && !error && items.length > 0 && (
            <div className='items-grid'>
              {items.map((item) => (
                <div key={item.id} className='item-card'>
                  <div className='item-header'>
                    <div className='item-id'>ID: {item.id}</div>
                    <h3 className='item-name'>{item.name}</h3>
                    <span className='item-category'>{item.category}</span>
                  </div>
                  <div className='item-details'>
                    <div className='item-price'>${item.price}</div>
                    <div
                      className={`item-stock ${item.inStock ? 'in-stock' : 'out-of-stock'
                        }`}
                    >
                      {item.inStock ? '✓' : '✗'} {item.stock} in stock
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && items.length === 0 && (
            <div className='empty-state'>
              <div className='empty-state-icon'>📭</div>
              <h3>No items found</h3>
              <p>The catalog is currently empty</p>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className='footer'>
          <p>Built for DevOps Learning • Three-Tier Architecture</p>
          <div className='architecture-info'>
            <h3>Architecture Flow:</h3>
            <code>
              React Frontend (Port 3000) → Main Backend (Port 5000) → Internal
              Backend (Port 5001)
            </code>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;

