import FormData from "form-data";
import axios from "axios";
import fs from "fs";

export const uploadService = async (filePath, name) => {
  try {
    const form = new FormData();

    form.append("image", fs.createReadStream(filePath));
    form.append("name", name);

    const response = await axios.post(
      "https://attendx-ai-1.onrender.com/ai/admin/signup",
      form,
      {
        headers: form.getHeaders(),
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || error.message || "AI upload failed",
    );
  }
};
