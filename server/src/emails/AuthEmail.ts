import { transporter } from "../config/nodemailer";

export class AuthEmail {
  static async sendConfirmationEmail(to: string, token: string) {
    await transporter.sendMail({
      from: "Uptask <admin@uptask.com>",
      to: to,
      subject: "UpTask - Confirma tu cuenta",
      text: "UpTask - Confirma tu nueva cuenta",
      html: `
      <p>Hola, has creado una cuenta en uptask , ya casi esta todo listo</p>
      <p>Visita el siguiente enlace para confirmar tu cuenta</p>
      <a href="${process.env.FRONTEND_URL}/auth/confirm">Confirmar cuenta</a>
      <h2>Ingresa el siguiente token de confirmacion: </h2> 

      <h1><b>${token}</b></h1>
      <p>Este token expira en 10 minutos</p>
      `,
    });
  }
}
