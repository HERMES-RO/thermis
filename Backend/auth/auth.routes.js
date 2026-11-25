const express = require("express");
const auth_controller = require("./auth.controller");
const { validated } = require("../middleware/validation.middleware");
const {
  login_schema,
  signup_schema,
  refresh_schema,
} = require("./auth.schema");
const auth_routes = express.Router();
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     security: []
 *     requestBody:
 *       required: true
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
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: secret123
 *     responses:
 *       200:
 *         description: Login successful
 */
auth_routes.post("/login", validated(login_schema), auth_controller.login);
/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register user
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - phoneno
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: secret123
 *               phoneno:
 *                 type: string
 *                 example: "9800000000"
 *     responses:
 *       200:
 *         description: Signup successful
 */

auth_routes.post("/signup", validated(signup_schema), auth_controller.signup);

auth_routes.post(
  "/refresh",
  validated(refresh_schema),
  auth_controller.refresh_token_generator,
);

module.exports = auth_routes;
