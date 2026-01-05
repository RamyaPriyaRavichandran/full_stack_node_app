const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5002;
const INTERNAL_BACKEND_URL =
  process.env.INTERNAL_BACKEND_URL || 'http://localhost:5001';

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    // Check internal backend health
    const internalHealth = await axios.get(`${INTERNAL_BACKEND_URL}/health`);

    res.status(200).json({
      status: 'healthy',
      service: 'main-backend',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      dependencies: {
        internalBackend: {
          status: internalHealth.data.status,
          url: INTERNAL_BACKEND_URL,
        },
      },
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      service: 'main-backend',
      timestamp: new Date().toISOString(),
      error: 'Internal backend is not reachable',
      dependencies: {
        internalBackend: {
          status: 'unhealthy',
          url: INTERNAL_BACKEND_URL,
          error: error.message,
        },
      },
    });
  }
});

// Get items - fetches from internal backend and adds processing
app.get('/api/items', async (req, res) => {
  try {
    console.log('📡 Fetching data from internal backend...');
    const response = await axios.get(`${INTERNAL_BACKEND_URL}/data`);

    // Process/transform data from internal backend
    const items = response.data.data.map((item) => ({
      ...item,
      displayName: `${item.name} - ${item.category}`,
      inStock: item.stock > 0,
      processedBy: 'main-backend',
    }));

    res.status(200).json({
      success: true,
      count: items.length,
      data: items,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('❌ Error fetching from internal backend:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch items from internal service',
      error: error.message,
    });
  }
});

// Get specific item by ID
app.get('/api/items/:id', async (req, res) => {
  try {
    const id = req.params.id;
    console.log(`📡 Fetching item ${id} from internal backend...`);
    const response = await axios.get(`${INTERNAL_BACKEND_URL}/data/${id}`);

    if (response.data.success) {
      const item = response.data.data;
      res.status(200).json({
        success: true,
        data: {
          ...item,
          displayName: `${item.name} - ${item.category}`,
          inStock: item.stock > 0,
          processedBy: 'main-backend',
        },
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Item not found',
      });
    }
  } catch (error) {
    console.error('❌ Error fetching item:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch item',
      error: error.message,
    });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Main Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      items: '/api/items',
      itemById: '/api/items/:id',
    },
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Main Backend running on port ${PORT}`);
  console.log(`🔗 Connected to Internal Backend at ${INTERNAL_BACKEND_URL}`);
});

