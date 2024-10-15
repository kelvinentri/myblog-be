var express = require('express');
const { doSignup, doLogin, getData } = require('../controllers/userController');
const verifyUser = require('../middlewares.js/auth');
var router = express.Router();

router.post('/signup',doSignup)
router.post('/login',doLogin)
router.get('/getData',verifyUser ,getData)

module.exports = router;
