import axios from "axios";

export const uploadFileHandler = async (file) => {
  const formData = new FormData();
  formData.append("image", file);
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.post("/api/upload", formData, config);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
