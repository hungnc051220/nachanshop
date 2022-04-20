import React from "react";
import { useProducts } from "../hooks/useProductsData";
import { Link } from "react-router-dom";
import { BsCart } from "react-icons/bs";
import { formatMoney } from "../utils/commonFunction";

const Categories = () => {
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

  const { isLoading: isLoadingGc, data: dataGc } = useProducts(
    1,
    "gc",
    null,
    onSuccess,
    onError
  );

  const { isLoading: isLoadingCssk, data: dataCssk } = useProducts(
    1,
    "cssk",
    null,
    onSuccess,
    onError
  );

  const { isLoading: isLoadingTd, data: dataTd } = useProducts(
    1,
    "td",
    null,
    onSuccess,
    onError
  );

  const { isLoading: isLoadingCsdm, data: dataCsdm } = useProducts(
    1,
    "csdm",
    null,
    onSuccess,
    onError
  );

  const { isLoading: isLoadingCsct, data: dataCsct } = useProducts(
    1,
    "csct",
    null,
    onSuccess,
    onError
  );

  const { isLoading: isLoadingMvb, data: dataMvb } = useProducts(
    1,
    "mvb",
    null,
    onSuccess,
    onError
  );

  const { isLoading: isLoadingTpnb, data: dataTpnb } = useProducts(
    1,
    "tpnb",
    null,
    onSuccess,
    onError
  );

  return (
    <div className="mx-auto my-10 max-w-7xl">
      <div className="pt-10">
        <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
          <h2
            id="category-heading"
            className="text-2xl font-semibold tracking-tight text-gray-900"
          >
            Collagen
          </h2>
          <a
            href="#"
            className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
          >
            Xem tất cả sản phẩm<span aria-hidden="true"> →</span>
          </a>
        </div>

        <div className="relative">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {dataCollagen?.data?.map((product) => {
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

                  <div className="p-5">
                    <Link
                      to={`/products/${product._id}`}
                      className="font-medium uppercase text-red-500"
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
                      <h3 className="text-gray-600">{product.title}</h3>
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
        </div>
      </div>

      {/* Thực phẩm làm đẹp */}
      <div className="py-10">
        <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
          <h2
            id="category-heading"
            className="text-2xl font-semibold tracking-tight text-gray-900"
          >
            Thực phẩm làm đẹp
          </h2>
          <a
            href="#"
            className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
          >
            Xem tất cả sản phẩm<span aria-hidden="true"> →</span>
          </a>
        </div>

        <div className="relative">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {dataTpld?.data?.map((product) => {
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
        </div>
      </div>

      {/* Giảm cân */}
      <div className="py-10">
        <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
          <h2
            id="category-heading"
            className="text-2xl font-semibold tracking-tight text-gray-900"
          >
            Giảm cân
          </h2>
          <a
            href="#"
            className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
          >
            Xem tất cả sản phẩm<span aria-hidden="true"> →</span>
          </a>
        </div>

        <div className="relative">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {dataGc?.data?.map((product) => {
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
        </div>
      </div>

      {/* Chăm sóc sức khoẻ */}
      <div className="py-10">
        <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
          <h2
            id="category-heading"
            className="text-2xl font-semibold tracking-tight text-gray-900"
          >
            Chăm sóc sức khoẻ
          </h2>
          <a
            href="#"
            className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
          >
            Xem tất cả sản phẩm<span aria-hidden="true"> →</span>
          </a>
        </div>

        <div className="relative">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {dataCssk?.data?.map((product) => {
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
        </div>
      </div>

      {/* Trang điểm */}
      <div className="py-10">
        <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
          <h2
            id="category-heading"
            className="text-2xl font-semibold tracking-tight text-gray-900"
          >
            Trang điểm
          </h2>
          <a
            href="#"
            className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
          >
            Xem tất cả sản phẩm<span aria-hidden="true"> →</span>
          </a>
        </div>

        <div className="relative">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {dataTd?.data?.map((product) => {
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
        </div>
      </div>

      {/* Chăm sóc da mặt */}
      <div className="py-10">
        <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
          <h2
            id="category-heading"
            className="text-2xl font-semibold tracking-tight text-gray-900"
          >
            Chăm sóc da mặt
          </h2>
          <a
            href="#"
            className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
          >
            Xem tất cả sản phẩm<span aria-hidden="true"> →</span>
          </a>
        </div>

        <div className="relative">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {dataCsdm?.data?.map((product) => {
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
        </div>
      </div>

      {/* Chăm sóc cơ thể */}
      <div className="py-10">
        <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
          <h2
            id="category-heading"
            className="text-2xl font-semibold tracking-tight text-gray-900"
          >
            Chăm sóc cơ thể
          </h2>
          <a
            href="#"
            className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
          >
            Xem tất cả sản phẩm<span aria-hidden="true"> →</span>
          </a>
        </div>

        <div className="relative">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {dataCsct?.data?.map((product) => {
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
        </div>
      </div>

      {/* Mẹ và bé */}
      <div className="py-10">
        <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
          <h2
            id="category-heading"
            className="text-2xl font-semibold tracking-tight text-gray-900"
          >
            Mẹ và bé
          </h2>
          <a
            href="#"
            className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
          >
            Xem tất cả sản phẩm<span aria-hidden="true"> →</span>
          </a>
        </div>

        <div className="relative">
          <div className="grid grid-cols-2 grid-rows-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {dataMvb?.data?.map((product) => {
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
        </div>
      </div>

      {/* Thực phẩm Nhật Bản */}
      <div className="py-10">
        <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
          <h2
            id="category-heading"
            className="text-2xl font-semibold tracking-tight text-gray-900"
          >
            Thực phẩm Nhật Bản
          </h2>
          <a
            href="#"
            className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
          >
            Xem tất cả sản phẩm<span aria-hidden="true"> →</span>
          </a>
        </div>

        <div className="relative">
          <div className="grid grid-cols-2 grid-rows-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {dataTpnb?.data?.map((product) => {
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
        </div>
      </div>
    </div>
  );
};

export default Categories;
