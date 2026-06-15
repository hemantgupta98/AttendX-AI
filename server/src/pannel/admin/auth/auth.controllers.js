import jwt from "jsonwebtoken";
import { loginModel, signupModel } from "./auth.model.js";
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

    console.log("Admin signup saved", {
      id: user._id,
      email: user.email,
      db: user?.constructor?.db?.name,
      collection: user?.constructor?.collection?.name,
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

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExist = await findByAdminLoginEmail(email);

    if (!userExist)
      return res.status(409).json({
        success: false,
        message: "No account found with this email. Please sign up first.",
      });

    const isMatch = await comparePassword(password, userExist.password);

    if (!isMatch)
      return res.status(409).json({
        success: false,
        message: "Password is invalid. Please try again",
      });

    const token = authToken(res, userExist._id);

    await loginModel.create({
      userId: userExist._id,
      email: userExist.email,
      password: userExist.password,
    });

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: userExist._id,
        email: userExist.email,
      },
    });
  } catch (error) {
    console.log("Error in Admin login", error);
    res
      .status(400)
      .json({ success: false, message: "Server error in admin login" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await signupModel
      .findByAdminEmail(userId)
      .select(
        "name type year board address city state pincode adminName designation adminEmail adminNumber department course student staff attendenceType workingDays attendance classTiming email",
      );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Admin Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      profile: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
