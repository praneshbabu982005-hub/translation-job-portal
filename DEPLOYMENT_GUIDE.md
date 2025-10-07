# Translation Job Portal - Deployment Guide

This guide will help you deploy your Translation Job Portal to MongoDB Atlas and Render.

## Prerequisites

- MongoDB Atlas account
- Render account
- GitHub account (for automatic deployments)
- Node.js installed locally

## Step 1: Set up MongoDB Atlas

### 1.1 Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new cluster (choose the free M0 tier)

### 1.2 Configure Database Access
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Create a user with username and password
4. Set permissions to "Read and write to any database"

### 1.3 Configure Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
4. For production: Add Render's IP ranges or use 0.0.0.0/0

### 1.4 Get Connection String
1. Go to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`)
5. Replace `<password>` with your actual password
6. Replace `<database>` with `translation-job-portal`

## Step 2: Prepare Your Code for Deployment

### 2.1 Update Environment Variables
Create a `.env` file in the `server` directory with the following variables:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/translation-job-portal?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-app.onrender.com
ADMIN_URL=https://your-admin-app.onrender.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
RENDER=true
```

### 2.2 Test Locally
```bash
# Install dependencies
npm install
cd server && npm install

# Start the application
npm run dev
```

## Step 3: Deploy to Render

### 3.1 Push to GitHub
1. Create a new repository on GitHub
2. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/translation-job-portal.git
git push -u origin main
```

### 3.2 Deploy Backend (API)
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `translation-job-portal-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install && cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Plan**: Free

5. Add Environment Variables:
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A strong secret key
   - `PORT`: `10000`
   - `FRONTEND_URL`: `https://translation-job-portal.onrender.com`

6. Click "Create Web Service"

### 3.3 Deploy Frontend
1. In Render Dashboard, click "New +" → "Static Site"
2. Connect your GitHub repository
3. Configure the static site:
   - **Name**: `translation-job-portal`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
   - **Plan**: Free

4. Add Environment Variables:
   - `REACT_APP_API_URL`: `https://translation-job-portal-api.onrender.com`

5. Click "Create Static Site"

### 3.4 Update API URLs in Frontend
You'll need to update your React app to use the production API URL. Check your `src` files for any hardcoded localhost URLs and replace them with environment variables.

## Step 4: Configure MongoDB Atlas for Production

### 4.1 Update Network Access
1. In MongoDB Atlas, go to "Network Access"
2. Add Render's IP ranges or use 0.0.0.0/0 for simplicity

### 4.2 Test Database Connection
1. Check your Render logs to ensure the database connection is successful
2. Look for "Connected to MongoDB Atlas" message in the logs

## Step 5: Set up Email Notifications (Optional)

### 5.1 Configure Gmail App Password
1. Enable 2-factor authentication on your Gmail account
2. Generate an app password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. Use this password in your `EMAIL_PASS` environment variable

### 5.2 Update Environment Variables
Add these to your Render backend service:
- `EMAIL_USER`: Your Gmail address
- `EMAIL_PASS`: The app password you generated

## Step 6: Final Testing

### 6.1 Test API Endpoints
Visit your API URL and test the endpoints:
- `GET https://your-api.onrender.com/api/jobs`
- `POST https://your-api.onrender.com/api/auth/register`
- `POST https://your-api.onrender.com/api/auth/login`

### 6.2 Test Frontend
1. Visit your frontend URL
2. Test user registration and login
3. Test job posting (admin functionality)
4. Test job applications

## Troubleshooting

### Common Issues:

1. **Database Connection Failed**
   - Check MongoDB Atlas network access settings
   - Verify connection string format
   - Check Render logs for specific error messages

2. **CORS Errors**
   - Verify `FRONTEND_URL` environment variable matches your actual frontend URL
   - Check server CORS configuration

3. **Build Failures**
   - Check that all dependencies are listed in package.json
   - Verify build commands in Render configuration

4. **API Not Found (404)**
   - Ensure API routes are properly configured
   - Check that the server is serving the React build files correctly

### Render Logs
- Check Render dashboard → Your service → Logs
- Look for error messages and connection status

### MongoDB Atlas Logs
- Check MongoDB Atlas → Monitoring → Logs
- Look for connection attempts and any errors

## Environment Variables Reference

### Backend (API Service)
```env
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
FRONTEND_URL=https://your-frontend.onrender.com
ADMIN_URL=https://your-frontend.onrender.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### Frontend (Static Site)
```env
REACT_APP_API_URL=https://your-api.onrender.com
```

## Security Notes

1. **JWT Secret**: Use a strong, random secret key
2. **Database Password**: Use a strong password for your MongoDB user
3. **Network Access**: Consider restricting MongoDB network access to specific IP ranges in production
4. **Environment Variables**: Never commit sensitive data to your repository

## Maintenance

1. **Regular Backups**: MongoDB Atlas provides automatic backups
2. **Monitor Usage**: Keep an eye on Render and MongoDB Atlas usage limits
3. **Update Dependencies**: Regularly update npm packages for security
4. **Monitor Logs**: Check Render logs regularly for any issues

## Support

- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [React Deployment Guide](https://create-react-app.dev/docs/deployment/)

Your Translation Job Portal should now be live and accessible at your Render URLs!
