// export mongodb url
const MONGO_USERNAME = 'username';
const MONGO_PASSWORD = 'your_password';
const MONGO_HOSTNAME = '127.0.0.1';
const MONGO_PORT = '27017';
const MONGO_DB = 'fashion-cube';

// Use MONGODB_URI environment variable if available (for production), otherwise fallback to local
const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/fashion-cube";

module.exports = mongoURI;
