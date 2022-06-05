import React, { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { DataGrid } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { AddProduct, DeleteProduct } from "../components";
import {
  typeChild as typeChildData,
  typeParent,
} from "../data/categoriesSelect";
import { useGetOrdersQuery } from "../services/apiSlice";
import toast from "react-hot-toast";
import { BsTrash } from "react-icons/bs";
import Tooltip from "@mui/material/Tooltip";
import dayjs from "dayjs";
import { listStatus } from "../data/status";

const OrderManagement = () => {
  const { t } = useTranslation();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, isError, error } = useGetOrdersQuery();

  let rows = [];
  let counter = 0;
  rows = data?.map((item) => {
    counter += 1;
    //let no = data?.pageSize * (data?.currentPage - 1) + counter;
    return { ...item, no: counter };
  });

  const getStatusName = (params) => {
    return params.row.status === 1 ? t("stocking") : t("outOfStock");
  };

  const onPageChange = (page) => {
    setPage(page + 1);
  };

  const onRowSelected = (ids) => {
    setSelectedProducts(ids);
  };

  const onShowModalDelete = (id) => {
    setSelectedProducts(id);
    setOpenModalDelete(true);
  };

  const columns = [
    { field: "no", headerName: t("no"), width: 70 },
    { field: "name", headerName: t("customerName"), flex: 1 },
    {
      field: "phone",
      headerName: t("phone"),
      minWidth: 150,
    },
    {
      field: "address",
      headerName: t("address"),
      minWidth: 500,
      valueGetter: (params) =>
        `${params.row.address}, ${params.row.ward}, ${params.row.district}, ${params.row.province}`,
    },
    {
      field: "createdAt",
      headerName: t("createdAt"),
      minWidth: 200,
      valueGetter: (params) => {
        return dayjs(params.row.createdAt).format("HH:mm DD/MM/YYYY");
      },
    },
    {
      field: "shippingFee",
      headerName: t("shippingFee"),
      type: "number",
      minWidth: 100,
    },
    {
      field: "total",
      headerName: t("total"),
      type: "number",
      minWidth: 100,
    },
    {
      field: "status",
      headerName: t("status"),
      valueGetter: getStatusName,
      minWidth: 130,
      renderCell: (params) => {
        return (
          <span
            className={`${
              listStatus[params.row.status].color
            } inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium`}
          >
            <svg
              className={`-ml-0.5 mr-1.5 h-2 w-2 ${
                listStatus[params.row.status].colorDot
              }`}
              fill="currentColor"
              viewBox="0 0 8 8"
            >
              <circle cx={4} cy={4} r={3} />
            </svg>
            {listStatus[params.row.status].text}
          </span>
        );
      },
    },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="pt-2 text-xl font-semibold text-gray-900">
            {t("order")}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Danh sách tất cả các đơn hàng
          </p>
        </div>
        <div className="mt-4 flex gap-2 sm:mt-0 sm:ml-16">
          <AddProduct
            product={selectedProduct}
            setSelectedProduct={setSelectedProduct}
          />
        </div>
      </div>
      <div className="mt-6 h-[calc(100vh_-_190px)] w-full">
        <DataGrid
          rows={rows || []}
          getRowId={(row) => row._id}
          columns={columns}
          loading={isLoading || isFetching}
          rowCount={data?.total || 0}
          pageSize={data?.pageSize || 50}
          paginationMode="server"
          onPageChange={onPageChange}
          rowsPerPageOptions={[25, 50, 100]}
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={onRowSelected}
        />
      </div>
    </div>
  );
};

export default OrderManagement;
