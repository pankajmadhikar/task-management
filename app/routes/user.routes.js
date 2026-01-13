import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getUserInfo } from "../controllers/userController.js";

const router = express.Router();

router.get("/", authMiddleware, getUserInfo);

export const userRoutes = router;
