const express = require('express')
const { changeUserImage, getUserByUsername, removeSession, getSession, logWeight } = require('./database/queries')
const router = express.Router();
const multer = require('multer');
const { route } = require('./signup');
const jwt = require('jsonwebtoken');

const verifyJwt = async (req, res, next) => {
    console.log('verify called')
    const authHeader = req.headers['authorization'];
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == 'undefined' || !authHeader.startsWith('Bearer ')) {
      req.status = 401;
      req.body = { error: 'Unauthorized' };
      console.log("no token")
      res.status(401).json({ error: 'Unauthorized' });
      return
    }
  
    try {
      console.log('enter try')
      console.log(token)
      console.log(process.env.JWT_SECRET)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded)
      req.userId = decoded.userId;
      console.log("decoded")
      console.log(decoded.userId)
      next()
    } catch (err) {
      console.log(err)
      req.status = 401;
      req.body = { error: 'Unauthorized' };
    }
};

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

router.post('/upload/user', upload.single('file'), async (req, res) => {
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

router.post('/signout', async (req, res) => {
    try {
        const result = await removeSession(req.body.token);
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

router.post('/get/weight', verifyJwt, async (req, res) => {
    try {
        result = await getWeight(req.body.weight)
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

module.exports = router;