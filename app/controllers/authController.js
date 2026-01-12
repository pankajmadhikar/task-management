import { UserModel } from "../models/usermodel.js";
import { responses } from "../utils/apiResponseHandler.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  try {
    const { name, email, password, age } = req.body;
    const findEmail = await UserModel.findOne({ email });
    if (findEmail) {
      return responses.alreadyExists(res, "Email already exists");
    }
    const createUser = await UserModel.create({
      name,
      email,
      password,
      age,
    });
    return responses.created(res, createUser);
  } catch (error) {
    return responses.serverError(res);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await UserModel.findOne({ email });
    if (!findUser) {
      return responses.notFound(res);
    }
    const isPasswordCorrect = await bcrypt.compare(password, findUser.password);
    if (!isPasswordCorrect) {
      responses.manualResponse(res, "Incorrect password");
    }

    const token = jwt.sign(
      { userId: findUser._id, userRole: findUser.role },
      process.env.JWT_SECRET_TOKEN,
      { expiresIn: "1h" }
    );

    return responses.success(res, "Logged in successfully", token);
  } catch (error) {
    return responses.serverError(res);
  }
};
