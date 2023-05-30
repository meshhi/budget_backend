var express = require('express');
var router = express.Router();
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const postRouter = require('./postRouter');

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/post', postRouter);

module.exports = router;
