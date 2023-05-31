var express = require('express');
var router = express.Router();
const postController = require('../../../controllers/postController');

/**
 * @openapi
 * /create:
 *   post:
 *    description: Create new blog post
 *    tags: [/blog-post]
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

/**
 * @openapi
 * /edit:
 *   patch:
 *    description: Edit blog post
 *    tags: [/blog-post]
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *             properties:
 *               title:
 *                 type: string
 *               text:
 *                 type: string
 *    responses:
 *       200:
 *         description: Post edited successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.patch('/edit/:id', postController.editPost);

/**
 * @openapi
 * /delete:
 *   delete:
 *    description: Delete blog post
 *    tags: [/blog-post]
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
router.delete('/delete', postController.createPost);

module.exports = router;
