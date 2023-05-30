var express = require('express');
var router = express.Router();
const postController = require('../controllers/postController');

/* GET auth login. */
router.post('/create', postController.createPost);

module.exports = router;
