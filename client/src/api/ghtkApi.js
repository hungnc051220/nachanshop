import axios from "axios";
const axiosInstance = axios.create({ baseURL: import.meta.env.VITE_API_URL });

export const getFee = async (addressData) => {
  try {
    const { data } = await axiosInstance.post("/ghtk", addressData);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createOrder = async (orderData) => {
  try {
    const { data } = await axiosInstance.post("/ghtk/create-order", orderData);
    return data;
  } catch (error) {
    console.log(error);
  }
};
