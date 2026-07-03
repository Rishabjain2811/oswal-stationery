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
app.use(express.json());
app.use(cookieParser());

// Simple health check for the API
app.get('/api/auth/ping', (req, res) => {
  res.json({ ok: true, message: 'pong' });
});

// API routes MUST come before static file serving
app.use('/api/auth', authRoutes);

// Then serve static files
app.use(express.static(rootDir));

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
