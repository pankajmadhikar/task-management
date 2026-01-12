import express from "express";
import { authMiddleware, requireRole } from "../middlewares/authMiddleware.js";
import {
  createProject,
  getAllProject,
  getProjects,
} from "../controllers/projectController.js";
import { validate } from "../middlewares/validate.js";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/createproject",
  authMiddleware,
  requireRole(["admin", "manager"]),
  [body("name").notEmpty().withMessage("Project name is required")],
  validate,
  createProject
);

router.get(
  "/getallprojects",
  authMiddleware,
  requireRole(["admin"]),
  getAllProject
);

router.get(
  "/getprojects",
  authMiddleware,
  requireRole(["admin", "manager"]),
  getProjects
);

export const projectRoutes = router;
