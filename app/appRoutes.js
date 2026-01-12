import { authRoutes } from "./routes/auth.routes.js";
import { projectRoutes } from "./routes/project.routes.js";
import { TaskRoutes } from "./routes/task.routes.js";

export const AppRoutes = (app) => {
  app.use("/api/auth", authRoutes);
  app.use("/api/project", projectRoutes);
  app.use("/api/task", TaskRoutes);
};
