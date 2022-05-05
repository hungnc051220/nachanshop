import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import { formatMoney } from "../../utils/commonFunction";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import { createOrder } from "../../api/ghtkApi";

const ViewProduct = ({ isOpen, setIsOpen, order }) => {
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const onCreateOrder = async () => {
    const orderData = {
      products: [
        {
          name: "bút",
          weight: 0.1,
          quantity: 1,
          product_code: 1241,
        },
        {
          name: "tẩy",
          weight: 0.2,
          quantity: 1,
          product_code: 1254,
        },
      ],
      order: {
        id: order._id,
        pick_name: "HCM-nội thành",
        pick_address: "590 CMT8 P.11",
        pick_province: "TP. Hồ Chí Minh",
        pick_district: "Quận 3",
        pick_ward: "Phường 1",
        pick_tel: "0334654321",
        tel: "0334686868",
        name: "GHTK - HCM - Noi Thanh",
        address: "123 nguyễn chí thanh",
        province: "TP. Hồ Chí Minh",
        district: "Quận 1",
        ward: "Phường Bến Nghé",
        hamlet: "Khác",
        is_freeship: "1",
        pick_date: "2022-04-04",
        pick_money: 47000,
        note: "Khối lượng tính cước tối đa: 1.00 kg",
        value: 3000000,
        transport: "road",
        pick_option: "cod",

        pick_session: 2,
        tags: [1],
      },
    };

    const response = await createOrder(orderData);
    console.log(response);
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
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
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
                    <div className="mx-auto max-w-5xl py-2 sm:py-4">
                      <div className="mt-2">
                        <div className="space-y-16 sm:space-y-24">
                          <div key={order.number}>
                            <div className="bg-gray-50 px-4 py-6 sm:rounded-lg sm:p-6 md:flex md:items-center md:justify-between md:space-x-6 lg:space-x-8">
                              <dl className="flex-auto space-y-4 divide-y divide-gray-200 text-sm text-gray-600 md:grid md:grid-cols-3 md:gap-x-6 md:space-y-0 md:divide-y-0 lg:w-2/3 lg:flex-none lg:gap-x-8">
                                <div className="flex justify-between md:block">
                                  <dt className="font-medium text-gray-900">
                                    Trạng thái
                                  </dt>
                                  <dd className="md:mt-1">
                                    {order.status === 0 ? "Mới" : ""}
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
                              <div className="mt-6 space-y-4 sm:flex sm:space-x-4 sm:space-y-0 md:mt-0">
                                <Button
                                  variant="contained"
                                  color="success"
                                  onClick={onCreateOrder}
                                >
                                  Tạo đơn GHTK
                                </Button>
                              </div>
                            </div>

                            <table className="mt-4 w-full text-gray-500 sm:mt-6">
                              <caption className="sr-only">Products</caption>
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
                                  <tr key={product.id}>
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
