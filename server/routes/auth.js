const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'oswal-dev-secret-change-in-production';
const TOKEN_COOKIE = 'oswal_auth';
const TOKEN_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

function sanitizeUser(row) {
  return { id: row.id, name: row.name, email: row.email };
}

function setAuthCookie(res, user) {
  const token = jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
  res.cookie(TOKEN_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: TOKEN_MAX_AGE_MS,
    secure: process.env.NODE_ENV === 'production'
  });
}

async function readAuthUser(req) {
  const token = req.cookies[TOKEN_COOKIE];
  if (!token) return null;
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const row = await db.findUserById(payload.sub);
    return row ? sanitizeUser(row) : null;
  } catch (_err) {
    return null;
  }
}

router.get('/me', async function (req, res) {
  try {
    const user = await readAuthUser(req);
    res.json({ user: user || null });
  } catch (error) {
    console.error('Error in /me:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/register', async function (req, res) {
  try {
    const name = String(req.body.name || '').trim();
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters.' });
    }

    const existingUser = await db.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'An account with this email already exists.' });
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    const row = await db.createUser(name, email, passwordHash);
    const user = sanitizeUser(row);
    setAuthCookie(res, user);
    res.status(201).json({ user: user });
  } catch (error) {
    console.error('Error in /register:', error);
    res.status(500).json({ error: error.message || 'Registration failed' });
  }
});

router.post('/login', async function (req, res) {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const row = await db.findUserByEmail(email);
    if (!row || !bcrypt.compareSync(password, row.password_hash)) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const user = sanitizeUser(row);
    setAuthCookie(res, user);
    res.json({ user: user });
  } catch (error) {
    console.error('Error in /login:', error);
    res.status(500).json({ error: error.message || 'Login failed' });
  }
});

router.post('/logout', async function (_req, res) {
  try {
    res.clearCookie(TOKEN_COOKIE);
    res.json({ ok: true });
  } catch (error) {
    console.error('Error in /logout:', error);
    res.status(500).json({ error: 'Logout failed' });
  }
});

module.exports = router;
