import React from "react";
import { FaBars } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { formatMoney } from "../utils/commonFunction";
import { Breadcrumb, Spin, Pagination } from "antd";
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
    <section className="tw-mx-auto tw-max-w-7xl tw-mt-4">
      <div className="container">
        <div className="row mb-4">
          {data?.data[0]?.typeParentName && (
            <div className="col-lg-12">
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Link to="/">Trang chủ</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link to="/products">{data?.data[0]?.typeParentName}</Link>
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
          )}
        </div>
        <div className="tw-relative tw-pt-5 tw-pb-16">
          <Spin spinning={isLoading}>
            <div className="tw-grid tw-grid-cols-2 sm:tw-grid-cols-3 lg:tw-grid-cols-5 md:tw-grid-cols-4 tw-gap-6 tw-mb-6">
              {data?.data?.map((product) => {
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
            {data && (
              <div className="tw-float-right">
                <Pagination
                  current={data.currentPage}
                  hideOnSinglePage={true}
                  total={data.total}
                  pageSize={data.pageSize}
                  onChange={onChangePagination}
                  showTotal={(total, range) =>
                    `${range[0]}-${range[1]} của ${total} sản phẩm`
                  }
                />
              </div>
            )}
          </Spin>
        </div>
      </div>
    </section>
  );
};

export default Products;
