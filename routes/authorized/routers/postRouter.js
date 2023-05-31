const express = require('express');
const router = express.Router();
const postController = require('../../../controllers/postController');


/**
 * @openapi
 * /api/blog-post/get/:
 *   get:
 *    description: Get blog posts
 *    tags: [/blog-post]
 *    parameters:
 *      - in: query
 *        name: page
 *        schema:
 *           type: integer
 *        description: Page number.
 *      - in: query
 *        name: count
 *        schema:
 *           type: integer
 *        description: Records count on page.
 *    responses:
 *       200:
 *         description: Returns post list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/get', postController.getPosts);

/**
 * @openapi
 * /api/blog-post/create:
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
 *       201:
 *         description: New post added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/create', postController.createPost);

/**
 * @openapi
 * /api/blog-post/edit/{id}:
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
 * /api/blog-post/delete/{id}:
 *   delete:
 *    description: Delete blog post
 *    tags: [/blog-post]
 *    responses:
 *       200:
 *         description: Post deleted successfully
 *       404:
 *         description: Post not found
 */
router.delete('/delete/:id', postController.deletePost);

module.exports = router;
