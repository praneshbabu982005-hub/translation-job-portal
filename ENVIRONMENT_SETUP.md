# Environment Setup Guide

## Local Development

### Frontend Environment Variables
Create a `.env.local` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:5000
```

### Backend Environment Variables
Create a `.env` file in the `server` directory:

```env
# For local development with local MongoDB
MONGODB_URI=mongodb://localhost:27017/translation-job-portal
# OR for local development with MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/translation-job-portal?retryWrites=true&w=majority

JWT_SECRET=your-local-secret-key
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
ADMIN_URL=http://localhost:3000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## Production Environment

### Frontend (Render Static Site)
Set these environment variables in Render:

```env
REACT_APP_API_URL=https://your-api-service.onrender.com
```

### Backend (Render Web Service)
Set these environment variables in Render:

```env
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/translation-job-portal?retryWrites=true&w=majority
JWT_SECRET=your-production-secret-key
FRONTEND_URL=https://your-frontend-service.onrender.com
ADMIN_URL=https://your-frontend-service.onrender.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
RENDER=true
```

## Important Notes

1. **JWT_SECRET**: Use a strong, random secret key in production
2. **MONGODB_URI**: Replace username, password, and cluster details with your actual MongoDB Atlas credentials
3. **EMAIL_***: These are optional but recommended for notification features
4. **Environment Variables**: Never commit `.env` files to version control
5. **CORS**: The backend automatically configures CORS based on the FRONTEND_URL environment variable
