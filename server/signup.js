const express = require('express')
const { createUser } = require('./database/queries')
const router = express.Router();

router.post('/signup', async (req, res) => {
    const userId = await createUser(req.body.userData, '/defaultImages/BigFella.png');
    if (userId) {
        res.json({success:true, userId:userId})
    }
    else {
        res.status(500).json({message: "Internal server error"})
    }
});

module.exports = router;