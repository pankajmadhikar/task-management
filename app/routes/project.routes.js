import express from "express";
import { authMiddleware, requireRole } from "../middlewares/authMiddleware.js";
import {
  createProject,
  deleteProject,
  getProjects,
} from "../controllers/projectController.js";
import { validate } from "../middlewares/validate.js";
import { body, param } from "express-validator";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  requireRole(["admin", "manager"]),
  [body("name").notEmpty().withMessage("Project name is required")],
  validate,
  createProject
);

router.get("/", authMiddleware, requireRole(["admin", "manager"]), getProjects);

router.delete(
  "/:id",
  authMiddleware,
  requireRole(["admin"]),
  [param("id").isMongoId().withMessage("Project id is required")],
  validate,
  deleteProject
);

export const projectRoutes = router;
