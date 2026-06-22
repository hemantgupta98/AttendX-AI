import axios from "axios";
import fs from "fs";
import FormData from "form-data";

export const uploadService = async (filePath, userId) => {
  try {
    const formData = new FormData();
    formData.append("photo", fs.createReadStream(filePath));
    formData.append("userId", userId);

    const response = await axios.post(
      "https://attendx-ai-1.onrender.com/ai/employee/signup",
      formData,
      {
        headers: formData.getHeaders(),
      },
    );
    return response.data;
  } catch (error) {
    alert(error);
  }
};
