const express = require('express')
const router = express.Router();
const {verifyJwt} = require('./verifyJwt')


router.get('/check_auth', verifyJwt, async (req, res) => {
    res.status(200).json({ isAuthenticated: true});
});

module.exports = router;