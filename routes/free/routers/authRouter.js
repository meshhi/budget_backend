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
 *               password:
 *                 type: string
 *    responses:
 *       200:
 *         description: New user has been registered
 *         content:
 *           application/json:
 *             schema:
 *               type: User
 */
router.post("/registration", authController.registration);

/* POST auth login. */
/**
 * @openapi
 * /login:
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
 *               password:
 *                 type: string
 *    responses:
 *       200:
 *         description: Successfull login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post("/login", authController.login);

module.exports = router;
