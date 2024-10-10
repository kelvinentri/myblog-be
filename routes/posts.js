var express = require('express');
const { addImageHandler, addPost, getBlogData } = require('../controllers/postController');
const multer  = require('multer');
const verifyUser = require('../middlewares.js/auth');
var router = express.Router();
// https://medium.com/swlh/how-to-upload-image-using-multer-in-node-js-f3aeffb90657

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+"_"+file.originalname)
    }
})
const upload = multer({ storage: storage })
router.post('/addimage',verifyUser, upload.single('image'), addImageHandler)
router.post('/createPost',verifyUser, addPost)
router.get('/getBlogData',verifyUser, getBlogData)

module.exports = router;