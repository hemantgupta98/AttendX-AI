import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import path from "path";
import { uploadImage as uploadToCloudinary } from "../media/uploadCloudinary.js";
import { attendance } from "../database/attendance.model.js";

const roleFolders = {
  admin: "live-image/admin",
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
        message: "Stored signup photo not found for admin.",
      });
    }

    const tempDir = path.resolve("server/src/temp");
    fs.mkdirSync(tempDir, { recursive: true });
    storedImagePath = path.join(tempDir, `admin_stored_${Date.now()}.jpg`);

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
      "https://attendx-ai-1.onrender.com/ai/admin/attendance",
      form,
      {
        headers: form.getHeaders(),
      },
    );

    const now = new Date();
    const isMatched = Boolean(response.data?.success);
    const attendanceDetails = {
      name: req.user?.name || req.user?.adminName || "Admin",
      photo: req.user?.photo || result.secure_url,
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString(),
      status: isMatched ? "Present" : "Not Matched",
    };

    return res.status(200).json({
      success: true,
      imageUrl: result.secure_url,
      publicId: result.public_id,
      message: isMatched ? "Face matched" : "Face not matched",
      matched: isMatched,
      attendanceDetails,
      airesponse: response.data,
      folder,
      type: role,
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

export const uploadAdminImage = async (req, res) => {
  return handleLiveImageUpload(req, res, "admin");
};

export const getAttendance = async (req, res) => {
  try {
    const attendanceData = await attendance
      .findById(req.params.id)
      .populate({
        path: "user",
        select:
          "name email photo employeeID teacherNumber parentNumber gender dob address city state pincode institutionName class subject department course designation joiningYear",
      })
      .populate({
        path: "admin",
        select: "name email institutionName",
      });

    if (!attendanceData) {
      return res.status(404).json({
        success: false,
        message: "Attendance not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        attendanceId: attendanceData._id,
        user: attendanceData.user,
        admin: attendanceData.admin,
        storedImage: attendanceData.storedImage,
        liveImage: attendanceData.liveImage,
        status: attendanceData.status,
        matched: attendanceData.matched,
        confidence: attendanceData.confidence,
        location: attendanceData.location,
        date: attendanceData.date,
        time: attendanceData.time,
        createdAt: attendanceData.createdAt,
        updatedAt: attendanceData.updatedAt,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

{
  /** await attendance.create({
      admin: req.user._id,
      name: req.user.name,
      storedImage: req.user.photo,
      liveImage: result.secure_url,
      status: isMatched ? "Present" : "Absent",
      matched: isMatched,
      confidence:
        response.data?.confidence || response.data?.match_percentage || null,
      aiResponse: response.data,
      date: now,
    }); */
}
