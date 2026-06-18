import jwt from "jsonwebtoken";
import { loginModel } from "./auth.model.js";
import { comparePassword } from "./auth.hashed.js";
import {
  createStudent,
  findByStudentEmail,
  findByStudentLoginEmail,
} from "./auth.service.js";
import { cloudinary } from "../media/cloudinary.js";

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
    gender,
    dob,
    studentNumber,
    parentNumber,
    address,
    city,
    state,
    pincode,
    institutionName,
    studentID,
    class: className,
    stream,
    section,
    admissionYear,
    email,
    faceScan,
    password,
    confirmPassword,
  } = req.body;
  try {
    const userExist = await findByStudentEmail(email);
    if (userExist)
      return res.status(409).json({ message: "Student already exist" });

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Photo is not uploaded." });
    }

    const uploadImage = await cloudinary(
      req.file.buffer,
      "upload-image/student",
    );

    const user = await createStudent({
      name,
      gender,
      dob,
      photo: uploadImage.secure_url,
      studentNumber,
      parentNumber,
      address,
      city,
      state,
      pincode,
      institutionName,
      studentID,
      class: className,
      stream,
      section,
      admissionYear,
      email,
      faceScan,
      password,
      confirmPassword,
    });

    console.log("Student signup saved", {
      id: user._id,
      email: user.email,
      db: user?.constructor?.db?.name,
      collection: user?.constructor?.collection?.name,
    });

    const issueSignupToken = process.env.ISSUE_SIGNUP_TOKEN !== "false";
    const token = authToken(res, user._id);

    res.status(200).json({
      success: true,
      message: "Student Created successfully",
      ...(issueSignupToken ? { token } : {}),
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Signup Student error", error);
    res.status(500).json({
      message: error?.message || "Signup error in Student pannel",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExist = await findByStudentLoginEmail(email);

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
    console.log("Error in Student login", error);
    res
      .status(400)
      .json({ success: false, message: "Server error in Student login" });
  }
};
