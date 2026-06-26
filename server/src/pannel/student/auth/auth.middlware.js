import jwt from "jsonwebtoken";
import { signupModel } from "./auth.model.js";

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    const bearerToken =
      authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null;

    const cookieToken = req.cookies?.auth_token || null;

    const token = bearerToken || cookieToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_WEB_TOKEN);

    if (!decoded?.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    const user = await signupModel
      .findById(decoded.id)
      .select("-password -confirmPassword");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = {
      id: user._id,
      userId: user.userId,
      name: user.name,
      gender: user.gender,
      dob: user.dob,
      photo: user.photo,
      studentNumber: user.studentNumber,
      parentNumber: user.parentNumber,
      address: user.address,
      city: user.city,
      state: user.state,
      pincode: user.pincode,
      institutionName: user.institutionName,
      studentID: user.studentID,
      class: user.class,
      stream: user.stream,
      section: user.section,
      admissionYear: user.admissionYear,
      email: user.email,
    };

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);

    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};
