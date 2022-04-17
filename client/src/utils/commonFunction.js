import decode from "jwt-decode";

export const formatMoney = (value) => {
  let val = (value / 1).toFixed(0).replace(".", ",");
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const useAuth = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const token = user?.token;

  if (!token) {
    return false;
  }

  const decodedToken = decode(token);

  if (decodedToken.exp * 1000 < new Date().getTime()) {
    return false;
  }

  return true;
};
