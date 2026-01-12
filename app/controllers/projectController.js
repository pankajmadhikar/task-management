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

export const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    if (!projectId) {
      return responses.manualResponse(res, 400, "Project ID is required");
    }
    console.log("projectId", projectId);
    const project = await ProjectModel.findById(projectId);
    if (!project) {
      return responses.notFound(res);
    }
    await project.delete();
    return responses.deleted(res);
  } catch (error) {
    console.log("error", error);
    return responses.serverError(res);
  }
};
