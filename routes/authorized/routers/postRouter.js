const express = require('express');
const router = express.Router();
const postController = require('../../../controllers/postController');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

/**
 * @openapi
 * /api/blog-post/get/{id}:
 *   get:
 *    description: Get blog post by identifier.
 *    security:
 *      - BearerAuth: []
 *    tags: [/blog-post]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *           type: integer
 *        description: Blog post identifier.
 *    responses:
 *       200:
 *         description: Returns blog post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: "#/components/schemas/BlogPost"
 *       404:
 *         description: Blog post does not exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: "#/components/schemas/ApiError"
 */
router.get('/get/:id', postController.getPost);

/**
 * @openapi
 * /api/blog-post/get/{id}/media:
 *   get:
 *    description: Get blog post media by identifier.
 *    security:
 *      - BearerAuth: []
 *    tags: [/blog-post]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *           type: integer
 *        description: Blog post identifier.
 *    responses:
 *       200:
 *         description: Returns post`s media binary
 *       404:
 *         description: Blog post does not exist or does not have media
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: "#/components/schemas/ApiError"
 */
router.get('/get/:id/media', postController.getPostMedia);

/**
 * @openapi
 * /api/blog-post/get-all:
 *   get:
 *    description: Get all blog posts with pagination
 *    security:
 *      - BearerAuth: []
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
 *         description: Returns blog post list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                 posts: 
 *                   type: object
 *                   properties:
 *                     count: 
 *                       type: integer
 *                       example: 10
 *                     posts:
 *                       type: array
 *                       items:
 *                         $ref: "#/components/schemas/BlogPost"       
 *       500:
 *         description: Internal error while getting blog posts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: "#/components/schemas/ApiError"
 */
router.get('/get-all', postController.getPosts);

/**
 * @openapi
 * /api/blog-post/create:
 *   post:
 *    description: Create new blog post
 *    security:
 *      - BearerAuth: []
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
 *                 example: Some title
 *               text:
 *                 type: string
 *                 example: Some text
 *    responses:
 *       201:
 *         description: New blog post added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   example: Post created successfully
 *                 post:
 *                   $ref: "#/components/schemas/BlogPost"
 *       400:
 *         description: Post already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: "#/components/schemas/ApiError"
 *       500:
 *         description: No data for blogpost creation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: "#/components/schemas/ApiError"
 */
router.post('/create', upload.single('media'), postController.createPost);

/**
 * @openapi
 * /api/blog-post/edit/{id}:
 *   patch:
 *    description: Edit blog post
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *           type: integer
 *        description: Blog post id.
 *    security:
 *      - BearerAuth: []
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
 *                 example: Some title
 *               text:
 *                 type: string
 *                 example: Some text
 *    responses:
 *       200:
 *         description: Post edited successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   example: Post updated!
 *       403:
 *         description: You can`t edit this blog post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: "#/components/schemas/ApiError"
 */
router.patch('/edit/:id', upload.single('media'), postController.editPost);

/**
 * @openapi
 * /api/blog-post/delete/{id}:
 *   delete:
 *    description: Delete blog post
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *           type: integer
 *        description: Blog post id.
 *    security:
 *      - BearerAuth: []
 *    tags: [/blog-post]
 *    responses:
 *       200:
 *         description: Post deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   example: Post deleted
 *       404:
 *         description: Blog post not found
 */
router.delete('/delete/:id', postController.deletePost);

module.exports = router;
