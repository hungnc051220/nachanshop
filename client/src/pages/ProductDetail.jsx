import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { formatMoney } from "../utils/commonFunction";
import { addToCart } from "../features/cart/cartSlice";
import Button from "@mui/material/Button";
import { useProduct, useProducts } from "../hooks/useProductsData";
import Rating from "@mui/material/Rating";
import { AiOutlineShopping } from "react-icons/ai";
import Slider from "react-slick";
import { Breadcrumbs } from "../components";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [indexImage, setIndexImage] = useState(0);

  const { isLoading, data } = useProduct(id);
  const { data: dataProduct } = useProducts();
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    pauseOnHover: true,
    accessibility: true,
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...data, quantity: Number(quantity) }));
  };

  return (
    <section className="mx-auto max-w-7xl pb-20">
      <div className="py-2">
        <Breadcrumbs />
      </div>
      {data && (
        <>
          <div className="mb-6 grid grid-cols-2 gap-5 rounded-2xl bg-white p-10 shadow">
            <div className="py-5">
              <img
                className="mx-auto h-[500px] w-[500px] rounded-2xl object-cover object-center shadow transition duration-300 ease-in-out"
                src={`${import.meta.env.VITE_API_URL}/${
                  data.productImage[indexImage]
                }`}
                alt={data.name}
              />
              <div className="mt-4 ml-16 flex gap-4">
                {data.productImage.map((image, index) => (
                  <img
                    key={index}
                    className="h-20 w-20 cursor-pointer rounded-lg object-cover object-center shadow"
                    src={`${import.meta.env.VITE_API_URL}/${image}`}
                    alt={data.name}
                    onMouseOver={() => setIndexImage(index)}
                  />
                ))}
              </div>
            </div>
            <div className="pr-16 pb-12">
              <h3 className="mt-4 mb-2 text-4xl font-semibold">{data.name}</h3>
              <Rating name="read-only" value={5} readOnly />
              <h4 className="mb-2 mt-6 text-3xl font-medium text-red-500">
                {formatMoney(data.price)}₫
              </h4>
              <div className="mt-20 flex items-center">
                <h5 className="mr-3 text-xl">Số lượng</h5>
                <button
                  type="button"
                  className="h-8 w-8 border border-gray-200"
                  onClick={() => setQuantity(quantity - 1)}
                  disabled={quantity === 1}
                >
                  -
                </button>
                <input
                  value={quantity}
                  className="h-8 w-12 border-y border-gray-200 text-center focus:outline-none"
                  min={1}
                  readOnly
                />
                <button
                  type="button"
                  className="h-8 w-8 border border-gray-200"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
              <div className="mt-10 flex items-center space-x-4">
                <Button
                  variant="outlined"
                  color="error"
                  size="large"
                  startIcon={<AiOutlineShopping />}
                  onClick={addToCartHandler}
                >
                  Thêm vào giỏ hàng
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="large"
                  onClick={() => {
                    addToCartHandler();
                    navigate("/shopping-cart");
                  }}
                >
                  Mua ngay
                </Button>
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-white p-8 shadow">
            <div>
              <h1 className="mb-10 text-center text-2xl font-semibold">
                Mô tả sản phẩm
              </h1>
              <div
                className=""
                dangerouslySetInnerHTML={{ __html: data.description }}
              ></div>
            </div>
          </div>
        </>
      )}

      <div className="mt-10 rounded-lg bg-white p-8 shadow">
        <h2 className="mb-2 text-xl font-semibold">Các sản phẩm liên quan</h2>
        <Slider {...settings}>
          {dataProduct &&
            dataProduct.data.map((product) => (
              <div className="p-2" key={product._id}>
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
                      />
                    </Link>
                  </div>

                  <div className="p-5">
                    <Link
                      to={`/products/${product._id}`}
                      className="inline-block h-14 py-2"
                      onClick={() => {
                        window.scrollTo(0, 0);
                      }}
                    >
                      <h3 className="text-sm text-gray-600">{product.title}</h3>
                    </Link>

                    <div className="flex flex-col gap-2">
                      <p className="mb-0 text-xl font-semibold">
                        {formatMoney(product.price)}₫
                      </p>
                      <Button variant="contained" color="error" size="small">
                        Đặt mua
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </section>
  );
};

export default ProductDetail;
