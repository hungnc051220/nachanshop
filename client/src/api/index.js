import axios from "axios";

const axiosInstance = axios.create({ baseURL: import.meta.env.VITE_API_URL });
const axiosGHInstance = axios.create({
  baseURL: "https://online-gateway.ghn.vn/shiip/public-api/master-data",
  headers: { token: "28adfb83-abc8-11ec-bc89-6623f36c3aa5" },
});
const axiosGHInstance2 = axios.create({
  baseURL: "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order",
  headers: { token: "28adfb83-abc8-11ec-bc89-6623f36c3aa5", shopid: 2607478 },
});

export const fetchProducts = () => axiosInstance.get("/products");
export const fetchProductsBySearch = (type) =>
  axiosInstance.get(`/products/search?type=${type}`);
export const getProduct = (id) => axiosInstance.get(`/products/${id}`);
export const addProduct = (data) => axiosInstance.post(`/products`, data);
export const updateProduct = (id, updatedProduct) =>
  axiosInstance.patch(`/products/${id}`, updatedProduct);
export const deleteProduct = ({ id }) =>
  axiosInstance.delete(`/products/${id}`);

export const fetchOrders = () => axiosInstance.get("/orders/");
export const getOrder = (id) => axiosInstance.get(`/orders/${id}`);
export const addOrder = (data) => axiosInstance.post(`/orders`, data);
export const updateOrder = ({ id, updatedOrder }) =>
  axiosInstance.patch(`/orders/${id}`, updatedOrder);

export const sendMail = (data) => axiosInstance.post(`/mail`, data);

export const fetchProvinces = () => axiosGHInstance.get("/province");
export const fetchDistricts = (data) => axiosGHInstance.post("/district", data);
export const fetchWards = (data) => axiosGHInstance.post("/ward", data);

export const getFee = (data) => axiosGHInstance2.post("/fee", data);

export const signIn = (formData) =>
  axiosInstance.post("/users/signin", formData);
export const signUp = (formData) =>
  axiosInstance.post("/users/signup", formData);

export const fetchDashboard = () => axiosInstance.get("/dashboard");

export const fetchUsers = () => axiosInstance.get("/users");
export const deleteUser = (id) => axiosInstance.delete(`/users/${id}`);

export const addMultiProduct = (data) => axiosInstance.post(`/products`, data);
