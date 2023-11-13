const express = require('express')

const jwt = require('jsonwebtoken');
const router = express.Router();
// Required to parse cookies


 // Use cookie-parser middleware


router.get('/check_auth', (req, res) => {
    console.log("check_auth hit");
    try {
        const token = req.cookies.token; // Access the token stored in the HttpOnly cookie
        if (!token) {
            return res.status(401).json({ isAuthenticated: false });
        }

        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ isAuthenticated: false });
            }

            // Token is valid
            res.status(200).json({ isAuthenticated: true, user: decoded });
        });
    } catch (error) {
        res.status(500).json({ isAuthenticated: false, error: 'Internal Server Error' });
    }
});
module.exports = router;