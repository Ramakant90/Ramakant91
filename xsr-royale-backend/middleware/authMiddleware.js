const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findByPk(decoded.id);
      next();
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized - Invalid Token' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Unauthorized - Token Not Found' });
  }
};

module.exports = authenticate;
