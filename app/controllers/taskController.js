import { TaskModel } from "../models/taskmodel.js";
import { responses } from "../utils/apiResponseHandler.js";

export const createTask = async (req, res) => {
  try {
    const { name, description, projectId, assignTo } = req.body;
    const { userId } = req.user;
    const task = await TaskModel.create({
      name,
      description,
      projectId,
      assignTo,
      createdBy: userId,
    });
    return responses.created(res, task);
  } catch (error) {
    return responses.serverError(res);
  }
};
