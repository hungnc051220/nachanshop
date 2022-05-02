import React from "react";
import Button from "@mui/material/Button";
import { useLayoutEffect, useRef, useState } from "react";
import {
  useDeleteMultiProduct,
  useDeleteProduct,
  useProducts,
} from "../hooks/useProductsData";
import TablePagination from "@mui/material/TablePagination";
import { AddProduct } from "../components";
import { formatMoney } from "../utils/commonFunction";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductManagement = () => {
  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState([]);

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

  const onSuccess = () => {};
  const onError = () => {
    toast.error("Hệ thống gặp lỗi bất thường. Đang thử lại...");
  };

  const { isLoading, isFetching, data } = useProducts(
    page + 1,
    null,
    null,
    onSuccess,
    onError
  );

  useLayoutEffect(() => {
    const isIndeterminate =
      selectedPeople.length > 0 && selectedPeople.length < data?.data?.length;
    setChecked(selectedPeople.length === data?.data?.length);
    setIndeterminate(isIndeterminate);
    checkbox.current.indeterminate = isIndeterminate;
  }, [selectedPeople]);

  function toggleAll() {
    setSelectedPeople(
      checked || indeterminate ? [] : data?.data.map((item) => item._id)
    );
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Sản phẩm</h1>
          <p className="mt-2 text-sm text-gray-700">
            Danh sách tất cả các sản phẩm
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <AddProduct />
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              {selectedPeople.length > 0 && (
                <div className="absolute top-0 left-12 flex h-12 items-center space-x-3 bg-gray-50 sm:left-16">
                  <Button
                    variant="contained"
                    size="small"
                    color="error"
                    onClick={onMultiDelete}
                  >
                    Xoá tất
                  </Button>
                </div>
              )}
              <table className="min-w-full table-fixed divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="relative w-12 px-6 sm:w-16 sm:px-8"
                    >
                      <input
                        type="checkbox"
                        className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                        ref={checkbox}
                        checked={data?.data?.length === 0 ? false : checked}
                        onChange={toggleAll}
                        disabled={data?.data?.length === 0}
                      />
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                    >
                      STT
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Tên sản phẩm
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 min-w-[150px]"
                    >
                      Loại hàng cha
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Loại hàng con
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Giá tiền
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 min-w-[100px]"
                    >
                      Số lượng
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 min-w-[100px]"
                    >
                      Trạng thái
                    </th>

                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    ></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {data?.data.map((person, index) => (
                    <tr
                      key={person._id}
                      className={
                        selectedPeople.includes(person._id)
                          ? "bg-gray-50"
                          : undefined
                      }
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
                                : selectedPeople.filter((p) => p !== person._id)
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
                        {data?.pageSize * (data?.currentPage - 1) + index + 1}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                        {person.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                        {person.typeParent}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                        {person.typeChild}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                        {formatMoney(person.price)}₫
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                        {person.countInStock}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                        {person.status === 1 ? "Còn hàng" : "Hết hàng"}
                      </td>
                      <td className="space-x-4 whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Sửa<span className="sr-only">, {person.name}</span>
                        </a>
                        <a
                          href="#"
                          className="text-red-600"
                          onClick={() => deleteProduct({ id: person._id })}
                        >
                          Xoá
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

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
    </div>
  );
};

export default ProductManagement;
