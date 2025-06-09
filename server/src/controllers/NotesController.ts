import { request, type Request, type Response } from "express";
import Note, { INote } from "./../models/Note";
import { Types } from "mongoose";
type NoteParams = {
  noteId: Types.ObjectId;
};
export class NotesController {
  static async createNote(req: Request<{}, {}, INote>, res: Response) {
    try {
      const { content } = req.body;
      const note = new Note({
        content,
        createdBy: req.user.id,
        task: req.task.id,
      });
      req.task.notes.push(note.id);
      await Promise.allSettled([note.save(), req.task.save()]);
      res.send("Nota creada correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  }
  static async getNotes(req: Request<{}, {}, {}>, res: Response) {
    try {
      const notes = await Note.find({ task: request.task.id }).populate({
        path: "createdBy",
        select: "id name email",
      });
      res.json(notes);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  }
  static async deleteNote(req: Request<NoteParams>, res: Response) {
    try {
      const notes = await Note.findOneAndDelete({
        id: req.params.noteId,
        createdBy: req.user.id,
        task: req.task.id,
      });
      if (!notes) {
        res.status(404).json({ error: "Error Eliminando nota" });
        return;
      }
      req.task.notes.filter(
        (note) => note.toString() !== req.params.noteId.toString()
      );
      await req.task.save();
      res.send("Nota Eliminada");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  }
}
