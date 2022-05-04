import axios from "axios";

const axiosInstance = axios.create({ baseURL: import.meta.env.VITE_API_URL });

export const getOrders = async () => {
  try {
    const { data } = await axiosInstance.get("/orders/");
    return data;
  } catch (error) {
    console.log(error);
  }
};
