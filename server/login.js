const express = require('express')
const { verifyLogin, createSession } = require('./database/queries')
const { check, validationResult } = require('express-validator');
const router = express.Router();
const jwt = require('jsonwebtoken')

router.post('/login', [
    check('username').notEmpty().isString().trim(),
    check('password').notEmpty().isString().trim(),
  ], async (req, res) => {
    console.log(req)
    const errors = validationResult(req);
    console.log("login hit");
    if (!errors.isEmpty()) {
        console.log(errors)
      return res.status(400).json({ errors: errors.array() });
    }
  
    console.log(req.body);
    const { username, password } = req.body;
    try {
        const userId = await verifyLogin(username, password);
        console.log(userId)
        if (userId !== undefined) {
            const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET);
            const result = await createSession(username, token)
            if (result.success) {
                res.status(200).json({ token });
            }
            else {
                res.status(401).json({ message: result.message })
            }
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    }
    catch (err) {
        console.log(err)
        res.status(err.status).json({ message: err.message });
    }
});

module.exports = router;