import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import path from "path";
import { uploadImage as uploadToCloudinary } from "../media/uploadCloudinary.js";

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

    return res.status(200).json({
      success: true,
      imageUrl: result.secure_url,
      publicId: result.public_id,
      message: response.data?.success ? "Face matched" : "Face not matched",
      matched: Boolean(response.data?.success),
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
