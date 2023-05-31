var express = require('express');
var router = express.Router();
const userRouter = require('./routers/userRouter');
const postRouter = require('./routers/postRouter');
const checkAuthMiddleware = require('../../middlewares/checkAuthMiddleware');

router.use(checkAuthMiddleware);
router.use('/user', userRouter);
router.use('/post', postRouter);

module.exports = router;
