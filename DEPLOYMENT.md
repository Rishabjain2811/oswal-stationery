# Vercel Deployment Guide

## Environment Variables Required

Set these in Vercel Dashboard → Project Settings → Environment Variables:

### Database Configuration
- `DB_HOST` - MySQL database host
- `DB_PORT` - MySQL port (default: 3306)
- `DB_USER` - MySQL username
- `DB_PASSWORD` - MySQL password
- `DB_NAME` - Database name

### Authentication
- `JWT_SECRET` - Secret key for JWT token signing (use a strong random string)
- `NODE_ENV` - Set to `production`

## Deployment Steps

1. **Connect Repository**
   - Go to Vercel Dashboard
   - Click "Add New Project"
   - Import your GitHub repository

2. **Configure Project**
   - Framework Preset: Other
   - Root Directory: `./` (leave empty)
   - Build Command: (leave empty)
   - Output Directory: `./` (leave empty)

3. **Set Environment Variables**
   - Add all required environment variables listed above
   - Ensure they're set for Production, Preview, and Development environments

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

## Database Setup

You need an external MySQL database (Vercel doesn't provide MySQL):
- Options: PlanetScale, Railway, AWS RDS, or any MySQL hosting
- Create a database and get connection credentials
- Add credentials to Vercel environment variables
- The serverless function will auto-create the `users` table on first run

## Architecture Notes

- **Static Files**: All HTML, CSS, JS, images served as static assets
- **API Routes**: Auth API runs as Vercel Serverless Functions in `/api/` directory
- **Redirects**: Old dynamic URLs redirect to static product pages via vercel.json
- **Server Directory**: Excluded from deployment (used only for local development)

## Local Development

To run locally with the Express server:
```bash
cd server
npm install
node index.js
```

## Troubleshooting

### API Not Working
- Check environment variables are set correctly
- Verify database is accessible from Vercel
- Check Vercel function logs

### Database Connection Issues
- Ensure MySQL host allows external connections
- Check firewall rules
- Verify credentials are correct

### Redirects Not Working
- Check vercel.json syntax
- Ensure destination files exist
- Check Vercel deployment logs
