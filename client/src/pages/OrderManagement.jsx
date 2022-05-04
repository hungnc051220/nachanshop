import React from "react";
import Button from "@mui/material/Button";
import { useLayoutEffect, useRef, useState } from "react";
import {
  useDeleteMultiProduct,
  useDeleteProduct,
  useProducts,
} from "../hooks/useProductsData";
import TablePagination from "@mui/material/TablePagination";
import { formatMoney } from "../utils/commonFunction";
import {
  typeParent,
  typeChild as typeChildData,
} from "../data/categoriesSelect";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useOrders } from "../hooks/useOrders";
import dayjs from "dayjs";
import { ViewProduct } from "../components";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const OrderManagement = () => {
  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState([]);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const { mutateAsync: deleteProduct } = useDeleteProduct();
  const { mutateAsync: deleteMultiProduct } = useDeleteMultiProduct();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onMultiDelete = () => {
    deleteMultiProduct(selectedPeople);
    setSelectedPeople([]);
  };

  const { isLoading, isFetching, data } = useOrders();

  useLayoutEffect(() => {
    const isIndeterminate =
      selectedPeople.length > 0 && selectedPeople.length < data?.length;
    setChecked(selectedPeople.length === data?.length);
    setIndeterminate(isIndeterminate);
    checkbox.current.indeterminate = isIndeterminate;
  }, [selectedPeople]);

  function toggleAll() {
    setSelectedPeople(
      checked || indeterminate ? [] : data?.map((item) => item._id)
    );
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="pt-2 text-xl font-semibold text-gray-900">Đơn hàng</h1>
          <p className="mt-2 text-sm text-gray-700">
            Danh sách tất cả các đơn hàng
          </p>
          {isOpen && (
            <ViewProduct
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              order={selectedOrder}
            />
          )}
        </div>
        <div className="mt-4 flex gap-2 sm:mt-0 sm:ml-16">
          {selectedPeople.length > 0 && (
            <div className="flex items-center bg-gray-50 sm:left-16">
              <Button variant="contained" color="error" onClick={onMultiDelete}>
                Xoá tất
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-6 flex flex-col">
        <div className="-my-2 overflow-hidden sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="h-[calc(100vh_-_300px)] min-h-[500px] w-[calc(100vw_-_50px)] shadow ring-1 ring-black ring-opacity-5 sm:h-[calc(100vh_-_240px)] md:rounded-lg lg:w-[calc(100vw_-_320px)]">
              <PerfectScrollbar>
                <table className="min-w-full table-fixed divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 w-12 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-6 backdrop-blur backdrop-filter sm:w-16 sm:px-8"
                      >
                        <input
                          type="checkbox"
                          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                          ref={checkbox}
                          checked={data?.length === 0 ? false : checked}
                          onChange={toggleAll}
                          disabled={data?.length === 0}
                        />
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                      >
                        STT
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                      >
                        Trạng thái
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                      >
                        Tên khách hàng
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 min-w-[150px] border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                      >
                        Số điện thoại
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                      >
                        Địa chỉ
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 min-w-[100px] border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                      >
                        Ngày tạo
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 min-w-[100px] border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-right text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                      >
                        Phí ship
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 min-w-[100px] border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-right text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                      >
                        Tổng tiền
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6"
                      ></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {data?.map((person, index) => (
                      <tr
                        key={person._id}
                        className="cursor-pointer hover:bg-indigo-50"
                        onClick={() => {
                          setIsOpen(true);
                          setSelectedOrder(person);
                        }}
                        // className={
                        //   selectedPeople.includes(person._id)
                        //     ? "bg-gray-50"
                        //     : undefined
                        // }
                      >
                        <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                          {selectedPeople.includes(person._id) && (
                            <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                          )}
                          <input
                            type="checkbox"
                            className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                            value={person._id}
                            checked={selectedPeople.includes(person._id)}
                            onChange={(e) =>
                              setSelectedPeople(
                                e.target.checked
                                  ? [...selectedPeople, person._id]
                                  : selectedPeople.filter(
                                      (p) => p !== person._id
                                    )
                              )
                            }
                          />
                        </td>
                        <td
                          className={classNames(
                            "whitespace-nowrap py-2 pr-3 text-sm font-medium",
                            selectedPeople.includes(person._id)
                              ? "text-indigo-600"
                              : "text-gray-900"
                          )}
                        >
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                          {person.status === 1 ? "Còn hàng" : "Mới"}
                        </td>
                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                          {person.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                          {person.phone}
                        </td>
                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                          {`${person.address}, ${person.ward}, ${person.district}, ${person.province}`}
                        </td>
                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                          {dayjs(person.createdAt).format("HH:mm DD/MM/YYYY")}
                        </td>
                        <td className="whitespace-nowrap px-3 py-2 text-right text-sm text-gray-500">
                          {formatMoney(person.shippingFee)}₫
                        </td>
                        <td className="whitespace-nowrap px-3 py-2 text-right text-sm font-semibold text-red-500">
                          {formatMoney(person.total)}₫
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </PerfectScrollbar>
            </div>
            <TablePagination
              rowsPerPageOptions={[15, 50, 100]}
              component="div"
              count={data ? data?.total : 15}
              rowsPerPage={data ? data?.pageSize : 15}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
