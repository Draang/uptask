import jwt from "jsonwebtoken";
import { IUser } from "../models/Auth";
import { Types } from "mongoose";
type UserPayload = {
  id: Types.ObjectId;
};
export function generateJWT(user: UserPayload) {
  // En data solo se agrega lo minimo del usuario para hacerlo distinctivo
  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "180m",
  });
  return token;
}
