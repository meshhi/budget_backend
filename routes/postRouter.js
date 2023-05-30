var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');

/* GET auth login. */
router.post('/registration', authController.registration);

module.exports = router;
