import cloudinary from "../config/cloudinary.js";
import FormData from "form-data";
import fs from "fs";
import axios from "axios";

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    const type = req.body.type;

    let folder;
    switch (type) {
      case "employee":
        folder = "live-image/employee";
        break;

      case "student":
        folder = "live-image/student";
        break;

      case "admin":
        folder = "live-image/admin";
        break;

      default:
        res.status(400).json({
          success: false,
          message: "Failed to send Image",
        });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder,
    });

    // send image to AI model

    const form = new FormData();

    form.append("image", fs.createReadStream(req.file.path));
    form.append("type", type);
    form.append("folder", folder);

    const response = await axios.post(
      "https://attendx-ai-1.onrender.com/api/live-image",
      form,
      {
        headers: form.getHeaders(),
      },
    );

    res.status(200).json({
      success: true,
      imageUrl: result.secure_url,
      publicId: result.public_id,
      airesponse: response.data,
      folder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
