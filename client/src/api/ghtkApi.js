import axios from "axios";
import toast from "react-hot-toast";

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
    if (data.success) {
      toast.success("Đơn hàng đã được tạo vào hệ thống GHTK thành công!");
    } else {
      toast.error(data.message);
    }
    return data;
  } catch (error) {
    toast.error(error.message);
  }
};

export const checkOrder = async (id) => {
  try {
    const { data } = await axiosInstance.get(`/ghtk/check-order/${id}`);
    return data;
  } catch (error) {
    toast.error(error.message);
  }
};
