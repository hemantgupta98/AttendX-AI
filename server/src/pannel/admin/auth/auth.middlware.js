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
      email: user.email,
      type: user.type,
      year: user.year,
      board: user.board,
      photo: user.photo,
      address: user.address,
      city: user.city,
      state: user.state,
      pincode: user.pincode,
      adminName: user.adminName,
      designation: user.designation,
      adminEmail: user.adminEmail,
      adminNumber: user.adminNumber,
      department: user.department,
      course: user.course,
      student: user.student,
      staff: user.staff,
      attendenceType: user.attendenceType,
      workingDays: user.workingDays,
      attendance: user.attendance,
      classTiming: user.classTiming,
      adminCode: user.adminCode,
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
