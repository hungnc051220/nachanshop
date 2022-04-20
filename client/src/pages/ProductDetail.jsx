import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { formatMoney } from "../utils/commonFunction";
import { addToCart } from "../redux/actions/cart";
import { BsCart } from "react-icons/bs";
import { useProduct } from "../hooks/useProductsData";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const { isLoading, data } = useProduct(id);

  const addToCartHandler = () => {
    dispatch(addToCart(data._id, Number(quantity)));
  };

  return (
    <section className="mx-auto mt-4 mb-20 max-w-7xl">
      {data && (
        <>
          <div className="mb-16 grid grid-cols-2 gap-5">
            <div className="rounded-lg p-3 text-center shadow-lg">
              <img
                className="w-100 mx-auto"
                src={import.meta.env.VITE_API_URL + data.productImage}
                alt={data.title}
              />
            </div>
            <div className="mx-auto px-16 py-12">
              <h3 className="mt-4 text-3xl font-medium">{data.title}</h3>
              <h4 className="mb-2 mt-3 text-2xl text-red-500">
                {formatMoney(data.price)}đ
              </h4>

              <div className="mt-4">
                <h5 className="mb-2 text-xl">Số lượng</h5>
              </div>
              <div className="mt-6 flex space-x-4"></div>
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
