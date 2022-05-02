import axios from "axios";

const axiosInstance = axios.create({ baseURL: import.meta.env.VITE_API_URL });

// Login
const login = async (userData) => {
  const response = await axiosInstance.post("/users/signin", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  login,
  logout
};

export default authService;
