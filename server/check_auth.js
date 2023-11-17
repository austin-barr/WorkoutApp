const express = require('express')
const jwt = require('jsonwebtoken');
const router = express.Router();
const {verifyJwt} = require('./verifyJwt')


router.get('/check_auth', verifyJwt, async (req, res) => {
    console.log("check_auth hit");
    res.status(200).json({ isAuthenticated: true})
    console.log(res.ok)
});
module.exports = router;