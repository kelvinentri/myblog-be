var express = require('express');
const { doSignup } = require('../controllers/userController');
var router = express.Router();

router.post('/signup',doSignup)

module.exports = router;
