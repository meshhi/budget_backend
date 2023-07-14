const express = require('express');
const router = express.Router();
const authRouter = require('./routers/authRouter');
const budgetRouter = require('./routers/budgetRouter');

router.use('/auth', authRouter);
router.use('/budget', budgetRouter);

module.exports = router;
