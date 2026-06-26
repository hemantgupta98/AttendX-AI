import jwt from "jsonwebtoken";
import { loginModel, signupModel } from "./auth.model.js";
import { comparePassword } from "./auth.hashed.js";
import {
  createStudent,
  findByStudentEmail,
  findByStudentLoginEmail,
} from "./auth.service.js";
import { uploadImage } from "../media/cloudinary.js";
import { uploadService } from "../aiService/ai.controller.js";

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

    const Image = await uploadImage(req.file.path, "upload-image/student");

    const user = await createStudent({
      name,
      gender,
      dob,
      photo: Image.secure_url,
      faceScan: Image.secure_url,
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
    await uploadService(req.file.path, user._id);
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

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await signupModel
      .findById(userId)
      .select("-password -confirmPassword -__v");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        id: user._id,
        userId: user.userId || "",
        name: user.name || "",
        gender: user.gender || "",
        dob: user.dob || "",
        photo: user.photo || "",
        studentNumber: user.studentNumber || "",
        parentNumber: user.parentNumber || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        pincode: user.pincode || "",
        institutionName: user.institutionName || "",
        studentID: user.studentID || "",
        class: user.class || "",
        stream: user.stream || "",
        section: user.section || "",
        admissionYear: user.admissionYear || "",
        email: user.email || "",
      },
    });
  } catch (error) {
    console.error("Get Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Error in getProfile controller",
    });
  }
};

export const logout = async (req, res) => {
  try {
    const isProduction = process.env.NODE_ENV === "production";

    res.clearCookie("auth_token", {
      httpOnly: true,
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction,
    });

    res.clearCookie("token", {
      httpOnly: true,
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction,
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};
