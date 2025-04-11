require('dotenv').config();

const app = require('./app');
const http = require('http');
const { sequelize, connectDB } = require('./config/db');
const User = require('./models/User'); // बाद में बाकी models भी जोड़ सकते हो


const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

connectDB().then(() => {
  sequelize.sync({ alter: true }).then(() => {
    console.log('📦 All models synced with the database.');
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
