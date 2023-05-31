const express = require('express');
const router = express.Router();
const postRouter = require('./routers/postRouter');
const checkAuthMiddleware = require('../../middlewares/checkAuthMiddleware');

router.use(checkAuthMiddleware);
router.use('/blog-post', postRouter);

module.exports = router;
