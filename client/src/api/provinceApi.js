import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://provinces.open-api.vn/api",
});

export const getProvinces = async () => {
  try {
    const { data } = await axiosInstance.get("/p");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getDistricts = async (provinceCode) => {
  try {
    const { data } = await axiosInstance.get(`/p/${provinceCode}?depth=2`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getWards = async (wardCode) => {
  try {
    const { data } = await axiosInstance.get(`/d/${wardCode}?depth=2`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
