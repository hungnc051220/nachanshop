import React from "react";
import { useProducts } from "../hooks/useProductsData";
import { Link } from "react-router-dom";
import { Spin } from "antd";
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
    <div className="tw-mx-auto tw-max-w-7xl tw-my-10">
      <div className="tw-pt-10">
        <div class="tw-px-4 sm:tw-px-6 sm:tw-flex sm:tw-items-center sm:tw-justify-between lg:tw-px-8 xl:tw-px-0">
          <h2
            id="category-heading"
            class="tw-text-2xl tw-font-semibold tw-tracking-tight tw-text-gray-900"
          >
            Collagen
          </h2>
          <a
            href="#"
            class="tw-hidden tw-text-sm tw-font-semibold tw-text-indigo-600 hover:tw-text-indigo-500 sm:tw-block"
          >
            Xem tất cả sản phẩm<span aria-hidden="true"> →</span>
          </a>
        </div>

        <div className="tw-relative">
          <Spin spinning={isLoadingCollagen}>
            <div className="tw-grid tw-grid-cols-2 sm:tw-grid-cols-3 lg:tw-grid-cols-5 md:tw-grid-cols-4 tw-gap-6">
              {dataCollagen?.data?.map((product) => {
                return (
                  <div
                    className="tw-group tw-border tw-border-gray-200 tw-border-solid tw-rounded-lg hover:tw-shadow-xl tw-overflow-hidden tw-transition-all tw-duration-200 tw-ease-in-out"
                    key={product._id}
                  >
                    <div className="tw-relative tw-p-5">
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

                      <div className="tw-absolute tw-top-2 tw-right-2 tw-text-xl tw-transition-all tw-duration-200 tw-ease-in-out tw-z-10">
                        <button className="tw-h-8 tw-w-8 tw-flex tw-items-center tw-justify-center tw-rounded-lg tw-border-solid tw-border tw-border-gray-200 tw-bg-white tw-shadow-md focus:tw-outline-none hover:tw-bg-red-500 focus:tw-bg-red-700 focus:tw-text-white hover:tw-text-white tw-cursor-pointer tw-transform tw-translate-x-12 group-hover:tw-translate-x-0">
                          <BsCart />
                        </button>
                      </div>
                    </div>

                    <div className="tw-p-5">
                      <Link
                        to={`/products/${product._id}`}
                        className="tw-uppercase tw-text-red-500 tw-font-medium"
                        onClick={() => {
                          window.scrollTo(0, 0);
                        }}
                      >
                        {product?.typeChildName}
                      </Link>

                      <Link
                        to={`/products/${product._id}`}
                        className="tw-inline-block tw-py-2"
                        onClick={() => {
                          window.scrollTo(0, 0);
                        }}
                      >
                        <h3 className="tw-text-gray-600">{product.title}</h3>
                      </Link>

                      <div className="price-box">
                        <p className="tw-font-semibold tw-text-xl tw-mb-0">
                          {formatMoney(product.price)}₫
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Spin>
        </div>
      </div>

      {/* Thực phẩm làm đẹp */}
      <div className="tw-py-10">
        <div class="tw-px-4 sm:tw-px-6 sm:tw-flex sm:tw-items-center sm:tw-justify-between lg:tw-px-8 xl:tw-px-0">
          <h2
            id="category-heading"
            class="tw-text-2xl tw-font-semibold tw-tracking-tight tw-text-gray-900"
          >
            Thực phẩm làm đẹp
          </h2>
          <a
            href="#"
            class="tw-hidden tw-text-sm tw-font-semibold tw-text-indigo-600 hover:tw-text-indigo-500 sm:tw-block"
          >
            Xem tất cả sản phẩm<span aria-hidden="true"> →</span>
          </a>
        </div>

        <div className="tw-relative">
          <Spin spinning={isLoadingTpld}>
            <div className="tw-grid tw-grid-cols-2 sm:tw-grid-cols-3 lg:tw-grid-cols-5 md:tw-grid-cols-4 tw-gap-6">
              {dataTpld?.data?.map((product) => {
                return (
                  <div
                    className="tw-group tw-grid tw-grid-rows-[1fr_2fr] tw-border tw-border-gray-200 tw-border-solid tw-rounded-lg hover:tw-shadow-xl tw-overflow-hidden tw-transition-all tw-duration-200 tw-ease-in-out"
                    key={product._id}
                  >
                    <div className="tw-relative tw-p-5">
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

                      <div className="tw-absolute tw-top-2 tw-right-2 tw-text-xl tw-transition-all tw-duration-200 tw-ease-in-out tw-z-10">
                        <button className="tw-h-8 tw-w-8 tw-flex tw-items-center tw-justify-center tw-rounded-lg tw-border-solid tw-border tw-border-gray-200 tw-bg-white tw-shadow-md focus:tw-outline-none hover:tw-bg-red-500 focus:tw-bg-red-700 focus:tw-text-white hover:tw-text-white tw-cursor-pointer tw-transform tw-translate-x-12 group-hover:tw-translate-x-0">
                          <BsCart />
                        </button>
                      </div>
                    </div>

                    <div className="tw-p-5 tw-grid tw-grid-rows-[auto_1fr_auto]">
                      <Link
                        to={`/products/${product._id}`}
                        className="tw-uppercase tw-text-red-500 tw-font-medium tw-text-base"
                        onClick={() => {
                          window.scrollTo(0, 0);
                        }}
                      >
                        {product?.typeChildName}
                      </Link>

                      <Link
                        to={`/products/${product._id}`}
                        className="tw-inline-block tw-py-2"
                        onClick={() => {
                          window.scrollTo(0, 0);
                        }}
                      >
                        <h3 className="tw-text-gray-600 tw-text-sm">
                          {product.title}
                        </h3>
                      </Link>

                      <div className="price-box">
                        <p className="tw-font-semibold tw-text-xl tw-mb-0">
                          {formatMoney(product.price)}₫
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Spin>
        </div>
      </div>

      {/* Giảm cân */}
      <div className="tw-py-10">
        <div class="tw-px-4 sm:tw-px-6 sm:tw-flex sm:tw-items-center sm:tw-justify-between lg:tw-px-8 xl:tw-px-0">
          <h2
            id="category-heading"
            class="tw-text-2xl tw-font-semibold tw-tracking-tight tw-text-gray-900"
          >
            Giảm cân
          </h2>
          <a
            href="#"
            class="tw-hidden tw-text-sm tw-font-semibold tw-text-indigo-600 hover:tw-text-indigo-500 sm:tw-block"
          >
            Xem tất cả sản phẩm<span aria-hidden="true"> →</span>
          </a>
        </div>

        <div className="tw-relative">
          <Spin spinning={isLoadingGc}>
            <div className="tw-grid tw-grid-cols-2 sm:tw-grid-cols-3 lg:tw-grid-cols-5 md:tw-grid-cols-4 tw-gap-6">
              {dataGc?.data?.map((product) => {
                return (
                  <div
                    className="tw-group tw-grid tw-grid-rows-[1fr_2fr] tw-border tw-border-gray-200 tw-border-solid tw-rounded-lg hover:tw-shadow-xl tw-overflow-hidden tw-transition-all tw-duration-200 tw-ease-in-out"
                    key={product._id}
                  >
                    <div className="tw-relative tw-p-5">
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

                      <div className="tw-absolute tw-top-2 tw-right-2 tw-text-xl tw-transition-all tw-duration-200 tw-ease-in-out tw-z-10">
                        <button className="tw-h-8 tw-w-8 tw-flex tw-items-center tw-justify-center tw-rounded-lg tw-border-solid tw-border tw-border-gray-200 tw-bg-white tw-shadow-md focus:tw-outline-none hover:tw-bg-red-500 focus:tw-bg-red-700 focus:tw-text-white hover:tw-text-white tw-cursor-pointer tw-transform tw-translate-x-12 group-hover:tw-translate-x-0">
                          <BsCart />
                        </button>
                      </div>
                    </div>

                    <div className="tw-p-5 tw-grid tw-grid-rows-[auto_1fr_auto]">
                      <Link
                        to={`/products/${product._id}`}
                        className="tw-uppercase tw-text-red-500 tw-font-medium tw-text-base"
                        onClick={() => {
                          window.scrollTo(0, 0);
                        }}
                      >
                        {product?.typeChildName}
                      </Link>

                      <Link
                        to={`/products/${product._id}`}
                        className="tw-inline-block tw-py-2"
                        onClick={() => {
                          window.scrollTo(0, 0);
                        }}
                      >
                        <h3 className="tw-text-gray-600 tw-text-sm">
                          {product.title}
                        </h3>
                      </Link>

                      <div className="price-box">
                        <p className="tw-font-semibold tw-text-xl tw-mb-0">
                          {formatMoney(product.price)}₫
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Spin>
        </div>
      </div>

      {/* Chăm sóc sức khoẻ */}
      <div className="tw-py-10">
        <div class="tw-px-4 sm:tw-px-6 sm:tw-flex sm:tw-items-center sm:tw-justify-between lg:tw-px-8 xl:tw-px-0">
          <h2
            id="category-heading"
            class="tw-text-2xl tw-font-semibold tw-tracking-tight tw-text-gray-900"
          >
            Chăm sóc sức khoẻ
          </h2>
          <a
            href="#"
            class="tw-hidden tw-text-sm tw-font-semibold tw-text-indigo-600 hover:tw-text-indigo-500 sm:tw-block"
          >
            Xem tất cả sản phẩm<span aria-hidden="true"> →</span>
          </a>
        </div>

        <div className="tw-relative">
          <Spin spinning={isLoadingCssk}>
            <div className="tw-grid tw-grid-cols-2 sm:tw-grid-cols-3 lg:tw-grid-cols-5 md:tw-grid-cols-4 tw-gap-6">
              {dataCssk?.data?.map((product) => {
                return (
                  <div
                    className="tw-group tw-grid tw-grid-rows-[1fr_2fr] tw-border tw-border-gray-200 tw-border-solid tw-rounded-lg hover:tw-shadow-xl tw-overflow-hidden tw-transition-all tw-duration-200 tw-ease-in-out"
                    key={product._id}
                  >
                    <div className="tw-relative tw-p-5">
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

                      <div className="tw-absolute tw-top-2 tw-right-2 tw-text-xl tw-transition-all tw-duration-200 tw-ease-in-out tw-z-10">
                        <button className="tw-h-8 tw-w-8 tw-flex tw-items-center tw-justify-center tw-rounded-lg tw-border-solid tw-border tw-border-gray-200 tw-bg-white tw-shadow-md focus:tw-outline-none hover:tw-bg-red-500 focus:tw-bg-red-700 focus:tw-text-white hover:tw-text-white tw-cursor-pointer tw-transform tw-translate-x-12 group-hover:tw-translate-x-0">
                          <BsCart />
                        </button>
                      </div>
                    </div>

                    <div className="tw-p-5 tw-grid tw-grid-rows-[auto_1fr_auto]">
                      <Link
                        to={`/products/${product._id}`}
                        className="tw-uppercase tw-text-red-500 tw-font-medium tw-text-base"
                        onClick={() => {
                          window.scrollTo(0, 0);
                        }}
                      >
                        {product?.typeChildName}
                      </Link>

                      <Link
                        to={`/products/${product._id}`}
                        className="tw-inline-block tw-py-2"
                        onClick={() => {
                          window.scrollTo(0, 0);
                        }}
                      >
                        <h3 className="tw-text-gray-600 tw-text-sm">
                          {product.title}
                        </h3>
                      </Link>

                      <div className="price-box">
                        <p className="tw-font-semibold tw-text-xl tw-mb-0">
                          {formatMoney(product.price)}₫
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Spin>
        </div>
      </div>

      {/* Trang điểm */}
      <div className="tw-py-10">
        <div class="tw-px-4 sm:tw-px-6 sm:tw-flex sm:tw-items-center sm:tw-justify-between lg:tw-px-8 xl:tw-px-0">
          <h2
            id="category-heading"
            class="tw-text-2xl tw-font-semibold tw-tracking-tight tw-text-gray-900"
          >
            Trang điểm
          </h2>
          <a
            href="#"
            class="tw-hidden tw-text-sm tw-font-semibold tw-text-indigo-600 hover:tw-text-indigo-500 sm:tw-block"
          >
            Xem tất cả sản phẩm<span aria-hidden="true"> →</span>
          </a>
        </div>

        <div className="tw-relative">
          <Spin spinning={isLoadingTd}>
            <div className="tw-grid tw-grid-cols-2 sm:tw-grid-cols-3 lg:tw-grid-cols-5 md:tw-grid-cols-4 tw-gap-6">
              {dataTd?.data?.map((product) => {
                return (
                  <div
                    className="tw-group tw-grid tw-grid-rows-[1fr_2fr] tw-border tw-border-gray-200 tw-border-solid tw-rounded-lg hover:tw-shadow-xl tw-overflow-hidden tw-transition-all tw-duration-200 tw-ease-in-out"
                    key={product._id}
                  >
                    <div className="tw-relative tw-p-5">
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

                      <div className="tw-absolute tw-top-2 tw-right-2 tw-text-xl tw-transition-all tw-duration-200 tw-ease-in-out tw-z-10">
                        <button className="tw-h-8 tw-w-8 tw-flex tw-items-center tw-justify-center tw-rounded-lg tw-border-solid tw-border tw-border-gray-200 tw-bg-white tw-shadow-md focus:tw-outline-none hover:tw-bg-red-500 focus:tw-bg-red-700 focus:tw-text-white hover:tw-text-white tw-cursor-pointer tw-transform tw-translate-x-12 group-hover:tw-translate-x-0">
                          <BsCart />
                        </button>
                      </div>
                    </div>

                    <div className="tw-p-5 tw-grid tw-grid-rows-[auto_1fr_auto]">
                      <Link
                        to={`/products/${product._id}`}
                        className="tw-uppercase tw-text-red-500 tw-font-medium tw-text-base"
                        onClick={() => {
                          window.scrollTo(0, 0);
                        }}
                      >
                        {product?.typeChildName}
                      </Link>

                      <Link
                        to={`/products/${product._id}`}
                        className="tw-inline-block tw-py-2"
                        onClick={() => {
                          window.scrollTo(0, 0);
                        }}
                      >
                        <h3 className="tw-text-gray-600 tw-text-sm">
                          {product.title}
                        </h3>
                      </Link>

                      <div className="price-box">
                        <p className="tw-font-semibold tw-text-xl tw-mb-0">
                          {formatMoney(product.price)}₫
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Spin>
        </div>
      </div>

      {/* Chăm sóc da mặt */}
      <div className="tw-py-10">
        <div class="tw-px-4 sm:tw-px-6 sm:tw-flex sm:tw-items-center sm:tw-justify-between lg:tw-px-8 xl:tw-px-0">
          <h2
            id="category-heading"
            class="tw-text-2xl tw-font-semibold tw-tracking-tight tw-text-gray-900"
          >
            Chăm sóc da mặt
          </h2>
          <a
            href="#"
            class="tw-hidden tw-text-sm tw-font-semibold tw-text-indigo-600 hover:tw-text-indigo-500 sm:tw-block"
          >
            Xem tất cả sản phẩm<span aria-hidden="true"> →</span>
          </a>
        </div>

        <div className="tw-relative">
          <Spin spinning={isLoadingCsdm}>
            <div className="tw-grid tw-grid-cols-2 sm:tw-grid-cols-3 lg:tw-grid-cols-5 md:tw-grid-cols-4 tw-gap-6">
              {dataCsdm?.data?.map((product) => {
                return (
                  <div
                    className="tw-group tw-grid tw-grid-rows-[1fr_2fr] tw-border tw-border-gray-200 tw-border-solid tw-rounded-lg hover:tw-shadow-xl tw-overflow-hidden tw-transition-all tw-duration-200 tw-ease-in-out"
                    key={product._id}
                  >
                    <div className="tw-relative tw-p-5">
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

                      <div className="tw-absolute tw-top-2 tw-right-2 tw-text-xl tw-transition-all tw-duration-200 tw-ease-in-out tw-z-10">
                        <button className="tw-h-8 tw-w-8 tw-flex tw-items-center tw-justify-center tw-rounded-lg tw-border-solid tw-border tw-border-gray-200 tw-bg-white tw-shadow-md focus:tw-outline-none hover:tw-bg-red-500 focus:tw-bg-red-700 focus:tw-text-white hover:tw-text-white tw-cursor-pointer tw-transform tw-translate-x-12 group-hover:tw-translate-x-0">
                          <BsCart />
                        </button>
                      </div>
                    </div>

                    <div className="tw-p-5 tw-grid tw-grid-rows-[auto_1fr_auto]">
                      <Link
                        to={`/products/${product._id}`}
                        className="tw-uppercase tw-text-red-500 tw-font-medium tw-text-base"
                        onClick={() => {
                          window.scrollTo(0, 0);
                        }}
                      >
                        {product?.typeChildName}
                      </Link>

                      <Link
                        to={`/products/${product._id}`}
                        className="tw-inline-block tw-py-2"
                        onClick={() => {
                          window.scrollTo(0, 0);
                        }}
                      >
                        <h3 className="tw-text-gray-600 tw-text-sm">
                          {product.title}
                        </h3>
                      </Link>

                      <div className="price-box">
                        <p className="tw-font-semibold tw-text-xl tw-mb-0">
                          {formatMoney(product.price)}₫
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Spin>
        </div>
      </div>

      {/* Chăm sóc cơ thể */}
      <div className="tw-py-10">
        <div class="tw-px-4 sm:tw-px-6 sm:tw-flex sm:tw-items-center sm:tw-justify-between lg:tw-px-8 xl:tw-px-0">
          <h2
            id="category-heading"
            class="tw-text-2xl tw-font-semibold tw-tracking-tight tw-text-gray-900"
          >
            Chăm sóc cơ thể
          </h2>
          <a
            href="#"
            class="tw-hidden tw-text-sm tw-font-semibold tw-text-indigo-600 hover:tw-text-indigo-500 sm:tw-block"
          >
            Xem tất cả sản phẩm<span aria-hidden="true"> →</span>
          </a>
        </div>

        <div className="tw-relative">
          <Spin spinning={isLoadingCsct}>
            <div className="tw-grid tw-grid-cols-2 sm:tw-grid-cols-3 lg:tw-grid-cols-5 md:tw-grid-cols-4 tw-gap-6">
              {dataCsct?.data?.map((product) => {
                return (
                  <div
                    className="tw-group tw-grid tw-grid-rows-[1fr_2fr] tw-border tw-border-gray-200 tw-border-solid tw-rounded-lg hover:tw-shadow-xl tw-overflow-hidden tw-transition-all tw-duration-200 tw-ease-in-out"
                    key={product._id}
                  >
                    <div className="tw-relative tw-p-5">
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

                      <div className="tw-absolute tw-top-2 tw-right-2 tw-text-xl tw-transition-all tw-duration-200 tw-ease-in-out tw-z-10">
                        <button className="tw-h-8 tw-w-8 tw-flex tw-items-center tw-justify-center tw-rounded-lg tw-border-solid tw-border tw-border-gray-200 tw-bg-white tw-shadow-md focus:tw-outline-none hover:tw-bg-red-500 focus:tw-bg-red-700 focus:tw-text-white hover:tw-text-white tw-cursor-pointer tw-transform tw-translate-x-12 group-hover:tw-translate-x-0">
                          <BsCart />
                        </button>
                      </div>
                    </div>

                    <div className="tw-p-5 tw-grid tw-grid-rows-[auto_1fr_auto]">
                      <Link
                        to={`/products/${product._id}`}
                        className="tw-uppercase tw-text-red-500 tw-font-medium tw-text-base"
                        onClick={() => {
                          window.scrollTo(0, 0);
                        }}
                      >
                        {product?.typeChildName}
                      </Link>

                      <Link
                        to={`/products/${product._id}`}
                        className="tw-inline-block tw-py-2"
                        onClick={() => {
                          window.scrollTo(0, 0);
                        }}
                      >
                        <h3 className="tw-text-gray-600 tw-text-sm">
                          {product.title}
                        </h3>
                      </Link>

                      <div className="price-box">
                        <p className="tw-font-semibold tw-text-xl tw-mb-0">
                          {formatMoney(product.price)}₫
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Spin>
        </div>
      </div>

      {/* Mẹ và bé */}
      <div className="tw-py-10">
        <div class="tw-px-4 sm:tw-px-6 sm:tw-flex sm:tw-items-center sm:tw-justify-between lg:tw-px-8 xl:tw-px-0">
          <h2
            id="category-heading"
            class="tw-text-2xl tw-font-semibold tw-tracking-tight tw-text-gray-900"
          >
            Mẹ và bé
          </h2>
          <a
            href="#"
            class="tw-hidden tw-text-sm tw-font-semibold tw-text-indigo-600 hover:tw-text-indigo-500 sm:tw-block"
          >
            Xem tất cả sản phẩm<span aria-hidden="true"> →</span>
          </a>
        </div>

        <div className="tw-relative">
          <Spin spinning={isLoadingMvb}>
            <div className="tw-grid tw-grid-cols-2 sm:tw-grid-cols-3 lg:tw-grid-cols-5 md:tw-grid-cols-4 tw-gap-6 tw-grid-rows-2">
              {dataMvb?.data?.map((product) => {
                return (
                  <div
                    className="tw-group tw-grid tw-grid-rows-[1fr_2fr] tw-border tw-border-gray-200 tw-border-solid tw-rounded-lg hover:tw-shadow-xl tw-overflow-hidden tw-transition-all tw-duration-200 tw-ease-in-out"
                    key={product._id}
                  >
                    <div className="tw-relative tw-p-5">
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

                      <div className="tw-absolute tw-top-2 tw-right-2 tw-text-xl tw-transition-all tw-duration-200 tw-ease-in-out tw-z-10">
                        <button className="tw-h-8 tw-w-8 tw-flex tw-items-center tw-justify-center tw-rounded-lg tw-border-solid tw-border tw-border-gray-200 tw-bg-white tw-shadow-md focus:tw-outline-none hover:tw-bg-red-500 focus:tw-bg-red-700 focus:tw-text-white hover:tw-text-white tw-cursor-pointer tw-transform tw-translate-x-12 group-hover:tw-translate-x-0">
                          <BsCart />
                        </button>
                      </div>
                    </div>

                    <div className="tw-p-5 tw-grid tw-grid-rows-[auto_1fr_auto]">
                      <Link
                        to={`/products/${product._id}`}
                        className="tw-uppercase tw-text-red-500 tw-font-medium tw-text-base"
                        onClick={() => {
                          window.scrollTo(0, 0);
                        }}
                      >
                        {product?.typeChildName}
                      </Link>

                      <Link
                        to={`/products/${product._id}`}
                        className="tw-inline-block tw-py-2"
                        onClick={() => {
                          window.scrollTo(0, 0);
                        }}
                      >
                        <h3 className="tw-text-gray-600 tw-text-sm">
                          {product.title}
                        </h3>
                      </Link>

                      <div className="price-box">
                        <p className="tw-font-semibold tw-text-xl tw-mb-0">
                          {formatMoney(product.price)}₫
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Spin>
        </div>
      </div>

      {/* Thực phẩm Nhật Bản */}
      <div className="tw-py-10">
        <div class="tw-px-4 sm:tw-px-6 sm:tw-flex sm:tw-items-center sm:tw-justify-between lg:tw-px-8 xl:tw-px-0">
          <h2
            id="category-heading"
            class="tw-text-2xl tw-font-semibold tw-tracking-tight tw-text-gray-900"
          >
            Thực phẩm Nhật Bản
          </h2>
          <a
            href="#"
            class="tw-hidden tw-text-sm tw-font-semibold tw-text-indigo-600 hover:tw-text-indigo-500 sm:tw-block"
          >
            Xem tất cả sản phẩm<span aria-hidden="true"> →</span>
          </a>
        </div>

        <div className="tw-relative">
          <Spin spinning={isLoadingTpnb}>
            <div className="tw-grid tw-grid-cols-2 sm:tw-grid-cols-3 lg:tw-grid-cols-5 md:tw-grid-cols-4 tw-gap-6 tw-grid-rows-2">
              {dataTpnb?.data?.map((product) => {
                return (
                  <div
                    className="tw-group tw-grid tw-grid-rows-[1fr_2fr] tw-border tw-border-gray-200 tw-border-solid tw-rounded-lg hover:tw-shadow-xl tw-overflow-hidden tw-transition-all tw-duration-200 tw-ease-in-out"
                    key={product._id}
                  >
                    <div className="tw-relative tw-p-5">
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

                      <div className="tw-absolute tw-top-2 tw-right-2 tw-text-xl tw-transition-all tw-duration-200 tw-ease-in-out tw-z-10">
                        <button className="tw-h-8 tw-w-8 tw-flex tw-items-center tw-justify-center tw-rounded-lg tw-border-solid tw-border tw-border-gray-200 tw-bg-white tw-shadow-md focus:tw-outline-none hover:tw-bg-red-500 focus:tw-bg-red-700 focus:tw-text-white hover:tw-text-white tw-cursor-pointer tw-transform tw-translate-x-12 group-hover:tw-translate-x-0">
                          <BsCart />
                        </button>
                      </div>
                    </div>

                    <div className="tw-p-5 tw-grid tw-grid-rows-[auto_1fr_auto]">
                      <Link
                        to={`/products/${product._id}`}
                        className="tw-uppercase tw-text-red-500 tw-font-medium tw-text-base"
                        onClick={() => {
                          window.scrollTo(0, 0);
                        }}
                      >
                        {product?.typeChildName}
                      </Link>

                      <Link
                        to={`/products/${product._id}`}
                        className="tw-inline-block tw-py-2"
                        onClick={() => {
                          window.scrollTo(0, 0);
                        }}
                      >
                        <h3 className="tw-text-gray-600 tw-text-sm">
                          {product.title}
                        </h3>
                      </Link>

                      <div className="price-box">
                        <p className="tw-font-semibold tw-text-xl tw-mb-0">
                          {formatMoney(product.price)}₫
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default Categories;
