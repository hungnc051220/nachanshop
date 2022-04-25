import { useQuery } from "react-query";
import { fetchDashboard } from "../api";

export const useDashboard = () => {
  return useQuery("dashboard", fetchDashboard, {
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
};
