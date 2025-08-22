# Netlify Deployment Guide

## Prerequisites
- Netlify account
- Your project connected to a Git repository

## Deployment Steps

### 1. Connect Your Repository
1. Go to [Netlify](https://netlify.com)
2. Click "New site from Git"
3. Connect your GitHub/GitLab/Bitbucket repository
4. Select the repository containing this project

### 2. Configure Build Settings
- **Build command**: `npm run build`
- **Publish directory**: `dist/public`
- **Functions directory**: `dist`

### 3. Set Environment Variables
In Netlify dashboard → Site settings → Environment variables, add:
```
NODE_ENV=production
PORT=8888
DATABASE_URL=your_actual_database_url
```

### 4. Deploy
1. Click "Deploy site"
2. Wait for build to complete
3. Your site will be available at `urlshortener0.netlify.app`

## Custom Domain Setup
1. Go to Site settings → Domain management
2. Add custom domain: `urlshortener0.com`
3. Follow DNS configuration instructions

## Important Notes
- The app uses serverless functions for API endpoints
- All routes redirect to `index.html` for SPA routing
- API calls are proxied to Netlify functions
- Make sure your database is accessible from Netlify's servers

## Troubleshooting
- Check build logs for any errors
- Verify environment variables are set correctly
- Ensure database connection is working
- Check function logs in Netlify dashboard
