var express = require("express");
var router = express.Router();
const authController = require("../../../controllers/authController");

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
/* POST auth registration. */
/**
 * @openapi
 * /registration:
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
 *               type: object
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
