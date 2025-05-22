import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
const router = Router();

router.get("/", (req, res) => {
  res.send("from auth");
});
router.post(
  "/create-account",
  body("name").notEmpty().withMessage("El nombre no puede ir vacio"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña tiene que tener almenos 8 caracteres"),
  body("password_confirmation")
    .custom((value, { req }) => value == req.body.password)
    .withMessage("Contrasenas no son iguales"),
  body("email").isEmail().withMessage("El email no es valido"),
  handleInputErrors,
  AuthController.createAccount
);
router.post('/confirm',body('token').notEmpty().withMessage("El token no puede ir vacio"),handleInputErrors,AuthController.confirmAccount)
export default router;
