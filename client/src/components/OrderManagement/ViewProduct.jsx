import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { formatMoney } from "../../utils/commonFunction";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import { createOrder, checkOrder } from "../../api/ghtkApi";
import LoadingButton from "@mui/lab/LoadingButton";
import { updateOrder } from "../../api/orderApi";
import { listStatus } from "../../data/status";
import toast from 'react-hot-toast';

const ViewProduct = ({ isOpen, setIsOpen, order: orderData }) => {
  const [loading, setLoading] = useState(false);
  const [loadingCheck, setLoadingCheck] = useState(false);
  const [order, setOrder] = useState(orderData);
  const [infoGHTK, setInfoGHTK] = useState({
    label_id: orderData?.orderGHTK?.label_id,
    status: orderData?.orderGHTK?.status,
    ship_money: orderData?.orderGHTK?.ship_money,
    created: orderData?.orderGHTK?.created,
    pick_money: orderData?.orderGHTK?.pick_money,
    is_freeship: orderData?.orderGHTK?.is_freeship,
    modified: orderData?.orderGHTK?.modified,
    message: orderData?.orderGHTK?.message,
    pick_date: orderData?.orderGHTK?.pick_date,
    deliver_date: orderData?.orderGHTK?.deliver_date,
    status_text: orderData?.orderGHTK?.status_text,
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const onCreateOrder = async () => {
    setLoading(true);
    const orderData = {
      products: order.cartItems.map((item) => {
        return { name: item.name, weight: 0.1, quantity: item.quantity };
      }),
      order: {
        id: order._id,
        pick_name: "Trần Thị Thanh Xuân",
        pick_address: "18 Kim Mã Thượng",
        pick_province: "Thành phố Hà Nội",
        pick_district: "Quận Ba Đình",
        pick_ward: "Phường Cống Vị",
        pick_tel: "0915942525",
        tel: order.phone,
        name: order.name,
        address: order.address,
        province: order.province,
        district: order.district,
        ward: order.ward,
        hamlet: "Khác",
        is_freeship: "1",
        pick_money: order.total + order.shippingFee,
        note: order.note,
        value: 990000,
        transport: "road",
        pick_option: "cod",
      },
    };

    const response = await createOrder(orderData);
    if (response.success) {
      const responseOrder = await updateOrder({
        ...order,
        status: 1,
        orderIdGHTK: response.order.label,
      });
      setOrder(responseOrder);
    }

    setLoading(false);
  };

  const onCheckOrder = async (id) => {
    setLoadingCheck(true);
    try {
      const response = await checkOrder(id);
      if (response.success) {
        setInfoGHTK(response.order);
        await updateOrder({
          ...order,
          orderGHTK: response.order,
        });
        toast.success("Cập nhật thông tin đơn hàng GHTK thành công!")
      }
    } catch (error) {
      toast.error(error.message);
    }

    setLoadingCheck(false);
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-7xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Chi tiết đơn hàng
                  </Dialog.Title>
                  <div className="bg-white pt-10">
                    <div className="grid grid-cols-1 gap-2 text-sm font-medium text-gray-900 sm:grid-cols-2">
                      <p>
                        Tên khách hàng:{" "}
                        <span className="text-indigo-500">{order.name}</span>
                      </p>
                      <p>
                        Số điện thoại:{" "}
                        <span className="text-indigo-500">{order.phone}</span>
                      </p>
                      <p className="sm:col-span-2">
                        Địa chỉ:{" "}
                        <span className="text-indigo-500">{`${order.address}, ${order.ward} ${order.district} ${order.province}`}</span>
                      </p>
                      <p className="sm:col-span-2">
                        Ghi chú:{" "}
                        <span>{order.note ? order.note : "Không có"}</span>
                      </p>
                    </div>
                    <div className="mx-auto py-2 sm:py-4">
                      <div className="mt-2 flex gap-8">
                        <div className="flex-1 space-y-4 sm:space-y-6">
                          <div className="bg-gray-50 px-4 py-6 sm:rounded-lg sm:p-6 md:flex md:items-center md:justify-between md:space-x-6 lg:space-x-8">
                            <dl className="flex-auto space-y-4 divide-y divide-gray-200 text-sm text-gray-600 md:grid md:grid-cols-3 md:gap-x-6 md:space-y-0 md:divide-y-0 lg:w-2/3 lg:flex-none lg:gap-x-8">
                              <div className="flex justify-between md:block">
                                <dt className="font-medium text-gray-900">
                                  Trạng thái
                                </dt>
                                <dd className="md:mt-1">
                                  {listStatus[order.status].text}
                                </dd>
                              </div>
                              <div className="flex justify-between pt-4 md:block md:pt-0">
                                <dt className="font-medium text-gray-900">
                                  Ngày đặt hàng
                                </dt>
                                <dd className="md:mt-1">
                                  <time>
                                    {dayjs(order.createdAt).format(
                                      "HH:mm DD/MM/YYYY"
                                    )}
                                  </time>
                                </dd>
                              </div>
                              <div className="flex justify-between pt-4 font-medium text-gray-900 md:block md:pt-0">
                                <dt>Tổng tiền</dt>
                                <dd className="md:mt-1">
                                  {formatMoney(order.total)}₫
                                </dd>
                              </div>
                            </dl>
                          </div>

                          <table className="mt-4 w-full text-gray-500 sm:mt-6">
                            <thead className="sr-only text-left text-sm text-gray-500 sm:not-sr-only">
                              <tr>
                                <th
                                  scope="col"
                                  className="py-3 pr-8 font-normal sm:w-2/5 lg:w-3/5"
                                >
                                  Sản phẩm
                                </th>
                                <th
                                  scope="col"
                                  className="hidden py-3 pr-8 font-normal sm:table-cell"
                                >
                                  Số lượng
                                </th>
                                <th
                                  scope="col"
                                  className="hidden py-3 pr-8 text-right font-normal sm:table-cell"
                                >
                                  Giá tiền
                                </th>
                                <th
                                  scope="col"
                                  className="w-[100px] py-3 text-right font-normal"
                                >
                                  Thành tiền
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t">
                              {order.cartItems.map((product) => (
                                <tr key={product._id}>
                                  <td className="py-3 pr-8">
                                    <div className="flex items-center">
                                      <div>
                                        <div className="font-medium text-gray-900">
                                          {product.name}
                                        </div>
                                        <div className="mt-1 sm:hidden">
                                          {formatMoney(product.price)}₫
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="hidden py-3 pr-8 sm:table-cell">
                                    {product.quantity}
                                  </td>
                                  <td className="hidden py-3 pr-8 text-right sm:table-cell">
                                    {formatMoney(product.price)}₫
                                  </td>
                                  <td className="whitespace-nowrap py-6 text-right font-medium">
                                    {formatMoney(
                                      product.price * product.quantity
                                    )}
                                    ₫
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <div className="border border-gray-200 bg-white px-4 py-5 sm:px-6">
                          <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                            <div className="ml-4 mt-2">
                              <h3 className="text-lg font-medium leading-6 text-gray-900">
                                Thông tin đơn hàng GHTK
                              </h3>
                            </div>
                            <div className="ml-4 mt-2 flex-shrink-0">
                              {order.status === 0 && (
                                <LoadingButton
                                  variant="contained"
                                  color="success"
                                  onClick={onCreateOrder}
                                  loading={loading}
                                >
                                  Tạo đơn GHTK
                                </LoadingButton>
                              )}
                              {order.status === 1 && (
                                <LoadingButton
                                  variant="contained"
                                  loading={loadingCheck}
                                  onClick={() =>
                                    onCheckOrder(order.orderIdGHTK)
                                  }
                                >
                                  Kiểm tra đơn hàng
                                </LoadingButton>
                              )}
                            </div>
                          </div>
                          <div>
                            <div className="mt-10 flow-root">
                              <ul
                                role="list"
                                className="-my-5 divide-y divide-gray-200"
                              >
                                <li className="py-3">
                                  <div className="flex items-center space-x-4">
                                    <div className="min-w-0 flex-1">
                                      <p className="truncate text-sm font-medium text-gray-900">
                                        Mã đơn hàng:
                                      </p>
                                    </div>
                                    <div className="text-sm">
                                      {infoGHTK.label_id}
                                    </div>
                                  </div>
                                </li>
                                <li className="py-3">
                                  <div className="flex items-center space-x-4">
                                    <div className="min-w-0 flex-1">
                                      <p className="truncate text-sm font-medium text-gray-900">
                                        Trạng thái:
                                      </p>
                                    </div>
                                    <div className="text-sm">
                                      {infoGHTK.status_text}
                                    </div>
                                  </div>
                                </li>
                                <li className="py-3">
                                  <div className="flex items-center space-x-4">
                                    <div className="min-w-0 flex-1">
                                      <p className="truncate text-sm font-medium text-gray-900">
                                        Thời gian tạo đơn hàng:
                                      </p>
                                    </div>
                                    <div className="text-sm">
                                      {infoGHTK.created
                                        ? dayjs(infoGHTK.created).format(
                                            "HH:mm:ss DD/MM/YYYY"
                                          )
                                        : ""}
                                    </div>
                                  </div>
                                </li>
                                <li className="py-3">
                                  <div className="flex items-center space-x-4">
                                    <div className="min-w-0 flex-1">
                                      <p className="truncate text-sm font-medium text-gray-900">
                                        Lần cập nhật gần nhất:
                                      </p>
                                    </div>
                                    <div className="text-sm">
                                      {infoGHTK.modified
                                        ? dayjs(infoGHTK.modified).format(
                                            "HH:mm:ss DD/MM/YYYY"
                                          )
                                        : ""}
                                    </div>
                                  </div>
                                </li>
                                <li className="py-3">
                                  <div className="flex items-center space-x-4">
                                    <div className="min-w-0 flex-1">
                                      <p className="truncate text-sm font-medium text-gray-900">
                                        Ghi chú:
                                      </p>
                                    </div>
                                    <div className="text-sm">
                                      {infoGHTK.message}
                                    </div>
                                  </div>
                                </li>
                                <li className="py-3">
                                  <div className="flex items-center space-x-4">
                                    <div className="min-w-0 flex-1">
                                      <p className="truncate text-sm font-medium text-gray-900">
                                        Ngày lấy:
                                      </p>
                                    </div>
                                    <div className="text-sm">
                                      {infoGHTK.pick_date
                                        ? dayjs(infoGHTK.pick_date).format(
                                            "DD/MM/YYYY"
                                          )
                                        : ""}
                                    </div>
                                  </div>
                                </li>
                                <li className="py-3">
                                  <div className="flex items-center space-x-4">
                                    <div className="min-w-0 flex-1">
                                      <p className="truncate text-sm font-medium text-gray-900">
                                        Ngày giao:
                                      </p>
                                    </div>
                                    <div className="text-sm">
                                      {infoGHTK.deliver_date
                                        ? dayjs(infoGHTK.deliver_date).format(
                                            "DD/MM/YYYY"
                                          )
                                        : ""}
                                    </div>
                                  </div>
                                </li>
                                <li className="py-3">
                                  <div className="flex items-center space-x-4">
                                    <div className="min-w-0 flex-1">
                                      <p className="truncate text-sm font-medium text-gray-900">
                                        Phí giao hàng:
                                      </p>
                                    </div>
                                    <div className="text-sm">
                                      {infoGHTK.ship_money
                                        ? formatMoney(infoGHTK.ship_money)
                                        : 0}
                                      ₫
                                    </div>
                                  </div>
                                </li>
                                <li className="py-3">
                                  <div className="flex items-center space-x-4">
                                    <div className="min-w-0 flex-1">
                                      <p className="truncate text-sm font-medium text-gray-900">
                                        Tiền CoD:
                                      </p>
                                    </div>
                                    <div className="text-sm">
                                      {infoGHTK.pick_money
                                        ? formatMoney(infoGHTK.pick_money)
                                        : 0}
                                      ₫
                                    </div>
                                  </div>
                                </li>
                                <li className="py-3">
                                  <div className="flex items-center space-x-4">
                                    <div className="min-w-0 flex-1">
                                      <p className="truncate text-sm font-medium text-gray-900">
                                        Miễn phí giao hàng:
                                      </p>
                                    </div>
                                    <div className="text-sm">
                                      {infoGHTK.is_freeship === 1
                                        ? "Miễn phí"
                                        : ""}
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 text-right">
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={closeModal}
                    >
                      Đóng
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ViewProduct;
