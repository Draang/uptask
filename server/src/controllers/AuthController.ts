import { Request, Response } from "express";
import User from "../models/Auth";
import { hashPassword } from "../utils/auth";

export class AuthController {
  /**
   * * Usuarios unicos
   * // * Password hasheado
   * * Enlace de verificacion a E-Mail
   */
  static async createAccount(req: Request, res: Response): Promise<void> {
    try {
      const { password, email } = req.body;
      const userExist = await User.findOne({ email });
      if (userExist) {
        // 409 - conflicto
        throw new Error("El usuario ya esta registrado", { cause: 409 });
      }
      const user = new User(req.body);
      user.password = await hashPassword(password);
      await user.save();
      res.send("Cuenta creada revisa tu email para confirmarla");
    } catch (error) {
      const codeError=error.cause ?? 500
      res.status(codeError).json({ error: error.message });
    }
  }
}
