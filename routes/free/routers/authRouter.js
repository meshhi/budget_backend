const express = require("express");
const router = express.Router();
const authController = require("../../../controllers/authController");

/* POST auth registration. */
/**
 * @openapi
 * /api/auth/registration:
 *   post:
 *    description: Register new user
 *    tags: [/auth]
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@example.com
 *               password:
 *                 type: string
 *                 example: yhu345fg34tyu
 *    responses:
 *       201:
 *         description: New user has been registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                 token: 
 *                   type: string
 *                 user:
 *                   $ref: "#/components/schemas/User"
 *       500:
 *         description: Invalidated registration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: "#/components/schemas/ApiError"
 */
router.post("/registration", authController.registration);

/* POST auth login. */
/**
 * @openapi
 * /api/auth/login:
 *   post:
 *    description: Login an existing user
 *    tags: [/auth]
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
*                  example: some@somedomain.com
 *               password:
 *                 type: string
 *                 example: 23h4g23h4g2i3gy
 *    responses:
 *       200:
 *         description: Successfull login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                 token: 
 *                   type: string
 *                 user:
 *                   $ref: "#/components/schemas/User"
 *       500:
 *         description: Invalidated login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: "#/components/schemas/ApiError"
 */
router.post("/login", authController.login);

module.exports = router;
