import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import { uploadImage as uploadToCloudinary } from "../media/uploadCloudinary.js";

const roleFolders = {
  admin: "live-image/admin",
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

    form.append("image", fs.createReadStream(req.file.path));
    form.append("type", role);
    form.append("folder", folder);

    const response = await axios.post(
      "https://attendx-ai-1.onrender.com/live-image",
      form,
      {
        headers: form.getHeaders(),
      },
    );

    return res.status(200).json({
      success: true,
      imageUrl: result.secure_url,
      publicId: result.public_id,
      airesponse: response.data,
      folder,
      type: role,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const uploadAdminImage = async (req, res) => {
  return handleLiveImageUpload(req, res, "admin");
};
