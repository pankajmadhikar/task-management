import express from "express";
import { body } from "express-validator";
import { createUser, loginUser } from "../controllers/authController.js";
import { validate } from "../middlewares/validate.js";

const router = express.Router();

router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
    body("name").notEmpty().withMessage("Name is required"),
    body("name").isString().withMessage("Name is must be string"),
  ],
  validate,
  createUser
);
router.post("/login", loginUser);

export const authRoutes = router;
