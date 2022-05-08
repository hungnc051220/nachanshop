import { useQuery } from "react-query";
import { getDashboard } from "../api/dashboardApi";

export const useDashboard = () => {
  return useQuery("dashboard", getDashboard, {
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
};
