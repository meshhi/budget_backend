var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');

/* GET auth login. */
router.get('/', authController.registration);

module.exports = router;
