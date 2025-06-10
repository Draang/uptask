import mongoose, { Schema, Document, Types } from "mongoose";
export interface INote extends Document {
  content: string;
  createdBy: Types.ObjectId;
  createdAt: Date;
  task: Types.ObjectId;
}
const NoteSchema: Schema = new Schema({
  content: { type: String, require: true },
  createdBy: { type: Types.ObjectId, ref: "User", require: true },
  task: { type: Types.ObjectId, ref: "Task", require: true },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const Note = mongoose.model<INote>("Note", NoteSchema);
export default Note;
