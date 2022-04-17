import { useQuery, useQueryClient, useMutation } from "react-query";
import { fetchOrders, updateOrder } from "../api";
import { toast } from "react-toastify";

export const useOrders = (onSuccess, onError) => {
  return useQuery("orders", fetchOrders, {
    onSuccess,
    onError,
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation(updateOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries("orders");
      toast.success("Cập nhật đơn hàng thành công!");
    },
  });
};
