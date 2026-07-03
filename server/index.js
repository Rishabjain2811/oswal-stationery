require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const db = require('./db');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;
const rootDir = path.join(__dirname, '..');

app.use((req, res, next) => {
  console.log('[REQUEST]', req.method, req.url, 'origin=', req.headers.origin || '-');
  next();
});
app.use(cors({ origin: true, credentials: true, methods: ['GET','POST','OPTIONS'], allowedHeaders: ['Content-Type'] }));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

// Error handler for JSON parsing errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON in request body' });
  }
  next(err);
});

// Simple health check for the API
app.get('/api/auth/ping', (req, res) => {
  res.json({ ok: true, message: 'pong' });
});

// API routes MUST come before static file serving
app.use('/api/auth', authRoutes);

// Then serve static files
app.use(express.static(rootDir));

// 404 handler - return JSON instead of HTML
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Global error handler - must be last
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({ 
    error: err.message || 'Internal server error'
  });
});

// Initialize database and start server
db.initializeDatabase().then(function() {
  const server = app.listen(PORT, function () {
    console.log('✓ OSWAL site running at http://localhost:' + PORT);
    console.log('✓ Auth API at http://localhost:' + PORT + '/api/auth');
    console.log('✓ Database connected');
  });

  server.on('error', function (err) {
    if (err.code === 'EADDRINUSE') {
      console.error('✗ Port ' + PORT + ' is already in use.');
      console.error('  Stop the process using this port or set a different PORT in server/.env');
      console.error('  Example: PORT=3001');
      process.exit(1);
    }
    console.error('✗ Server error:', err.message);
    process.exit(1);
  });
}).catch(function(error) {
  console.error('✗ Failed to start server:', error.message);
  process.exit(1);
});
