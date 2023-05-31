var express = require('express');
var router = express.Router();
const postController = require('../controllers/postController');

/**
 * @openapi
 * /create:
 *   post:
 *    description: Create new post
 *    tags: [/post]
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - text
 *             properties:
 *               title:
 *                 type: string
 *               text:
 *                 type: string
 *    responses:
 *       200:
 *         description: New post added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/create', postController.createPost);

module.exports = router;
