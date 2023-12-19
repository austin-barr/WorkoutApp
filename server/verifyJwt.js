const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
require('dotenv').config();
// const { removeSession, getSession } = require('./database/queries');

async function verifyJwt(req, res, next) {
    const token = req.cookies.token
  
    if (token === undefined) {
      req.status = 401;
      req.body = { error: 'Unauthorized' };
      res.status(401).json({ error: 'Unauthorized' });
      return
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const isExpired = decoded.exp < Date.now() / 1000;

      if (isExpired) {
        req.status.status(401).json({ error: 'Unauthorized - Token has expired' });
      }

      req.userId = decoded.userId;
      next()
    } catch (err) {
      req.status.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
};

module.exports = {
    verifyJwt
}