const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'oswal_gift_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelayMs: 0
});

// Test connection
pool.getConnection().then(function(conn) {
  console.log('✓ Database connection successful');
  conn.release();
}).catch(function(err) {
  console.error('✗ Database connection failed:', err.message);
  console.error('  Check your .env credentials: DB_HOST, DB_USER, DB_PASSWORD, DB_NAME');
});

// Initialize database tables
async function initializeDatabase() {
  try {
    const connection = await pool.getConnection();
    
    // Create users table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    console.log('✓ Database tables initialized');
    connection.release();
  } catch (error) {
    console.error('✗ Database initialization error:', error.message);
    process.exit(1);
  }
}

async function findUserByEmail(email) {
  try {
    const connection = await pool.getConnection();
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
    const connection = await pool.getConnection();
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
    const connection = await pool.getConnection();
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

module.exports = {
  pool,
  initializeDatabase,
  findUserByEmail,
  findUserById,
  createUser
};
