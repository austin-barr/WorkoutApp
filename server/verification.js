const jwt = require('jsonwebtoken');
const { isAuthorized, isAdmin } = require('./database/queries')
const bcrypt = require('bcrypt')
require('dotenv').config();

async function verifyJwt(req, res, next) {
    const token = req.cookies.token
  
    if (token === undefined) {
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

async function verifyUserAuthorized(req, res, next) {
  const userId = req.userId

  try{
    const isAuth = await isAuthorized(userId)
    if (!isAuth) {
      res.status(401).json({ error: 'Unauthorized' });
      return
    }
    next()
  }
  catch (err) {
    console.log(err)
    res.status(401).json({ error: 'Unauthorized' });
  }
    
}

async function verifyUserAdmin(req, res, next) {
  const userId = req.userId

  try{
    const isAdmin = await isAdmin(userId)
    if (!isAdmin) {
      res.status(401).json({ error: 'Unauthorized' });
      return
    }
    next()
  }
  catch (err) {
    console.log(err)
    res.status(401).json({ error: 'Unauthorized' });
  }
}

module.exports = {
  verifyJwt,
  verifyUserAuthorized,
  verifyUserAdmin,
}