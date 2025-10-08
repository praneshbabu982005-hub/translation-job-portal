// Environment Variables Configuration Example
// Copy this to .env file and update with your actual values

module.exports = {
  // MongoDB Configuration (Local MongoDB Compass)
  MONGODB_URI: 'mongodb://localhost:27017/translation-job-portal',

  // JWT Configuration
  JWT_SECRET: 'your-super-secret-jwt-key-here',

  // Server Configuration
  PORT: 5000,
  NODE_ENV: 'development',

  // CORS Configuration
  FRONTEND_URL: 'http://localhost:3000',
  ADMIN_URL: 'http://localhost:3000',

  // Email Configuration (Optional - for notifications)
  EMAIL_USER: 'your-email@gmail.com',
  EMAIL_PASS: 'your-app-password'
};

/*
Create a .env file in the server directory with these variables:
MONGODB_URI=mongodb://localhost:27017/translation-job-portal
JWT_SECRET=your-super-secret-jwt-key-here
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
ADMIN_URL=http://localhost:3000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

Note: Make sure MongoDB is installed and running locally on port 27017.
You can connect to it using MongoDB Compass at: mongodb://localhost:27017
*/
