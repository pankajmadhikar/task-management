import { authRoutes } from "./routes/auth.routes.js";
import { projectRoutes } from "./routes/project.routes.js";

export const AppRoutes = (app) => {
  app.use("/api/auth", authRoutes);
  app.use("/api/project", projectRoutes);
};
