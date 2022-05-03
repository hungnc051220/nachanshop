import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { formatMoney } from "../utils/commonFunction";
import {
  removeFromCart,
  increaseCart,
  decreaseCart,
} from "../features/cart/cartSlice";
import { ArrowLeftIcon, ArrowSmRightIcon, XIcon } from "@heroicons/react/solid";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Button from "@mui/material/Button";

const ShoppingCart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, total } = useSelector((state) => state.cart);

  return (
    <div className="mx-auto max-w-2xl px-4 pt-10 pb-24 md:px-6 lg:max-w-7xl lg:px-0 ">
      <div className="rounded-lg bg-white p-10 shadow">
        <h1 className="racking-tight text-2xl font-extrabold text-gray-900">
          Giỏ hàng của bạn
        </h1>
        <form className="mt-6 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section
            aria-labelledby="cart-heading"
            className={
              cartItems.length === 0 ? "lg:col-span-12" : "lg:col-span-7"
            }
          >
            {cartItems.length > 0 ? (
              <ul
                role="list"
                className="divide-y divide-gray-200"
                style={{
                  borderTop: "1px solid rgb(229 231 235)",
                  borderBottom: "1px solid rgb(229 231 235)",
                }}
              >
                {cartItems.map((product) => (
                  <li key={product._id} className="relative flex py-6 sm:py-6">
                    <div
                      className="absolute top-4 right-4 z-10 cursor-pointer"
                      onClick={() => dispatch(removeFromCart(product._id))}
                    >
                      <XIcon
                        className="h-5 w-5 text-gray-500"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="flex-shrink-0">
                      <img
                        src={`${import.meta.env.VITE_API_URL}/${
                          product.productImage[0]
                        }`}
                        alt={product.name}
                        className="h-10 w-10 rounded-md object-cover object-center sm:h-20 sm:w-20"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm">
                              <Link
                                to={`/products/${product._id}`}
                                className="font-medium text-gray-500 hover:text-gray-600"
                              >
                                {product.name}
                              </Link>
                            </h3>
                          </div>
                          <p className="mt-1 text-base font-medium text-gray-900">
                            {formatMoney(product.price)}₫
                          </p>
                        </div>

                        <div className="mt-4 sm:mt-0 sm:pr-9">
                          <div className="flex items-center">
                            <button
                              type="button"
                              className="h-8 w-8 border border-gray-200"
                              disabled={product.quantity === 1}
                              onClick={() =>
                                dispatch(decreaseCart(product._id))
                              }
                            >
                              -
                            </button>
                            <input
                              value={product.quantity}
                              className="h-8 w-12 border-y border-gray-200 text-center focus:outline-none"
                              min={1}
                              readOnly
                            />
                            <button
                              type="button"
                              className="h-8 w-8 border border-gray-200"
                              onClick={() =>
                                dispatch(increaseCart(product._id))
                              }
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center p-20">
                <AiOutlineShoppingCart className="h-16 w-16" />
                <p className="mt-6">
                  Bạn chưa có sản phẩm nào trong giỏ hàng. Vui lòng quay lại
                  chọn thêm sản phẩm.
                </p>
              </div>
            )}

            <Link
              to="/"
              className="inline-flex items-center gap-2 pt-10 text-sm text-indigo-500 hover:font-medium"
            >
              <ArrowLeftIcon className="h-4 w-4" /> Tiếp tục mua hàng
            </Link>
          </section>

          {/* Order summary */}
          {cartItems.length > 0 && (
            <section
              aria-labelledby="summary-heading"
              className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
            >
              <h2
                id="summary-heading"
                className="text-lg font-medium text-gray-900"
              >
                Thông tin hoá đơn
              </h2>

              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-gray-600">Tổng tiền hàng</dt>
                  <dd className="font-medium text-gray-900">
                    {formatMoney(total)}₫
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-gray-600">Phí vận chuyển</dt>
                  <dd className="font-medium text-gray-900">
                    {total > 999999 ? "Miễn phí" : "30,000₫"}
                  </dd>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-base font-medium text-gray-900">
                    Tổng cộng:
                  </dt>
                  <dd className="text-base font-medium text-gray-900">
                    {total > 999999
                      ? formatMoney(total)
                      : formatMoney(total + 30000)}
                    ₫
                  </dd>
                </div>
              </dl>
              <div className="mt-6">
                <Button
                  variant="contained"
                  color="error"
                  size="large"
                  fullWidth
                  endIcon={<ArrowSmRightIcon className="h-5 w-5" />}
                  onClick={() => navigate("/checkout")}
                >
                  Đi tới thanh toán
                </Button>
              </div>
            </section>
          )}
        </form>
      </div>
    </div>
  );
};

export default ShoppingCart;
