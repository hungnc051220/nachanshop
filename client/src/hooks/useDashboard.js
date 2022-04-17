import { useQuery } from "react-query";
import { fetchDashboard } from "../api";

export const useDashboard = (onSuccess, onError) => {
  return useQuery("dashboard", fetchDashboard, {
    onSuccess,
    onError,
  });
};

