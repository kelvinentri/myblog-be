var express = require('express');
const { addImageHandler } = require('../controllers/postController');
const multer  = require('multer')
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
router.post('/addimage', upload.single('image'), addImageHandler)

module.exports = router;