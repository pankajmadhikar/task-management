import { UserModel } from "../models/usermodel.js";
import { responses } from "../utils/apiResponseHandler.js";

export const getUserInfo = async (req, res) => {
  try {
    const { userId } = req.user;
    const userInfo = await UserModel.findById(userId);
    return responses.success(res, "Fetched successfully", userInfo);
  } catch (error) {
    return responses.serverError(res);
  }
};
