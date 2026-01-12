import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["ACTIVE", "ARCHIVE"], default: "ACTIVE" },
  },
  { timestamps: true }
);

export const ProjectModel = mongoose.model("Project", ProjectSchema);
