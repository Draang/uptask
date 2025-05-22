import bcrypt from "bcrypt";

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  const hashPssw = await bcrypt.hash(password, salt);
  return hashPssw;
}
