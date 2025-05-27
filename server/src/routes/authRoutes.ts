import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body, param } from "express-validator";
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
router.post(
  "/confirm",
  body("token").notEmpty().withMessage("El token no puede ir vacio"),
  handleInputErrors,
  AuthController.confirmAccount
);
router.post(
  "/login",
  body("email").isEmail().withMessage("El email no es valido"),
  body("password").notEmpty().withMessage("El password no puede ir vacio"),
  handleInputErrors,
  AuthController.login
);
router.post(
  "/request_code",
  body("email").isEmail().withMessage("El email no es valido"),
  handleInputErrors,
  AuthController.requestToken
);
router.post(
  "/forgot_password",
  body("email").isEmail().withMessage("El email no es valido"),
  handleInputErrors,
  AuthController.requestResetPssw
);
router.post(
  "/validate_token",
  body("token").notEmpty().withMessage("El token no puede ir vacio"),
  handleInputErrors,
  AuthController.validateTokenPassword
);
router.post(
  "/update_password/:token",
  param("token").notEmpty().withMessage("El token no puede ir vacio"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña tiene que tener almenos 8 caracteres"),
  body("password_confirmation")
    .custom((value, { req }) => value == req.body.password)
    .withMessage("Contrasenas no son iguales"),
  handleInputErrors,
  AuthController.updatePassword
);
export default router;
