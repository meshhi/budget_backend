var express = require('express');
var router = express.Router();
const authorizedRouter = require('./authorized/authorizedRouter');
const freeRouter = require('./free/freeRouter');
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
router.use(freeRouter);
router.use(authorizedRouter);

module.exports = router;
