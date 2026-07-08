import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import path from "path";
import { uploadImage as uploadToCloudinary } from "../media/cloudinary.js";
import { attendance } from "../database/attendance.js";

const roleFolders = {
  student: "live-image/student",
};

const handleLiveImageUpload = async (req, res, role) => {
  let storedImagePath;

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    const folder = roleFolders[role];

    if (!folder) {
      return res.status(400).json({
        success: false,
        message: "Invalid image type",
      });
    }

    const result = await uploadToCloudinary(req.file.path, folder);
    const storedPhotoUrl = req.user?.photo;

    if (!storedPhotoUrl) {
      return res.status(400).json({
        success: false,
        message: "Stored signup photo not found for student.",
      });
    }

    const tempDir = path.resolve("server/src/temp");
    fs.mkdirSync(tempDir, { recursive: true });
    storedImagePath = path.join(tempDir, `student_stored_${Date.now()}.jpg`);

    const storedImageResponse = await axios.get(storedPhotoUrl, {
      responseType: "stream",
    });

    await new Promise((resolve, reject) => {
      const writer = fs.createWriteStream(storedImagePath);
      storedImageResponse.data.pipe(writer);
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    const form = new FormData();

    form.append("storedImage", fs.createReadStream(storedImagePath));
    form.append("liveImage", fs.createReadStream(req.file.path));

    const response = await axios.post(
      "https://attendx-ai-1.onrender.com/ai/student/attendance",
      form,
      {
        headers: form.getHeaders(),
      },
    );

    const now = new Date();
    const isMatched = Boolean(response.data?.success);
    let attendanceRecord = null;
    if (isMatched) {
      attendanceRecord = await attendance.create({
        student: req.user.id,
        name: req.user.name || req.user.studentName,
        storedImage: req.user.photo,
        liveImage: result.secure_url,
        status: "Present",
        matched: true,
        confidence: response.data.confidence,
        aiResponse: response.data,
      });
    }

    return res.status(200).json({
      success: true,
      message: isMatched ? "Face matched" : "Face not matched",
      matched: isMatched,
      attendanceId: attendanceRecord?._id || null,
      confidence: response.data.confidence || null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.response?.data?.message || error.message,
    });
  } finally {
    if (storedImagePath && fs.existsSync(storedImagePath)) {
      fs.unlinkSync(storedImagePath);
    }
  }
};

export const uploadStudentImage = async (req, res) => {
  return handleLiveImageUpload(req, res, "student");
};

export const getAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    const attendanceData = await attendance.findOne({
      _id: id,
      student: req.user.id,
    });

    {
      /** console.log("Attendance ID:", req.params.id);
    console.log("Student ID:", req.user.id); */
    }

    if (!attendanceData) {
      return res.status(404).json({
        success: false,
        message: "Attendance Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      data: attendanceData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAttendanceHistory = async (req, res) => {
  try {
    const attendanceHistory = await attendance
      .find({ student: req.user.id })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      totalRecords: attendanceHistory.length,
      data: attendanceHistory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteAttendanceHistory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAttendance = await attendance.findOneAndDelete({
      _id: id,
      student: req.user.id,
    });

    if (!deletedAttendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Attendance deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
