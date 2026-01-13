import { TaskModel } from "../models/taskmodel.js";
import { UserModel } from "../models/usermodel.js";
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
    console.log("err", error);
    return responses.serverError(res);
  }
};

export const updateTask = async (req, res) => {
  try {
    const { name, description, projectId, assignTo, taskId } = req.body;
    const { userId } = req.user;
    const updateRes = await TaskModel.findByIdAndUpdate(taskId, {
      name,
      description,
      assignTo,
      createdBy: userId,
    });

    return responses.updated(res, updateRes);
  } catch (error) {
    return responses.serverError(res);
  }
};

export const getUserTasks = async (req, res) => {
  try {
    const { userId } = req.user;
    const userTasks = await TaskModel.find({ assignTo: userId })
      .populate("createdBy", "name email role")
      .sort({ createdAt: 1 });
    return responses.success(res, "Task get successfully", {
      userTasks,
    });
  } catch (error) {
    console.log("error", error);
    return responses.serverError(res);
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;
    const allowedStatuses = ["TODO", "INPROGRESS", "COMPLETED"];
    if (!allowedStatuses.includes(status)) {
      return responses.badRequest(res, "Invalid task status");
    }
    const task = await TaskModel.findById(taskId);
    if (!task) {
      return responses.notFound(res, "Task not found");
    }
    task.status = status;
    task.save();
    return responses.updated(res, task, "Task status updated");
  } catch (error) {
    return responses.serverError(res);
  }
};

export const getTeamTasks = async (req, res) => {
  try {
    const { userId } = req.user;
    const tasks = await TaskModel.find({ createdBy: userId }).populate(
      "assignTo",
      "name email role age"
    );
    return responses.success(res, "Task fetched successfully", tasks);
  } catch (error) {
    return responses.badRequest(res);
  }
};
