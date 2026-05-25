import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    console.log("Error in password hashing", error);
  }
};

export const comparePassword = async (plain, hashed) => {
  try {
    return await bcrypt.compare(plain, hashed);
  } catch (error) {
    confirm.log("Error in compare password", error);
  }
};
