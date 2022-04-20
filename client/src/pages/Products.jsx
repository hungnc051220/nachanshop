import React from "react";
import { FaBars } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { formatMoney } from "../utils/commonFunction";
import queryString from "query-string";
import { toast } from "react-toastify";
import { useProducts } from "../hooks/useProductsData";
import { BsCart } from "react-icons/bs";

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
        <div className="row mb-4">
          {data?.data[0]?.typeParentName && <div className="col-lg-12"></div>}
        </div>
        <div className="pt-5 pb-16">
          <div className="mb-6 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {data?.data?.map((product) => {
              return (
                <div
                  className="group grid grid-rows-[1fr_2fr] overflow-hidden rounded-lg border border-solid border-gray-200 transition-all duration-200 ease-in-out hover:shadow-xl"
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
                        src={
                          import.meta.env.VITE_API_URL + product.productImage
                        }
                        alt={product.name}
                        className="product-img default"
                      />
                    </Link>

                    <div className="absolute top-2 right-2 z-10 text-xl transition-all duration-200 ease-in-out">
                      <button className="flex h-8 w-8 translate-x-12 transform cursor-pointer items-center justify-center rounded-lg border border-solid border-gray-200 bg-white shadow-md hover:bg-red-500 hover:text-white focus:bg-red-700 focus:text-white focus:outline-none group-hover:translate-x-0">
                        <BsCart />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-rows-[auto_1fr_auto] p-5">
                    <Link
                      to={`/products/${product._id}`}
                      className="text-base font-medium uppercase text-red-500"
                      onClick={() => {
                        window.scrollTo(0, 0);
                      }}
                    >
                      {product?.typeChildName}
                    </Link>

                    <Link
                      to={`/products/${product._id}`}
                      className="inline-block py-2"
                      onClick={() => {
                        window.scrollTo(0, 0);
                      }}
                    >
                      <h3 className="text-sm text-gray-600">{product.title}</h3>
                    </Link>

                    <div className="price-box">
                      <p className="mb-0 text-xl font-semibold">
                        {formatMoney(product.price)}₫
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {data && <div className="float-right"></div>}
        </div>
      </div>
    </section>
  );
};

export default Products;
