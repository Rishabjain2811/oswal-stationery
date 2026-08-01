// Vercel Serverless Function for Auth API
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');

const JWT_SECRET = process.env.JWT_SECRET || 'oswal-dev-secret-change-in-production';
const TOKEN_COOKIE = 'oswal_auth';
const TOKEN_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

// Database connection pool for serverless
let pool = null;

function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 1,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelayMs: 0
    });
  }
  return pool;
}

function sanitizeUser(row) {
  return { id: row.id, name: row.name, email: row.email };
}

function setAuthCookie(res, user) {
  const token = jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
  res.setHeader('Set-Cookie', `${TOKEN_COOKIE}=${token}; HttpOnly; SameSite=Lax; Max-Age=${TOKEN_MAX_AGE_MS / 1000}; Path=/; ${process.env.NODE_ENV === 'production' ? 'Secure' : ''}`);
}

async function readAuthUser(req) {
  const cookies = req.headers.cookie || '';
  const tokenMatch = cookies.match(new RegExp(`${TOKEN_COOKIE}=([^;]+)`));
  if (!tokenMatch) return null;
  
  try {
    const token = tokenMatch[1];
    const payload = jwt.verify(token, JWT_SECRET);
    const connection = await getPool().getConnection();
    const [rows] = await connection.execute(
      'SELECT * FROM users WHERE id = ?',
      [payload.sub]
    );
    connection.release();
    return rows.length > 0 ? sanitizeUser(rows[0]) : null;
  } catch (_err) {
    return null;
  }
}

async function findUserByEmail(email) {
  try {
    const connection = await getPool().getConnection();
    const [rows] = await connection.execute(
      'SELECT * FROM users WHERE LOWER(email) = ?',
      [String(email).toLowerCase()]
    );
    connection.release();
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error('DB error in findUserByEmail:', error.message);
    return null;
  }
}

async function findUserById(id) {
  try {
    const connection = await getPool().getConnection();
    const [rows] = await connection.execute(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    connection.release();
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error('DB error in findUserById:', error.message);
    return null;
  }
}

async function createUser(name, email, passwordHash) {
  try {
    const connection = await getPool().getConnection();
    const [result] = await connection.execute(
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
      [name, String(email).toLowerCase(), passwordHash]
    );
    connection.release();
    
    const newUser = await findUserById(result.insertId);
    return newUser;
  } catch (error) {
    console.error('DB error in createUser:', error.message);
    throw error;
  }
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;

  try {
    if (path === '/api/auth/ping') {
      return res.status(200).json({ ok: true, message: 'pong' });
    }

    if (path === '/api/auth/me' && req.method === 'GET') {
      const user = await readAuthUser(req);
      return res.status(200).json({ user: user || null });
    }

    if (path === '/api/auth/register' && req.method === 'POST') {
      const body = JSON.parse(req.body);
      const name = String(body.name || '').trim();
      const email = String(body.email || '').trim().toLowerCase();
      const password = String(body.password || '');

      if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required.' });
      }
      if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters.' });
      }

      const existingUser = await findUserByEmail(email);
      if (existingUser) {
        return res.status(409).json({ error: 'An account with this email already exists.' });
      }

      const passwordHash = bcrypt.hashSync(password, 10);
      const row = await createUser(name, email, passwordHash);
      const user = sanitizeUser(row);
      setAuthCookie(res, user);
      return res.status(201).json({ user: user });
    }

    if (path === '/api/auth/login' && req.method === 'POST') {
      const body = JSON.parse(req.body);
      const email = String(body.email || '').trim().toLowerCase();
      const password = String(body.password || '');

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
      }

      const row = await findUserByEmail(email);
      if (!row || !bcrypt.compareSync(password, row.password_hash)) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      const user = sanitizeUser(row);
      setAuthCookie(res, user);
      return res.status(200).json({ user: user });
    }

    if (path === '/api/auth/logout' && req.method === 'POST') {
      res.setHeader('Set-Cookie', `${TOKEN_COOKIE}=; HttpOnly; SameSite=Lax; Max-Age=0; Path=/`);
      return res.status(200).json({ ok: true });
    }

    return res.status(404).json({ error: 'Not found' });
  } catch (error) {
    console.error('Auth API error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
