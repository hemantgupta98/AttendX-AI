import { signupModel } from "./auth.model.js";

const escapeRegex = (value) =>
  String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const getEmailFilter = (email) => {
  const normalizedEmail = String(email || "")
    .trim()
    .toLowerCase();
  if (!normalizedEmail) {
    return null;
  }

  return {
    $regex: `^${escapeRegex(normalizedEmail)}$`,
    $options: "i",
  };
};

export const findByAdminEmail = async (email) => {
  const emailFilter = getEmailFilter(email);

  if (!emailFilter) return null;
  let admin = await signupModel.findOne({ email: emailFilter });
  return admin;
};

export const findByAdminLoginEmail = async (email) => {
  const emailFilter = getEmailFilter(email);

  if (!emailFilter) return null;
  let admin = await signupModel.findOne({ email: emailFilter });
  return admin;
};

export const createAdmin = async (data) => {
  const normalizedEmail = String(data?.email || "")
    .trim()
    .toLowerCase();

  return await signupModel.create({
    ...data,
    email: normalizedEmail,
  });
};

export const generateAdminCode = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "SCH-";

  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }

  return code;
};
