import { authRoutes } from "./routes/auth.routes.js";

export const AppRoutes = (app) => {
  app.use("/api/auth", authRoutes);
};
