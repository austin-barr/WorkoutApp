const express = require('express')
const { createUser } = require('./database/queries')
const router = express.Router();

router.post('/signup', async (req, res) => {
    const { username, password, confirm, email, phoneNumber, birthDate } = req.body;

    const result = await createUser(req.body, '/defaultImages/BigFella.png');
    if (result) {
        userId = result.insertId;
        console.log(result)
        console.log(userId)
        res.json({success:true, userId:userId})
    }
    else {
    res.status(200).json({success:false, message: "failed to create user"})
    console.log(result);
    }
});

module.exports = router;