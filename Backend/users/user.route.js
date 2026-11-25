const express = require("express");
const db = require("../config/db");
const userController = require("./user.controller");
const { authenticateJWT } = require("../middleware/authentication");
const Userroutes = express.Router();

/**
 * @swagger
 * /api/user/getUsers:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of users
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     
 *     responses:
 *       200:
 *         description: Successfully retrieved users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 users:
 *                   type: array
 *                   items:
 *                     type: string
 */

Userroutes.get("/getUsers", authenticateJWT, userController.get_all_users);

Userroutes.post("/createUser", userController.user_create_api);

Userroutes.delete(
  "/deleteUser/:userid",
  authenticateJWT,
  userController.user_delete_by_id,
);

Userroutes.put(
  "/updateUser/:userid",
  authenticateJWT,
  userController.update_user_detail,
);

Userroutes.get(
  "/getUserById",
  authenticateJWT,
  userController.get_user_detail_by_ID,
);
module.exports = Userroutes;
