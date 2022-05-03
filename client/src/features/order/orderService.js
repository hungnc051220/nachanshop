import axios from "axios";

const axiosInstance = axios.create({ baseURL: import.meta.env.VITE_API_URL });

// Add order
const addOrder = async (order) => {
  const response = await axiosInstance.post("/orders", order);
  return response.data;
};

const orderService = {
  addOrder,
};

export default orderService;
