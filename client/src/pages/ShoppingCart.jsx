import React from "react";
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
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pt-10 pb-24 md:px-6 lg:max-w-7xl lg:px-0">
        <h1 className="racking-tight text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Giỏ hàng của bạn
        </h1>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <ul
              role="list"
              className="divide-y divide-gray-200"
              style={{
                borderTop: "1px solid rgb(229 231 235)",
                borderBottom: "1px solid rgb(229 231 235)",
              }}
            >
              {cartItems.map((product) => (
                <li key={product._id} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <img
                      src={`${import.meta.env.VITE_API_URL}/${
                        product.productImage[0]
                      }`}
                      alt={product.sku}
                      className="h-10 w-10 rounded-md object-cover object-center sm:h-20 sm:w-20"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm">
                            <a
                              href={product?.href}
                              className="font-medium text-gray-500 hover:text-gray-600"
                            >
                              {product.title}
                            </a>
                          </h3>
                        </div>
                        <p className="mt-1 text-base font-medium text-gray-900">
                          {formatMoney(product.price)}₫
                        </p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <div className="absolute top-0 right-0">
                          <button
                            type="button"
                            className="-m-2 inline-flex cursor-pointer border-none bg-transparent p-2 text-gray-300 hover:text-gray-400"
                            onClick={() =>
                              dispatch(removeFromCart(product._id))
                            }
                          >
                            <FaTimes className="h-5 w-5" aria-hidden="true" />
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
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2
              id="summary-heading"
              className="text-lg font-medium text-gray-900"
            >
              Thông tin hoá đơn
            </h2>

            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="text-base font-medium text-gray-900">
                Tổng cộng:
              </dt>
              <dd className="text-base font-medium text-gray-900">
                {formatMoney(getCartSubTotal())}₫
              </dd>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full cursor-pointer rounded-md border border-transparent bg-[#df2027] px-4 py-3 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-50"
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
