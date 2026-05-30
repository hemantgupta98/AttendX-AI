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

export const findByStudentEmail = async (email) => {
  const emailFilter = getEmailFilter(email);

  if (!emailFilter) return null;
  let admin = await signupModel.findOne({ email: emailFilter });
  return admin;
};

export const findByStudentLoginEmail = async (email) => {
  const emailFilter = getEmailFilter(email);

  if (!emailFilter) return null;
  let admin = await signupModel.findOne({ email: emailFilter });
  return admin;
};

export const createStudent = async (data) => {
  const normalizedEmail = String(data?.email || "")
    .trim()
    .toLowerCase();

  return await signupModel.create({
    ...data,
    email: normalizedEmail,
  });
};
