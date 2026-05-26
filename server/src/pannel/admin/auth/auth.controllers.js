import jwt from "jsonwebtoken";
import { signupModel } from "./auth.model.js";
import { comparePassword } from "./auth.hashed.js";
import {
  createAdmin,
  findByAdminEmail,
  findByAdminLoginEmail,
} from "./auth.service.js";

export const authToken = (res, userId, expiresIn = "24h") => {
  const jwtToken = process.env.JWT_WEB_TOKEN;

  if (!jwtToken) {
    throw new Error("JWT Token is missing");
  }
  const token = jwt.sign({ id: userId }, jwtToken, { expiresIn });
  const isProduction = process.env.NODE_ENV === "production";
  res.cookie("auth_token", token, {
    httpOnly: true,
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction,
    maxAge: 24 * 60 * 60 * 1000,
  });

  return token;
};

export const signup = async (req, res) => {
  const {
    name,
    type,
    year,
    board,
    address,
    city,
    state,
    pincode,
    adminName,
    designation,
    adminEmail,
    adminNumber,
    department,
    course,
    student,
    staff,
    attendenceType,
    workingDays,
    attendance,
    classTiming,
    email,
    password,
    confirmPassword,
  } = req.body;
  try {
    const userExist = await findByAdminEmail(email);
    if (userExist)
      return res.status(409).json({ message: "Admin already exist" });

    const user = await createAdmin({
      name,
      type,
      year,
      board,
      address,
      city,
      state,
      pincode,
      adminName,
      designation,
      adminEmail,
      adminNumber,
      department,
      course,
      student,
      staff,
      attendenceType,
      workingDays,
      attendance,
      classTiming,
      email,
      password,
      confirmPassword,
    });

    const issueSignupToken = process.env.ISSUE_SIGNUP_TOKEN !== "false";
    const token = authToken(res, user._id);

    res.status(200).json({
      success: true,
      message: "Admin Created successfully",
      ...(issueSignupToken ? { token } : {}),
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Signup Admin error", error);
    res.status(500).json({
      message: error?.message || "Signup error in Admin pannel",
      success: false,
    });
  }
};
