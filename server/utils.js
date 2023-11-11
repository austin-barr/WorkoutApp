const express = require('express')
const { changeUserImage, getUserByUsername } = require('./database/queries')
const router = express.Router();
const multer = require('multer');
const { route } = require('./signup');

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
    console.log(req.body.userID)
    console.log(req.file.filename)
    const result = await changeUserImage(req.body.userID, req.file.filename)
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

module.exports = router;