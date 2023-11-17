const jwt = require('jsonwebtoken');

async function verifyJwt(req, res, next) {
    console.log('verify called')
    // const authHeader = req.headers['authorization'];
    // console.log(authHeader)
    // const token = authHeader && authHeader.split(' ')[1];
    const token = req.cookies.token
    console.log(token)
  
    // if (token == 'undefined' || !authHeader.startsWith('Bearer ')) {
    if (token === undefined) {
      req.status = 401;
      req.body = { error: 'Unauthorized' };
      console.log("no token")
      res.status(401).json({ error: 'Unauthorized' });
      return
    }
  
    try {
      console.log(process.env.JWT_SECRET)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const isExpired = decoded.exp < Date.now() / 1000;

      if (isExpired) {
        console.log('Token expired');
        req.status.status(401).json({ error: 'Unauthorized - Token had expired' });
      }

      req.userId = decoded.userId;
      console.log("decoded.userId")
      console.log(decoded.userId)
      next()
    } catch (err) {
      console.log(err)
      req.status.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
};

module.exports = {
    verifyJwt
}