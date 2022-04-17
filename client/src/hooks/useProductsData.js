import { useQuery, useQueryClient, useMutation } from "react-query";
import {
  getProducts,
  getProduct,
  addProduct,
  deleteProduct,
  getProductsBySearch,
} from "../api/productsApi";
import { toast } from "react-toastify";

export const useProducts = (page, type, typeChild, onSuccess, onError) => {
  return useQuery(["products", page, type, typeChild], () => getProducts(page, type, typeChild), {
    keepPreviousData: true,
    staleTime: 60000,
    onSuccess,
    onError,
  });
};

export const useProductsBySearch = (type, onSuccess, onError) => {
  return useQuery(["products", type], () => getProductsBySearch(type), {
    onSuccess,
    onError,
  });
};

export const useProduct = (id) => {
  const queryClient = useQueryClient();
  return useQuery(["product", id], () => getProduct(id), {
    initialData: () => {
      const product = queryClient
        .getQueryData("products")
        ?.data?.find((product) => product._id === id);
      if (product) {
        return {
          data: product,
        };
      } else {
        return undefined;
      }
    },
  });
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(addProduct, {
    onSuccess: () => {
      toast.success("Thêm sản phẩm thành công");
      queryClient.invalidateQueries("products");
    },
    onError: () => {},
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteProduct, {
    onSuccess: () => {
      toast.success("Xoá sản phẩm thành công");
      queryClient.invalidateQueries("products");
    },
    onError: () => {},
  });
};
