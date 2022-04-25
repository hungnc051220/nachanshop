import React from "react";
import { FaBars } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { formatMoney } from "../utils/commonFunction";
import queryString from "query-string";
import { toast } from "react-toastify";
import { useProducts } from "../hooks/useProductsData";
import { BsCart } from "react-icons/bs";
import Button from "@mui/material/Button";

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const onSuccess = () => {};
  const onError = () => {
    toast.error("Hệ thống gặp lỗi bất thường. Đang thử lại...");
  };
  const { type, page = 1, typeChild } = queryString.parse(location.search);

  const { isLoading, isFetching, data } = useProducts(
    page,
    type,
    typeChild,
    onSuccess,
    onError
  );

  const onChangePagination = (page, pageSize) => {
    navigate(`/products?type=${type}&page=${page}`);
    window.scrollTo(0, 0);
  };

  return (
    <section className="mx-auto mt-4 max-w-7xl">
      <div className="container">
        <div className="mb-4">
          {data?.data[0]?.typeParentName && <div className="col-lg-12"></div>}
        </div>
        <div className="pt-5 pb-16">
          <div className="mb-6 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {data?.data?.map((product) => {
              return (
                <div
                  className="group overflow-hidden rounded-lg border border-solid border-gray-200 transition-all duration-200 ease-in-out hover:shadow-xl"
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
                      className="inline-block h-24 py-2"
                      onClick={() => {
                        window.scrollTo(0, 0);
                      }}
                    >
                      <h3 className="text-sm text-gray-600">{product.title}</h3>
                    </Link>

                    <div className="flex items-center justify-between">
                      <p className="mb-0 text-xl font-semibold">
                        {formatMoney(product.price)}₫
                      </p>
                      <Button variant="contained" color="error" size="small">
                        Đặt mua
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
