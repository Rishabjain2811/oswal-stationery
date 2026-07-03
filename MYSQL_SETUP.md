# OSWAL Gift & Stationery - Setup Guide

## Database Setup (MySQL)

### Prerequisites
- MySQL Server 5.7 or later installed and running
- Node.js and npm installed

### Steps to Set Up MySQL

#### 1. Create Database
Open MySQL command line or MySQL Workbench and run:

```sql
CREATE DATABASE oswal_gift_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

#### 2. Create Database User (Optional but Recommended)
For security, create a dedicated user instead of using root:

```sql
CREATE USER 'oswal_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON oswal_gift_db.* TO 'oswal_user'@'localhost';
FLUSH PRIVILEGES;
```

#### 3. Update .env Configuration
Edit `server/.env` with your database credentials:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=oswal_user        # Use 'root' if using root account
DB_PASSWORD=secure_password
DB_NAME=oswal_gift_db
PORT=3000
NODE_ENV=development
```

#### 4. Install Dependencies
```bash
cd server
npm install
```

This will install:
- **mysql2**: MySQL database driver
- **dotenv**: Environment variable management
- **express**: Web framework
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **cors**: Cross-Origin Resource Sharing
- **cookie-parser**: Cookie parsing

#### 5. Start the Server
```bash
npm start
```

The server will:
- Connect to MySQL
- Automatically create the `users` table if it doesn't exist
- Start on http://localhost:3000

### Database Schema

The application automatically creates the following table:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Testing Authentication

1. **Register a new account**: Click "Register" button, fill in details
2. **Sign in**: Use registered email and password
3. **Sign out**: Click "Sign out" in the navbar

### Common Issues

#### "Connection refused" Error
- Make sure MySQL Server is running
- Check DB_HOST, DB_PORT, DB_USER, and DB_PASSWORD in .env

#### "Database doesn't exist" Error
- Run the CREATE DATABASE command above

#### "Access Denied" Error
- Verify credentials in .env file
- Ensure the user has proper permissions

### Verification

Test the API endpoints:

```bash
# Check authentication status
curl http://localhost:3000/api/auth/me

# Test registration (POST)
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Test login (POST)
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Production Deployment

Before deploying to production:

1. Change JWT_SECRET to a strong random value
2. Set NODE_ENV=production
3. Use environment-specific database
4. Enable HTTPS (set secure: true in cookies)
5. Use strong database passwords
6. Never commit .env files to version control
