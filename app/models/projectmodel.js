import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";

const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["ACTIVE", "ARCHIVE"], default: "ACTIVE" },
  },
  { timestamps: true }
);

// ProjectSchema soft delete plugin
ProjectSchema.plugin(MongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

export const ProjectModel = mongoose.model("Project", ProjectSchema);
