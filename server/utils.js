const express = require('express')
const { changeUserImage, getUserByUsername, removeSession, getSession, logWeight, getWeights, getDurations, getRecentWeight } = require('./database/queries')
const router = express.Router();
const multer = require('multer');
const {verifyJwt} = require('./verifyJwt')

const storage = multer.diskStorage({
    destination: 'profileImages/',
    filename: function (req, file, cb) {
        const fileName = file.originalname;
        console.log('disk:')
        console.log(req.body)
        cb(null, fileName);
    },
});
  
const upload = multer({ storage });

router.post('/upload/test', (req, res) => {
    console.log('test req')
    console.log(req)
});

router.post('/upload/user', verifyJwt, upload.single('file'), async (req, res) => {
    console.log('request:')
    //console.log(req)
    console.log(req.body)
    console.log(req.body.userId)
    console.log(req.file.filename)
    const result = await changeUserImage(req.body.userId, req.file.filename)
    console.log('change result:')
    console.log(result)
});

router.post('/lookup/username', async (req, res) => {
    console.log('post to lookup/username')
    const result = await getUserByUsername(req.body.username);
    console.log("result here")
    console.log(result)
    if (result) {
        res.json({"result": result})
    }
    else {
        res.json({"success":false})
    }
});

router.post('/signout', verifyJwt, async (req, res) => {
    try {
        // const result = await removeSession(req.body.token);
        const result = await removeSession(req.cookies.token);
        console.log("result here")
        console.log(result)
        if (result) {
            res.status(200).clearCookie('token').json({})
        }
        else {
            res.status(500).json({ message: result.message})
        }
    }
    catch (err) {
        console.log(err)
    }
});

router.post('/log/weight', verifyJwt, async (req, res) => {
    //console.log(req)
    try {
        result = await logWeight(req.userId, req.body.date, req.body.weight)
        console.log("result here")
        console.log(result)
        if (result) {
            res.json({"result": result})
        }
        else {
            res.json({"success":false})
        }
    }
    catch (err) {
        console.log(err)
    }
});

router.post('/get/weights', verifyJwt, async (req, res) => {
    const userId = req.userId
    const startDate = req.body.startDate
    const endDate = req.body.endDate
    try {
        const result = await getWeights(userId, startDate, endDate)
        const prevWeight = await getRecentWeight(userId, startDate)
        console.log("weights result")
        console.log(result)
        console.log(prevWeight)
        if (result) {
            res.status(200).json({rows: result, prevWeight: prevWeight})
        }
        else {
            res.json({"success":false})
        }
    }
    catch (err) {
        console.log(err)
    }
});

router.post('/get/durations', verifyJwt, async (req, res) => {
    const userId = req.userId
    const startDate = req.body.startDate
    const endDate = req.body.endDate
    try {
        result = await getDurations(userId, startDate, endDate)
        console.log("durations result")
        console.log(result)
        if (result) {
            res.status(200).json({rows: result})
        }
        else {
            res.json({success: false})
        }
    }
    catch (err) {
        console.log(err)
    }
});

router.post('/get/recent-weight', verifyJwt, async (req, res) => {
    console.log('enter recent weight utils')
    const userId = req.userId
    const date = req.body.date
    try {
        result = await getRecentWeight(userId, date)
        console.log("weight result")
        console.log(result)
        if (result) {
            res.status(200).json({rows: result})
        }
        else {
            res.json({"success":false})
        }
    }
    catch (err) {
        console.log(err)
    }
});

module.exports = router;