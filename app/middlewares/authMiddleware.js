import jwt from "jsonwebtoken";
import { responses } from "../utils/apiResponseHandler.js";

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return responses.forbidden(res);
  }

  const accessToken = token.split(" ")[1];
  if (!accessToken) {
    return responses.forbidden(res);
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET_TOKEN);
  } catch (error) {
    return responses.unauthorized(res);
  }
  req.user = decodedToken;
  next();
};

export const requireRole = (roles) => {
  return (req, res, next) => {
    const { userId, role } = req.user;
    const isValidRole = roles?.find((r) => r === role);
    if (!isValidRole) {
      return responses.manualResponse(
        res,
        404,
        "You are not authorised to access this role"
      );
    }
    next();
  };
};
