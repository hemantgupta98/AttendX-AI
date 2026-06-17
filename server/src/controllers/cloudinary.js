import cloudinary from "../config/cloudinary.js";

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
        folder = "attendance-system/employee";
        break;

      case "student":
        folder = "attendance-system/student";
        break;

      case "admin":
        folder = "attendance-system/admin";
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

    res.status(200).json({
      success: true,
      imageUrl: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
