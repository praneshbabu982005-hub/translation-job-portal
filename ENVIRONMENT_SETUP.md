# Environment Setup Guide

## Local Development

### Prerequisites
1. **Install MongoDB Community Edition** from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. **Install MongoDB Compass** (GUI tool) from [MongoDB Compass Download](https://www.mongodb.com/try/download/compass)
3. **Start MongoDB Service**:
   - Windows: MongoDB should start automatically after installation
   - Mac: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongod`

### Frontend Environment Variables
Create a `.env.local` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:5000
```

### Backend Environment Variables
Create a `.env` file in the `server` directory:

```env
# Local MongoDB (MongoDB Compass)
MONGODB_URI=mongodb://localhost:27017/translation-job-portal

JWT_SECRET=your-local-secret-key
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
ADMIN_URL=http://localhost:3000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### Connecting with MongoDB Compass
1. Open MongoDB Compass
2. Use connection string: `mongodb://localhost:27017`
3. Connect to view and manage your `translation-job-portal` database
4. All data will be stored locally on your machine

## Important Notes

1. **MongoDB Local**: All data is stored locally in MongoDB Compass (no cloud/Atlas required)
2. **JWT_SECRET**: Use a strong, random secret key
3. **EMAIL_***: These are optional but recommended for notification features
4. **Environment Variables**: Never commit `.env` files to version control
5. **CORS**: The backend automatically configures CORS based on the FRONTEND_URL environment variable
6. **Database Location**: Your local MongoDB data is stored in the default MongoDB data directory
