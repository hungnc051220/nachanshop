import React from "react";
import { useProducts } from "../hooks/useProductsData";
import { Link } from "react-router-dom";
import { BsCart } from "react-icons/bs";
import { formatMoney } from "../utils/commonFunction";
import Button from "@mui/material/Button";
import { addToCart } from "../redux/actions/cart";
import { useDispatch } from "react-redux";

const Categories = () => {
  const dispatch = useDispatch();
  const onSuccess = () => {};
  const onError = () => {
    toast.error("Hệ thống gặp lỗi bất thường. Đang thử lại...");
  };

  const { isLoading: isLoadingCollagen, data: dataCollagen } = useProducts(
    1,
    "collagen",
    null,
    onSuccess,
    onError
  );

  const { isLoading: isLoadingTpld, data: dataTpld } = useProducts(
    1,
    "tpld",
    null,
    onSuccess,
    onError
  );

  return (
    <section className="mx-auto my-10 max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Sản phẩm bán chạy */}
      <div className="pt-10">
        <div className="mb-6 px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
          <h2
            id="category-heading"
            className="text-3xl font-semibold tracking-tight text-gray-900"
          >
            Sản phẩm bán chạy
          </h2>
          <a
            href="#"
            className="hidden text-sm font-semibold text-indigo-600 hover:scale-110 hover:text-indigo-500 sm:block"
          >
            Xem tất cả sản phẩm<span aria-hidden="true"> →</span>
          </a>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {dataCollagen?.data?.map((product) => {
            return (
              <div
                className="group overflow-hidden rounded-lg border border-solid border-gray-200 bg-white transition-all duration-200 ease-in-out hover:shadow-xl"
                key={product._id}
              >
                <div className="relative p-5">
                  <Link
                    to={`/products/${product._id}`}
                    onClick={() => {
                      window.scrollTo(0, 0);
                    }}
                  >
                    <img
                      src={`${import.meta.env.VITE_API_URL}/${
                        product.productImage[0]
                      }`}
                      alt={product.name}
                      className="product-img default"
                    />
                  </Link>
                </div>

                <div className="p-5">
                  <Link
                    to={`/products/${product._id}`}
                    className="block text-base font-medium uppercase text-red-500"
                    onClick={() => {
                      window.scrollTo(0, 0);
                    }}
                  >
                    {product?.typeChildName}
                  </Link>

                  <Link
                    to={`/products/${product._id}`}
                    className="line-clamp-2"
                  >
                    <h3 className="text-sm text-gray-600">{product.title}</h3>
                  </Link>

                  <div className="mt-2 flex items-center justify-between">
                    <p className="mb-0 text-xl font-semibold">
                      {formatMoney(product.price)}₫
                    </p>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => dispatch(addToCart(product._id, 1))}
                    >
                      Đặt mua
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
