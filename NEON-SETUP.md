# 🚀 Neon Database Setup Guide for URL Shortener

## Prerequisites
- Neon account at [neon.com](https://neon.com)
- Your URL shortener project ready for deployment

## Step-by-Step Setup

### 1. Create Neon Account & Project
1. **Sign up** at [neon.com](https://neon.com)
2. **Create new project**:
   - Project name: `urlshortener-db`
   - Region: Choose closest to your users
   - Click "Create Project"

### 2. Get Database Connection String
1. After project creation, you'll see a **connection string**
2. It looks like: `postgresql://username:password@ep-abc123.us-east-1.aws.neon.tech/database_name`
3. **Copy this entire string** - you'll need it for Netlify

### 3. Set Up Database Schema
1. In Neon dashboard, click **"SQL Editor"**
2. Copy and paste the contents of `database-setup.sql`
3. Click **"Run"** to execute the script
4. This creates your tables and sample data

### 4. Configure Netlify Environment Variables
1. Go to your Netlify dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Add these variables:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `8888` |
| `DATABASE_URL` | `your_neon_connection_string_here` |

### 5. Test Database Connection
1. Deploy your site to Netlify
2. Check the **Functions** tab for any database connection errors
3. Try creating a shortened URL to test the database

## Database Schema

Your database will have these tables:

### `urls` Table
- `id`: Unique identifier (UUID)
- `original_url`: The long URL to shorten
- `short_code`: The shortened code (e.g., "abc123")
- `custom_alias`: Optional custom alias
- `click_count`: Number of times clicked
- `is_active`: Whether the URL is active
- `created_at`: Creation timestamp

### `clicks` Table
- `id`: Unique identifier (UUID)
- `url_id`: Reference to the URL
- `timestamp`: When the click happened
- `user_agent`: Browser information
- `ip_address`: Visitor's IP address

## Environment Variables Format

Your `DATABASE_URL` should look like:
```
postgresql://username:password@ep-abc123.us-east-1.aws.neon.tech/database_name
```

## Troubleshooting

### Common Issues:
1. **Connection refused**: Check if your Neon project is active
2. **Authentication failed**: Verify username/password in connection string
3. **Table doesn't exist**: Run the database setup script
4. **SSL errors**: Neon requires SSL connections (handled automatically)

### Check Logs:
- **Netlify Functions**: Check function logs in Netlify dashboard
- **Build logs**: Verify environment variables are set correctly
- **Database logs**: Check Neon dashboard for connection issues

## Security Notes

- ✅ **Never commit** your `DATABASE_URL` to Git
- ✅ **Use environment variables** in Netlify
- ✅ **Enable SSL** (Neon does this automatically)
- ✅ **Use connection pooling** for better performance

## Performance Tips

- Neon automatically scales based on usage
- Free tier includes 3GB storage and 10GB transfer
- Consider upgrading if you expect high traffic
- Monitor usage in Neon dashboard

## Next Steps

After setup:
1. **Deploy to Netlify** with the new environment variables
2. **Test URL shortening** functionality
3. **Monitor database performance** in Neon dashboard
4. **Set up alerts** for database usage if needed

Your URL shortener is now ready with a production-ready Neon database! 🎉
