var express = require('express');
const { doSignup, dologin } = require('../controllers/userController');
var router = express.Router();

router.post('/signup',doSignup)
router.post('/login',dologin)

module.exports = router;
