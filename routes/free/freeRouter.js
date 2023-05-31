const express = require('express');
const router = express.Router();
const authRouter = require('./routers/authRouter');

router.use('/auth', authRouter);

module.exports = router;
