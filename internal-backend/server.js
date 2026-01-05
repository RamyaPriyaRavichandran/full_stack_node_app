const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Sample data - in a real app, this might come from a database
const internalData = [
  {
    id: 1,
    name: 'Internal Item 1',
    category: 'Electronics',
    price: 299.99,
    stock: 15,
  },
  {
    id: 2,
    name: 'Internal Item 2',
    category: 'Books',
    price: 19.99,
    stock: 50,
  },
  {
    id: 3,
    name: 'Internal Item 3',
    category: 'Clothing',
    price: 49.99,
    stock: 30,
  },
  {
    id: 4,
    name: 'Internal Item 4',
    category: 'Electronics',
    price: 599.99,
    stock: 8,
  },
  { id: 5, name: 'Internal Item 5', category: 'Home', price: 89.99, stock: 20 },
];

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    service: 'internal-backend',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Get all internal data
app.get('/data', (req, res) => {
  console.log('📦 Internal data requested');
  res.status(200).json({
    success: true,
    data: internalData,
    timestamp: new Date().toISOString(),
  });
});

// Get specific item by ID
app.get('/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = internalData.find((item) => item.id === id);

  if (item) {
    res.status(200).json({
      success: true,
      data: item,
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Item not found',
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🔒 Internal Backend running on port ${PORT}`);
  console.log(`⚠️  This service should only be accessible by the main backend`);
});

