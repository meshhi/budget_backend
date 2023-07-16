const express = require('express');
const router = express.Router();
const postRouter = require('./routers/postRouter');
const budgetRouter = require('./routers/budgetRouter');
const checkAuthMiddleware = require('../../middlewares/checkAuthMiddleware');

router.use(checkAuthMiddleware);
router.use('/blog-post', postRouter);
router.use('/budget', budgetRouter);

module.exports = router;
