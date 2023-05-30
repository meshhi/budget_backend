var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');

/* GET auth login. */
router.post('/registration', authController.registration);
router.post('/login', authController.login);

module.exports = router;
