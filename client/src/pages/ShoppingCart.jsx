import React from "react";
import { Tag, InputNumber, Divider, Spin, Input, Button } from "antd";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { formatMoney } from "../utils/commonFunction";
import { removeFromCart, updateToCart } from "../redux/actions/cart";
import { FaTimes } from "react-icons/fa";

const products = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    price: "$32.00",
    color: "Sienna",
    inStock: true,
    size: "Large",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in sienna.",
  },
  {
    id: 2,
    name: "Basic Tee",
    href: "#",
    price: "$32.00",
    color: "Black",
    inStock: false,
    leadTime: "3–4 weeks",
    size: "Large",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
  },
  {
    id: 3,
    name: "Nomad Tumbler",
    href: "#",
    price: "$35.00",
    color: "White",
    inStock: true,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-03.jpg",
    imageAlt: "Insulated bottle with white base and black snap lid.",
  },
];

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const getCartSubTotal = () => {
    return cartItems.reduce(
      (price, item) => item.price * item.quantity + price,
      0
    );
  };

  const updateCart = (productId, type, value) => {
    dispatch(updateToCart(productId, value, type));
  };

  return (
    <div className="tw-bg-white">
      <div className="tw-max-w-2xl tw-mx-auto tw-pt-10 tw-pb-24 tw-px-4 md:tw-px-6 lg:tw-px-0 lg:tw-max-w-7xl">
        <h1 className="tw-text-3xl tw-font-extrabold tw-racking-tight tw-text-gray-900 sm:tw-text-4xl">
          Giỏ hàng của bạn
        </h1>
        <form className="tw-mt-12 lg:tw-grid lg:tw-grid-cols-12 lg:tw-gap-x-12 lg:tw-items-start xl:tw-gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:tw-col-span-7">
            <ul
              role="list"
              className="tw-divide-y tw-divide-gray-200"
              style={{
                borderTop: "1px solid #bdbdbd",
                borderBottom: "1px solid #bdbdbd",
              }}
            >
              {cartItems.map((product, productIdx) => (
                <li key={product._id} className="tw-flex tw-py-6 sm:tw-py-10">
                  <div className="tw-flex-shrink-0">
                    <img
                      src={product.productImage}
                      alt={product.sku}
                      className="tw-w-24 tw-h-24 tw-rounded-md tw-object-center tw-object-cover sm:tw-w-48 sm:tw-h-48"
                    />
                  </div>

                  <div className="tw-ml-4 tw-flex-1 tw-flex tw-flex-col tw-justify-between sm:tw-ml-6">
                    <div className="tw-relative tw-pr-9 sm:tw-grid sm:tw-grid-cols-2 sm:tw-gap-x-6 sm:tw-pr-0">
                      <div>
                        <div className="tw-flex tw-justify-between">
                          <h3 className="tw-text-sm">
                            <a
                              href={product?.href}
                              className="tw-font-medium tw-text-gray-500 hover:tw-text-gray-600"
                            >
                              {product.title}
                            </a>
                          </h3>
                        </div>
                        <p className="tw-mt-1 tw-text-base tw-font-medium tw-text-gray-900">
                          {product.price}₫
                        </p>
                      </div>

                      <div className="tw-mt-4 sm:tw-mt-0 sm:tw-pr-9">
                        <Input.Group
                          compact
                          className="tw-w-[150px] tw-flex tw-gap-[1px]"
                        >
                          <Button
                            disabled={product.quantity < 2}
                            onClick={() =>
                              updateCart(product.productId, "minus")
                            }
                          >
                            -
                          </Button>
                          <InputNumber
                            controls={false}
                            min={1}
                            value={product.quantity}
                            defaultValue={product.quantity}
                            formatter={(value) =>
                              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }
                            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                            onChange={(value) =>
                              updateCart(record.productId, null, value)
                            }
                          />
                          <Button
                            onClick={() =>
                              updateCart(product.productId, "plus")
                            }
                          >
                            +
                          </Button>
                        </Input.Group>

                        <div className="tw-absolute tw-top-0 tw-right-0">
                          <button
                            type="button"
                            className="tw--m-2 tw-p-2 tw-inline-flex tw-text-gray-300 hover:tw-text-gray-400 tw-bg-transparent tw-border-none tw-cursor-pointer"
                          >
                            <span className="tw-sr-only">Remove</span>
                            <FaTimes
                              className="tw-h-5 tw-w-5"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="tw-mt-16 tw-bg-gray-50 tw-rounded-lg tw-px-4 tw-py-6 sm:tw-p-6 lg:tw-p-8 lg:tw-mt-0 lg:tw-col-span-5"
          >
            <h2
              id="summary-heading"
              className="tw-text-lg tw-font-medium tw-text-gray-900"
            >
              Thông tin hoá đơn
            </h2>

            <div className="tw-border-t tw-border-gray-200 tw-pt-4 tw-flex tw-items-center tw-justify-between">
              <dt className="tw-text-base tw-font-medium tw-text-gray-900">
                Tổng cộng:
              </dt>
              <dd className="tw-text-base tw-font-medium tw-text-gray-900">
                {formatMoney(getCartSubTotal())}₫
              </dd>
            </div>

            <div className="tw-mt-6">
              <button
                type="submit"
                className="tw-w-full tw-bg-[#df2027] tw-border tw-border-transparent tw-rounded-md tw-shadow-sm tw-py-3 px-4 tw-text-base tw-font-medium tw-text-white focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-offset-gray-50 focus:tw-ring-red-500 tw-cursor-pointer"
              >
                Đi tới thanh toán
              </button>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
};

export default ShoppingCart;
