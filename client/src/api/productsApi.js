import axios from "axios";

const axiosInstance = axios.create({ baseURL: import.meta.env.VITE_API_URL });

export const getProducts = async (page, type, typeChild) => {
  try {
    const { data } = await axiosInstance.get(
      `products?page=${page}${type ? `&type=${type}` : ""}${typeChild ? `&typeChild=${typeChild}` : ""
      }`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductsBySearch = async (type) => {
  try {
    const { data } = await axiosInstance.get(`products/search?type=${type}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getProduct = async (id) => {
  try {
    const { data } = await axiosInstance.get(`products/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addProduct = async (newProduct) => {
  try {
    const { data } = await axiosInstance.post(`products`, newProduct);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (id, product) => {
  try {
    const { data } = await axiosInstance.post(`products/${id}`, product);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async ({ id }) => {
  try {
    const { data } = await axiosInstance.delete(`products/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const generateLink = async (link) => {
  try {
    const { data } = await axiosInstance.post("gen", { link });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const generateMultiLink = async (link) => await axiosInstance.post("gen/multi", { link });
export const addMultiProduct = async (data) => await axiosInstance.post("products/multi", data)
export const deleteMultiProduct = async (data) => {
  try {
    const response = await axiosInstance.post("products/deleteMulti", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
