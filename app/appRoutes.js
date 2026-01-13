import { authRoutes } from "./routes/auth.routes.js";
import { projectRoutes } from "./routes/project.routes.js";
import { taskRoutes } from "./routes/task.routes.js";
import { userRoutes } from "./routes/user.routes.js";

export const AppRoutes = (app) => {
  app.use("/api/auth", authRoutes);
  app.use("/api/project", projectRoutes);
  app.use("/api/task", taskRoutes);
  app.use("/api/user", userRoutes);
};
