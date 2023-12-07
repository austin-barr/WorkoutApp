const express = require('express')
const { verifyLogin, createSession } = require('./database/queries')
const { check, validationResult } = require('express-validator');
const router = express.Router();
const jwt = require('jsonwebtoken')

router.post('/login', [
    check('username').notEmpty().isString().trim(),
    check('password').notEmpty().isString().trim(),
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { username, password } = req.body;
    try {
        const userId = await verifyLogin(username, password);
        if (userId !== undefined) {
            const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
            res.status(200).cookie('token', token, {
                httpOnly: true,
                expires: new Date(Date.now() + 24 * 3600000) // cookie will be removed after 24 hours
            }).json({})
        } 
        else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    }
    catch (err) {
        res.status(err.status).json({ message: err.message });
    }
});

module.exports = router;