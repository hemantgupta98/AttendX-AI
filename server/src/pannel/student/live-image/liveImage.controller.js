import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import { uploadImage as uploadToCloudinary } from "../media/cloudinary.js";

const roleFolders = {
  student: "live-image/student",
};

const handleLiveImageUpload = async (req, res, role) => {
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

    const form = new FormData();

    // Current live capture flow only sends one file; use it for both fields expected by AI attendance API.
    form.append("storedImage", fs.createReadStream(req.file.path));
    form.append("liveImage", fs.createReadStream(req.file.path));

    const response = await axios.post(
      "https://attendx-ai-1.onrender.com/ai/student/attendance",
      form,
      {
        headers: form.getHeaders(),
      },
    );

    return res.status(200).json({
      success: true,
      imageUrl: result.secure_url,
      publicId: result.public_id,
      message: "Yes, AI model received the student live image",
      airesponse: response.data,
      folder,
      type: role,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.response?.data?.message || error.message,
    });
  }
};

export const uploadStudentImage = async (req, res) => {
  return handleLiveImageUpload(req, res, "student");
};
