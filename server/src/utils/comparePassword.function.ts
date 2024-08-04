import bcrypt from "bcrypt";

const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    throw new Error("Error comparing password");
  }
};

export default comparePassword;
