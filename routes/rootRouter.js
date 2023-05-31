const express = require('express');
const router = express.Router();
const authorizedRouter = require('./authorized/authorizedRouter');
const freeRouter = require('./free/freeRouter');
/**
 * @openapi
 * tags:
 *   - name: '/auth'
 *     description: Auth routes
 *   - name: '/user'
 *     description: User routes
 *   - name: '/blog-post'
 *     description: Post routes
 */
/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: User email address
 *         password:
 *           type: string
 *           description: User password
 *         role:
 *           type: boolean
 *           description: User role
 *       example:
 *         email: The New Turing Omnibus
 *         password: Alexander K. Dewdney
 *         role: admin
 */
router.use(freeRouter);
router.use(authorizedRouter);

module.exports = router;
