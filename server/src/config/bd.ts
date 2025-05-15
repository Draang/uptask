import mongoose from "mongoose";
import colors from "colors";
import { exit } from "node:process";
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_CONN);
    const url = `${conn.connection.host}:${conn.connection.port}`;
    console.log(
      colors.magenta.italic(`MongoDB conectado en: ${colors.bold(url)}`)
    );
  } catch (error) {
    console.log(error);
    exit(1);
  }
};
