import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import path from "path";
import { uploadImage as uploadToCloudinary } from "../media/cloudinary.js";
import { attendance } from "../database/attendance.js";

const roleFolders = {
  employee: "live-image/employee",
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
        message: "Stored signup photo not found for employee.",
      });
    }

    const tempDir = path.resolve("server/src/temp");
    fs.mkdirSync(tempDir, { recursive: true });
    storedImagePath = path.join(tempDir, `employee_stored_${Date.now()}.jpg`);

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
      "https://attendx-ai-1.onrender.com/ai/employee/attendance",
      form,
      {
        headers: form.getHeaders(),
      },
    );

    const now = new Date();
    const isMatched = Boolean(response.data?.success);
    const attendanceRecord = await attendance.create({
      employee: req.user.id,
      name: req.user.name || req.user.employeeName,
      storedImage: req.user.photo,
      liveImage: result.secure_url,
      status: isMatched ? "Present" : "Absent",
      matched: isMatched,
      confidence: response.data?.confidence || 0,
      aiResponse: response.data,
    });
    return res.status(200).json({
      success: true,
      message: isMatched ? "Face matched successfully" : "Face not matched",
      matched: isMatched,
      attendanceId: attendanceRecord._id,
      confidence: attendanceRecord.confidence,
      data: attendanceRecord,
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

export const uploadEmployeeImage = async (req, res) => {
  return handleLiveImageUpload(req, res, "employee");
};

export const getAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    const attendanceData = await attendance.findOne({
      _id: id,
      employee: req.user.id,
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
      .find({ employee: req.user.id })
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
      employee: req.user.id,
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
