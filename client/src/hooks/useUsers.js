import { useQuery } from "react-query";
import { fetchUsers } from "../api";

export const useUsers = (onSuccess, onError) => {
  return useQuery("users", fetchUsers, {
    onSuccess,
    onError,
  });
};

