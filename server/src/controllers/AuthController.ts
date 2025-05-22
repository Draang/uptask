import { Request, Response } from "express";
import User from "../models/Auth";
import { hashPassword } from "../utils/auth";
import Token from "../models/Token";
import { generateToken } from "../utils/token";
import { transporter } from "../config/nodemailer";
import { AuthEmail } from "../emails/AuthEmail";

export class AuthController {
  /**
   * // * Usuarios unicos
   * // * Password hasheado
   * // * Enlace de verificacion a E-Mail
   */
  static async createAccount(req: Request, res: Response): Promise<void> {
    try {
      const { password, email } = req.body;
      // Validar usuario unico
      const userExist = await User.findOne({ email });
      if (userExist) {
        throw new Error("El usuario ya esta registrado", { cause: 409 });
      }
      const user = new User(req.body);
      // Hash constrasena
      user.password = await hashPassword(password);
      // Generar token
      const token = new Token();
      token.token = generateToken();
      token.user = user.id;

      //send email
      AuthEmail.sendConfirmationEmail(user.email, token.token);

      //Save in db
      await Promise.allSettled([user.save(), token.save()]);

      res.send("Cuenta creada revisa tu email para confirmarla");
    } catch (error) {
      const codeError = error.cause ?? 500;
      res.status(codeError).json({ error: error.message });
    }
  }
  static async confirmAccount(req: Request, res: Response): Promise<void> {
    try {
      const { token } = req.body;
      const tokenExist = await Token.findOne({ token });
      if (!tokenExist) {
        throw new Error("Token no valido", { cause: 401 });
      }
      const user = await User.findById(tokenExist.user);
      user.confirmed = true;
      await Promise.allSettled([user.save(), tokenExist.deleteOne()]);
      res.send("La cuenta ha sido confirmada correctamente");
    } catch (error) {
      const codeError = error.cause ?? 500;
      res.status(codeError).json({ error: error.message });
    }
  }
}
