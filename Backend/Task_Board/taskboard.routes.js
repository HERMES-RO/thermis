const express = require("express");
const {
  task_create_controller,
  task_update_controller,
  task_getall_controller,
  archive_task,
  get_all_task_type,
  create_task_type,
  update_task_type_controller,
  delete_task,
} = require("./taskboard.controller");
const { authenticateJWT } = require("../middleware/authentication");

const task_routes = express.Router();

task_routes.get("/", authenticateJWT, task_getall_controller);

task_routes.post("/create", authenticateJWT, task_create_controller);

task_routes.patch(
  "/update/tasks/:taskid",
  authenticateJWT,
  task_update_controller,
);

task_routes.put("/archive_task/:task_id", archive_task);

//task_types below
task_routes.get("/task_type", authenticateJWT, get_all_task_type);

task_routes.post("/create_task_type", authenticateJWT, create_task_type);
task_routes.put(
  "/update/task_type/:tasktypeid",
  authenticateJWT,
  update_task_type_controller,
);
/**
 * @swagger
 * /api/task_board/delete_task/{task_id}:
 *   delete:
 *     summary: Delete a task
 *     parameters:
 *       - in: path
 *         name: task_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the task to delete
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */
task_routes.delete("/delete_task/:task_id", authenticateJWT, delete_task);

module.exports = task_routes;
