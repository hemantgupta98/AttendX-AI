import cloudinary from "../../../config/cloudinary.js";

export const uploadImage = async (filePath, folder) => {
  return cloudinary.uploader.upload(filePath, {
    folder,
  });
};
