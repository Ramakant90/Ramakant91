const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
require('dotenv').config(); // .env सपोर्ट के लिए

// ✅ Sequelize DB connection
const { sequelize } = require('./config/db'); // ✅ Add this here


// Routes
const uploadRoutes = require('./routes/uploadRoutes');
const authRoutes = require('./routes/authRoutes');
const commentRoutes = require('./routes/commentRoutes');
const xsrPingRoutes = require('./routes/xsrPingRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const liveRoutes = require('./routes/liveRoutes');

const app = express();

// ✅ CORS Setup
const allowedOrigins = ['http://localhost:3000'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// ✅ Middlewares
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ API Routes
app.use('/api/comments', commentRoutes);
app.use('/api/xsrping', xsrPingRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/live', liveRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/media', uploadRoutes);

// ✅ Static Folder (optional for local file access)
app.use('/uploads', express.static('uploads'));

// ✅ Default route
app.get('/', (req, res) => {
  res.send('🚀 Welcome to XSR Royale Backend API');
});

// ✅ Sequelize Sync (👇 यहीं डालो)
sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Database synced successfully');
  })
  .catch((err) => {
    console.error('❌ Error syncing database:', err);
  });

// ✅ 404 Not Found Handler
app.use((req, res) => {
  res.status(404).json({ message: '❌ Route not found' });
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Global Error:', err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

module.exports = app;
