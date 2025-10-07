// Environment Variables Configuration Example
// Copy this to .env file and update with your actual values

module.exports = {
  // MongoDB Configuration
  MONGODB_URI: 'mongodb+srv://username:password@cluster.mongodb.net/translation-job-portal?retryWrites=true&w=majority',
  MONGO_URI: 'mongodb+srv://username:password@cluster.mongodb.net/translation-job-portal?retryWrites=true&w=majority',

  // JWT Configuration
  JWT_SECRET: 'your-super-secret-jwt-key-here',

  // Server Configuration
  PORT: 5000,
  NODE_ENV: 'production',

  // CORS Configuration
  FRONTEND_URL: 'https://your-frontend-app.onrender.com',
  ADMIN_URL: 'https://your-admin-app.onrender.com',

  // Email Configuration (Optional - for notifications)
  EMAIL_USER: 'your-email@gmail.com',
  EMAIL_PASS: 'your-app-password',

  // Render Configuration
  RENDER: true
};

/*
Create a .env file in the server directory with these variables:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/translation-job-portal?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-app.onrender.com
ADMIN_URL=https://your-admin-app.onrender.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
RENDER=true
*/
