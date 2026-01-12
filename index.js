import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { AppRoutes } from "./app/appRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
AppRoutes(app);

mongoose
  .connect(`${process.env.MONGO_URL}/task-management`)
  .then(() => {
    console.log("Mogo DB connected successfully");
  })
  .catch((error) => {
    console.log("Connection error", error);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
