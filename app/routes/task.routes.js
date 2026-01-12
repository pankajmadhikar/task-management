import express from "express";
import { authMiddleware, requireRole } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { body } from "express-validator";
import { createTask } from "../controllers/taskController.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  requireRole(["user", "manager"]),
  [
    body("name").notEmpty().withMessage("Task name is required"),
    body("projectId").notEmpty().withMessage("Task projectId is required"),
    body("assignTo").notEmpty().withMessage("Task assignTo is required"),
  ],
  validate,
  createTask
);

export const TaskRoutes = router;
