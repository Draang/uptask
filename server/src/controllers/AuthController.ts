import { Request, Response } from "express";
import User, { IUser } from "../models/Auth";
import Token, { IToken } from "../models/Token";
import { checkPassword, hashPassword } from "../utils/auth";
import { generateToken } from "../utils/token";
import { AuthEmail } from "../emails/AuthEmail";

export class AuthController {
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
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { password, email } = req.body;
      const userExist = await User.findOne({ email });
      if (!userExist) {
        throw new Error(
          "Usuario no encontrado revisa contraseña y email, puedes tener un error",
          { cause: 404 }
        );
      }
      if (!userExist.confirmed) {
        const token = new Token();
        token.token = generateToken();
        token.user = userExist.id;
        //send email
        AuthEmail.sendConfirmationEmail(userExist.email, token.token);
        await token.save();
        throw new Error(
          "La cuenta no ha sido confirmada, se ha enviado un email de confirmacion",
          { cause: 401 }
        );
      }
      const isPasswordRight = await checkPassword(password, userExist.password);
      if (!isPasswordRight) {
        throw new Error(
          "Usuario no encontrado revisa contraseña y email, puedes tener un error",
          { cause: 404 }
        );
      }
      res.send("Autenticado!!");
    } catch (error) {
      const codeError = error.cause ?? 500;
      res.status(codeError).json({ error: error.message });
    }
  }
  static async requestToken(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      // Validar usuario unico
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("El usuario no existe", { cause: 401 });
      }
      if (user.confirmed) {
        throw new Error("El usuario ya esta confirmado", { cause: 403 });
      }
      // Generar token
      const token = new Token();
      token.token = generateToken();
      token.user = user.id;

      //send email
      AuthEmail.sendConfirmationEmail(user.email, token.token);

      //Save in db
      await token.save();

      res.send("Email enviado para confirmarla");
    } catch (error) {
      const codeError = error.cause ?? 500;
      res.status(codeError).json({ error: error.message });
    }
  }
}
