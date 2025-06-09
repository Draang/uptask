import mongoose, { Schema, Document, Types } from "mongoose";
export const taskStatus = {
  PENDING: "pending",
  ON_HOLD: "onHold",
  IN_PROGRESS: "inProgress",
  UNDER_REVIEW: "inReview",
  COMPLETED: "completed",
} as const;
export type TaskStatus = (typeof taskStatus)[keyof typeof taskStatus];
export interface ITask extends Document {
  name: string;
  description: string;
  project: Types.ObjectId;
  status: TaskStatus;
  updatedBy: Types.ObjectId;
}

const TaskSchema: Schema = new Schema(
  {
    name: { type: String, require: true, trim: true },
    description: { type: String, require: true, trim: true },
    project: {
      type: Types.ObjectId,
      require: true,
      ref: "Project",
    },
    status: {
      type: String,
      enum: Object.values(taskStatus),
      default: taskStatus.PENDING,
    },
    updatedBy: {
      type: Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model<ITask>("Task", TaskSchema);
export default Task;
