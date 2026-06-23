import axios from "axios";
import formData from "form-data";
import fs from "fs";

export const adminVerify = async (req, res) => {
  try {
    const form = new formData();

    form.append("storedImage", fs.createReadStream(req.files.storedImage.path));
    form.append("liveImage", fs.createReadStream(req.files.liveImage.path));
    const response = await axios.post(
      "https://attendx-ai-1.onrender.com/ai/admin/verify",
      form,
      {
        headers: form.getHeaders(),
      },
    );
    const message = response.data.message;
    const matched = response.data.matched;

    res.status(200).json({
      message,
      matched,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to retirve message from Admin verify Model.",
    });
  }
};
