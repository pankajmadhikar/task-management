import express from "express";
import { authMiddleware, requireRole } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { body } from "express-validator";
import {
  createTask,
  getTeamTasks,
  getUserTasks,
  updateTask,
  updateTaskStatus,
} from "../controllers/taskController.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  requireRole(["manager"]),
  [
    body("name").notEmpty().withMessage("Task name is required"),
    body("projectId").notEmpty().withMessage("Task projectId is required"),
    body("assignTo").notEmpty().withMessage("Task assignTo is required"),
  ],
  validate,
  createTask
);

router.put(
  "/update-task",
  authMiddleware,
  requireRole(["manager"]),
  [
    body("name").notEmpty().withMessage("Task name is required"),
    body("projectId").notEmpty().withMessage("Task projectId is required"),
    body("assignTo").notEmpty().withMessage("Task assignTo is required"),
  ],
  validate,
  updateTask
);

router.get("/user-task", authMiddleware, requireRole(["user"]), getUserTasks);

router.patch(
  "/:taskId/status",
  authMiddleware,
  requireRole(["user"]),
  [
    body("status").notEmpty().withMessage("Task status required"),
    body("status").isString().withMessage("Status must be string"),
  ],
  validate,
  updateTaskStatus
);

router.get(
  "/team-task",
  authMiddleware,
  requireRole(["manager"]),
  getTeamTasks
);
export const taskRoutes = router;
