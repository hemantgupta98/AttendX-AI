import FormData from "form-data";
import axios from "axios";
import fs from "fs";

export const uploadService = async (filePath, userId) => {
  try {
    const form = new FormData();

    form.append("photo", fs.createReadStream(filePath));
    form.append("userId", userId);

    const response = await axios.post(
      "https://attendx-ai-1.onrender.com/ai/admin/signup",
      form,
      {
        headers: form.getHeaders(),
      },
    );
    return response.data;
  } catch (error) {
    alert(error);
  }
};
