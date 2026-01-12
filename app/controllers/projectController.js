import { ProjectModel } from "../models/projectmodel.js";
import { responses } from "../utils/apiResponseHandler.js";

export const createProject = async (req, res) => {
  try {
    const { name, description, status } = req.body;
    const { userId } = req.user;

    const createProject = await ProjectModel.create({
      name,
      description,
      status,
      createdBy: userId,
    });
    return responses.created(
      res,
      createProject,
      "Project created successfully"
    );
  } catch (error) {
    return responses.serverError(res);
  }
};
