import React, { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { DataGrid } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { AddProduct, DeleteProduct } from "../components";
import {
  typeChild as typeChildData,
  typeParent,
} from "../data/categoriesSelect";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../services/apiSlice";
import toast from "react-hot-toast";
import { BsTrash } from "react-icons/bs";
import Tooltip from "@mui/material/Tooltip";

const ProductManagement = () => {
  const { t } = useTranslation();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, isError, error } = useGetProductsQuery({
    page,
  });
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  let rows = [];
  let counter = 0;
  rows = data?.content.map((item) => {
    counter += 1;
    let no = data?.pageSize * (data?.currentPage - 1) + counter;
    return { ...item, no };
  });

  const getNameTypeParent = (params) => {
    return typeParent.find((x) => x.value === params.row.typeParent).name;
  };

  const getNameTypeChild = (params) => {
    if (params.row.typeParent !== "gc" && params.row.typeParent !== "mvb")
      return typeChildData[params.row.typeParent].find(
        (x) => x.value === params.row.typeChild
      ).name;
  };

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

  const onCloseModalDelete = () => {
    setOpenModalDelete(false);
  };

  const onDelete = async (id) => {
    try {
      await deleteProduct(id);
      setOpenModalDelete(false);
    } catch (error) {
      toast.error(error);
    }
  };

  const columns = [
    { field: "no", headerName: t("no"), width: 70 },
    { field: "name", headerName: t("productName"), flex: 1 },
    {
      field: "typeParent",
      headerName: t("typeParent"),
      valueGetter: getNameTypeParent,
      minWidth: 200,
    },
    {
      field: "typeChild",
      headerName: t("typeChild"),
      valueGetter: getNameTypeChild,
      minWidth: 200,
    },
    {
      field: "price",
      headerName: t("price"),
      type: "number",
      editable: true,
      minWidth: 100,
    },
    {
      field: "countInStock",
      headerName: t("countInStock"),
      type: "number",
      minWidth: 100,
    },
    {
      field: "status",
      headerName: t("status"),
      valueGetter: getStatusName,
      minWidth: 100,
    },
    {
      field: "action",
      headerName: "",
      renderCell: (params) => (
        <Tooltip title={t("delete")} placement="right-start" arrow>
          <a
            className="group cursor-pointer rounded-lg border border-gray-200 p-1 transition duration-300 ease-in-out hover:bg-red-500"
            onClick={() => onShowModalDelete(params.row._id)}
          >
            <BsTrash className="h-4 w-4 text-red-500 transition duration-300 ease-in-out group-hover:text-white" />
          </a>
        </Tooltip>
      ),
    },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="pt-2 text-xl font-semibold text-gray-900">
            {t("product")}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Danh sách tất cả các sản phẩm
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
      <DeleteProduct
        open={openModalDelete}
        handleClose={onCloseModalDelete}
        productId={selectedProducts}
        onDelete={onDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default ProductManagement;
