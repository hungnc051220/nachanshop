import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { formatMoney } from "../utils/commonFunction";
import { Tag, InputNumber, Divider, Spin, Input, Button } from "antd";
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
    <section className="tw-mx-auto tw-max-w-7xl tw-mt-4 tw-mb-20">
      <Spin spinning={isLoading}>
        {data && (
          <>
            <div className="tw-grid tw-grid-cols-2 tw-gap-5 tw-mb-16">
              <div className="tw-text-center tw-rounded-lg tw-shadow-lg tw-p-3">
                <img
                  className="w-100 mx-auto"
                  src={import.meta.env.VITE_API_URL + data.productImage}
                  alt={data.title}
                />
              </div>
              <div className="tw-mx-auto tw-px-16 tw-py-12">
                <h3 className="tw-mt-4 tw-text-3xl tw-font-medium">
                  {data.title}
                </h3>
                <h4 className="tw-mb-2 tw-text-red-500 tw-text-2xl tw-mt-3">
                  {formatMoney(data.price)}đ
                </h4>

                <Tag color={data.status === 1 ? "green" : "red"}>
                  {data.status === 1 ? "CÒN HÀNG" : "HẾT HÀNG"}
                </Tag>

                <div className="tw-mt-4">
                  <h5 className="tw-mb-2 tw-text-xl">Số lượng</h5>
                  <Input.Group
                    compact
                    className="tw-w-[150px] tw-flex tw-gap-[1px]"
                  >
                    <Button
                      disabled={quantity < 2}
                      onClick={() => setQuantity(quantity - 1)}
                    >
                      -
                    </Button>
                    <InputNumber
                      controls={false}
                      min={1}
                      value={quantity}
                      defaultValue={quantity}
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                    <Button onClick={() => setQuantity(quantity + 1)}>+</Button>
                  </Input.Group>
                </div>
                <div className="tw-mt-6 tw-flex tw-space-x-4">
                  <Button
                    danger
                    size="large"
                    className="tw-rounded-lg tw-px-6"
                    onClick={addToCartHandler}
                  >
                    <BsCart className="tw-mr-2" />
                    Thêm vào giỏ hàng
                  </Button>
                  <Button
                    size="large"
                    className="tw-bg-[#df2027] tw-text-white tw-border-none tw-transition hover:tw-translate-y-[-1px] tw-shadow-lg tw-rounded-lg tw-px-6"
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
                <Divider>
                  <h5 className="tw-text-2xl">Mô tả sản phẩm</h5>
                </Divider>
                <div
                  className="description mt-4"
                  dangerouslySetInnerHTML={{ __html: data.description }}
                ></div>
              </div>
            </div>
          </>
        )}
      </Spin>
    </section>
  );
};

export default ProductDetail;
