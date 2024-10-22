var express = require('express');
const { createPost, addImageController, getpostData } = require('../controllers/postController');
const verifyUser = require('../middlewares.js/auth');
const multer =require('multer')
var router = express.Router();


var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images');
     },
    filename: function (req, file, cb) {
        cb(null , Date.now()+'_'+file.originalname);
    }
});

var upload = multer({ storage: storage })

router.post('/createpost',verifyUser, createPost)
router.post('/addImage',verifyUser, upload.single('img'), addImageController)
router.get('/getpostData',verifyUser,getpostData)



module.exports = router;