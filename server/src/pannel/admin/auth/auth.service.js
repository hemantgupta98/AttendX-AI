import { signupModel } from "./auth.model.js";

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
