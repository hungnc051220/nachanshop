import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { formatMoney } from "../utils/commonFunction";
import { addToCart } from "../redux/actions/cart";
import Button from "@mui/material/Button";
import { useProduct } from "../hooks/useProductsData";
import Rating from "@mui/material/Rating";
import { AiOutlineShopping } from "react-icons/ai";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [indexImage, setIndexImage] = useState(0);

  const { isLoading, data } = useProduct(id);

  const addToCartHandler = () => {
    dispatch(addToCart(data._id, Number(quantity)));
  };

  return (
    <section className="mx-auto mt-4 mb-20 max-w-7xl">
      {data && (
        <>
          <div className="mb-16 grid grid-cols-2 gap-5">
            <div>
              <div>
                <img
                  className="mx-auto h-[600px] w-[600px] rounded-2xl shadow-lg transition duration-300 ease-in-out"
                  src={`${import.meta.env.VITE_API_URL}/${
                    data.productImage[indexImage]
                  }`}
                  alt={data.title}
                />
              </div>
              <div className="mt-3 ml-3 flex gap-4">
                {data.productImage.map((image, index) => (
                  <div className="pointer rounded-lg border border-gray-200 p-1">
                    <img
                      key={index}
                      className="h-20 w-20 cursor-pointer"
                      src={`${import.meta.env.VITE_API_URL}/${image}`}
                      alt={data.title}
                      onMouseOver={() => setIndexImage(index)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="px-16 pb-12">
              <h3 className="mt-4 mb-2 text-4xl font-semibold">{data.title}</h3>
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
          <div className="row mt-4">
            <div className="col-12">
              <div
                className="description mt-4"
                dangerouslySetInnerHTML={{ __html: data.description }}
              ></div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default ProductDetail;
