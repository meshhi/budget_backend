var express = require('express');
var router = express.Router();
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const postRouter = require('./postRouter');
/**
 * @openapi
 * tags:
 *   - name: '/auth'
 *     description: Auth routes
 *   - name: '/user'
 *     description: User routes
 *   - name: '/post'
 *     description: Post routes
 */
router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/post', postRouter);

module.exports = router;
