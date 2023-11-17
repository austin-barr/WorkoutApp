const express = require('express')
const jwt = require('jsonwebtoken');
const router = express.Router();
const {verifyJwt} = require('./verifyJwt')


router.post('/check_auth', verifyJwt, async (req, res) => {
    console.log("check_auth hit");
    res.status(200).json({ isAuthenticated: true});
});

module.exports = router;