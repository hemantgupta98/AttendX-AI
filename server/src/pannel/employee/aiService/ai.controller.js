import axios from "axios";
import fs from "fs";
import FormData from "form-data";

export const uploadService = async (filePath, name) => {
  try {
    const formData = new FormData();
    formData.append("image", fs.createReadStream(filePath));
    formData.append("name", name);

    const response = await axios.post(
      "https://attendx-ai-1.onrender.com/ai/employee/signup",
      formData,
      {
        headers: formData.getHeaders(),
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || error.message || "AI upload failed",
    );
  }
};
