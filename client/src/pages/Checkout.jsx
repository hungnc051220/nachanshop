import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { getDistricts, getProvinces, getWards } from "../api/provinceApi";
import { useDispatch, useSelector } from "react-redux";
import { formatMoney } from "../utils/commonFunction";
import { addOrder, resetOrder } from "../features/order/orderSlice";
import { clearCart } from "../features/cart/cartSlice";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import LoadingButton from "@mui/lab/LoadingButton";
import { getFee } from "../api/ghtkApi";

const deliveryMethods = [
  {
    id: 1,
    title: "Thông thường",
    turnaround: "4 - 10 ngày",
    price: "30,000đ",
  },
  { id: 2, title: "Hoả tốc", turnaround: "1-2 ngày", price: "40,000đ" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, total } = useSelector((state) => state.cart);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.order
  );
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    deliveryMethods[0]
  );

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  const [orderInfo, setOrderInfo] = useState({
    name: "",
    phone: "",
    province: "",
    district: "",
    ward: "",
    address: "",
    note: "",
  });

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(clearCart());
      navigate("/success");
    }

    dispatch(resetOrder());
  }, [isError, isSuccess, message, navigate, dispatch]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const newOrder = {
      ...orderInfo,
      cartItems,
      total: total > 999999 ? total : total + 30000,
      shippingFee: total > 999999 ? 0 : 30000,
      status: 0,
    };

    const response = await getFee({
      province: orderInfo.province,
      district: orderInfo.district,
      weight: 1000,
      address: orderInfo.address,
    });

    dispatch(
      addOrder({ ...newOrder, realShippingFee: Number(response?.fee?.fee) })
    );
  };

  const handleChangeInput = (e) => {
    setOrderInfo({ ...orderInfo, [e.target.name]: e.target.value });
  };

  const handleChangeProvinces = (e, { props }) => {
    const provinceCode = e.target.value;
    setSelectedProvince(provinceCode);
    setOrderInfo({
      ...orderInfo,
      province: props.children,
    });
    fetchDistricts(provinceCode);
  };

  const handleChangeDistricts = (e, { props }) => {
    const districtCode = e.target.value;
    setSelectedDistrict(districtCode);
    setOrderInfo({
      ...orderInfo,
      district: props.children,
    });
    fetchWards(districtCode);
  };

  const handleChangeWards = (e, { props }) => {
    const wardCode = e.target.value;
    setSelectedWard(wardCode);
    setOrderInfo({
      ...orderInfo,
      ward: props.children,
    });
  };

  const fetchDistricts = async (provinceCode) => {
    const data = await getDistricts(provinceCode);
    const { districts } = data;
    setDistricts(districts);
  };

  const fetchWards = async (districtCode) => {
    const data = await getWards(districtCode);
    const { wards } = data;
    setWards(wards);
  };

  useEffect(() => {
    const fetchProvinces = async () => {
      const data = await getProvinces();
      setProvinces(data);
    };

    fetchProvinces();
  }, []);

  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-4 pt-10 pb-10 sm:px-6 md:pb-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Checkout</h2>

        <form
          className="rounded-xl bg-white p-5 shadow md:p-10 lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
          onSubmit={onSubmit}
        >
          <div>
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                Thông tin giao hàng
              </h2>

              <div className="mt-4 space-y-4">
                <TextField
                  required
                  label="Họ tên"
                  name="name"
                  fullWidth
                  onChange={handleChangeInput}
                  autoFocus
                />

                <TextField
                  required
                  label="Điện thoại"
                  name="phone"
                  fullWidth
                  onChange={handleChangeInput}
                />

                <FormControl fullWidth>
                  <InputLabel className="bg-white pr-1">
                    Tỉnh/Thành phố
                  </InputLabel>
                  <Select
                    value={selectedProvince}
                    onChange={handleChangeProvinces}
                  >
                    {provinces.map((item) => (
                      <MenuItem
                        key={item.codename}
                        value={item.code}
                        name={item.codename}
                      >
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth required>
                  <InputLabel className="bg-white pr-1">Quận/Huyện</InputLabel>
                  <Select
                    value={selectedDistrict}
                    onChange={handleChangeDistricts}
                  >
                    {districts.map((item) => (
                      <MenuItem key={item.codename} value={item.code}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth required>
                  <InputLabel className="bg-white pr-1">Phường/Xã</InputLabel>
                  <Select value={selectedWard} onChange={handleChangeWards}>
                    {wards.map((item) => (
                      <MenuItem key={item.codename} value={item.code}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  required
                  label="Địa chỉ"
                  name="address"
                  fullWidth
                  onChange={handleChangeInput}
                />

                <TextField
                  label="Ghi chú"
                  multiline
                  maxRows={4}
                  fullWidth
                  name="note"
                  onChange={handleChangeInput}
                />
              </div>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <RadioGroup
                value={selectedDeliveryMethod}
                onChange={setSelectedDeliveryMethod}
              >
                <RadioGroup.Label className="text-lg font-medium text-gray-900">
                  Phương thức vận chuyển
                </RadioGroup.Label>

                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  {deliveryMethods.map((deliveryMethod) => (
                    <RadioGroup.Option
                      key={deliveryMethod.id}
                      value={deliveryMethod}
                      className={({ checked, active }) =>
                        classNames(
                          checked ? "border-transparent" : "border-gray-300",
                          active ? "ring-0 ring-indigo-500" : "",
                          "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
                        )
                      }
                    >
                      {({ checked, active }) => (
                        <>
                          <div className="flex flex-1">
                            <div className="flex flex-col">
                              <RadioGroup.Label
                                as="span"
                                className="block text-sm font-medium text-gray-900"
                              >
                                {deliveryMethod.title}
                              </RadioGroup.Label>
                              <RadioGroup.Description
                                as="span"
                                className="mt-1 flex items-center text-sm text-gray-500"
                              >
                                {deliveryMethod.turnaround}
                              </RadioGroup.Description>
                              <RadioGroup.Description
                                as="span"
                                className="mt-6 text-sm font-medium text-gray-900"
                              >
                                {deliveryMethod.price}
                              </RadioGroup.Description>
                            </div>
                          </div>
                          {checked ? (
                            <CheckCircleIcon
                              className="h-5 w-5 text-red-600"
                              aria-hidden="true"
                            />
                          ) : null}
                          <div
                            className={classNames(
                              active ? "border" : "border-2",
                              checked ? "border-red-500" : "border-transparent",
                              "pointer-events-none absolute -inset-px rounded-lg"
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Order summary */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">
              Thông tin đơn hàng
            </h2>

            <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
              <h3 className="sr-only">Items in your cart</h3>
              <ul role="list" className="divide-y divide-gray-200">
                {cartItems.map((product) => (
                  <li key={product._id} className="flex py-6 px-4 sm:px-6">
                    <div className="flex-shrink-0">
                      <img
                        src={`${import.meta.env.VITE_API_URL}/${
                          product.productImage[0]
                        }`}
                        alt={product.sku}
                        className="w-20 rounded-md"
                      />
                    </div>

                    <div className="ml-6 flex flex-1 flex-col">
                      <div className="flex">
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm">
                            <Link
                              to={`/products/${product._id}`}
                              className="font-medium text-gray-700 hover:text-gray-800"
                            >
                              {product.name}
                            </Link>
                          </h4>
                          <p className="mt-1 text-sm text-gray-500"></p>
                          <p className="mt-1 text-sm text-gray-500"></p>
                        </div>
                      </div>

                      <div className="flex flex-1 items-end justify-between pt-2">
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          {formatMoney(product.price)}₫
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <dl className="space-y-6 border-t border-gray-200 py-6 px-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Tổng tiền hàng</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {formatMoney(total)}₫
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Phí vận chuyển</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {total > 999999 ? "Miễn phí" : "30,000₫"}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base font-medium">Tổng tiền</dt>
                  <dd className="text-base font-medium text-gray-900">
                    {total > 999999
                      ? formatMoney(total)
                      : formatMoney(total + 30000)}
                    ₫
                  </dd>
                </div>
              </dl>

              <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                <LoadingButton
                  variant="contained"
                  color="error"
                  type="submit"
                  fullWidth
                  size="large"
                  loading={isLoading}
                >
                  Đặt hàng
                </LoadingButton>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
