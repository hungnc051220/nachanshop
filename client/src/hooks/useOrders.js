import { useQuery, useQueryClient, useMutation } from "react-query";
import { updateOrder } from "../api";
import { getOrders } from "../api/orderApi";
import toast from "react-hot-toast";

export const useOrders = () => {
  return useQuery("orders", getOrders, {
    onSuccess: () => {},
    onError: () => {
      toast.error("Hệ thống gặp lỗi bất thường. Đang thử lại...");
    },
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
