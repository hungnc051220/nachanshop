import axios from "axios";

const axiosInstance = axios.create({ baseURL: import.meta.env.VITE_API_URL });

export const updateNotification = async (id) => {
  try {
    const { data } = await axiosInstance.patch(`notifications/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
