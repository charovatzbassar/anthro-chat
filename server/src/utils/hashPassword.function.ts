import bcrypt from "bcrypt";

const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password");
  }
};

export default hashPassword;