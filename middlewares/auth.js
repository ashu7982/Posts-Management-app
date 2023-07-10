

const jwt = require('jsonwebtoken');
const User = require('../models/user');

// we are checking authorization with the help of token.

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const userToken = jwt.verify(token, 'secret');
    const user = await User.findById(userToken.userId);

    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Not authorized' });
  }
};

module.exports = auth;