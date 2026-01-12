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

export const getAllProject = async (req, res) => {
  try {
    const allProjects = await ProjectModel.find();
    return responses.success(res, "Fetched all products successfully", {
      allProjects,
      quantity: allProjects.length,
    });
  } catch (error) {
    return responses.serverError(res);
  }
};

export const getProjects = async (req, res) => {
  try {
    const { userId } = req.user;
    const getProjects = await ProjectModel.find({ createdBy: userId });
    return responses.success(res, "Projects fetched successfully", getProjects);
  } catch (error) {
    console.log("eroor", error);
    return responses.serverError(res);
  }
};
