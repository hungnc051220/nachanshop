import React, { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { DataGrid } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { AddMultiProduct, AddProduct, DeleteProduct } from "../components";
import LinearProgress from "@mui/material/LinearProgress";
import {
  useDeleteProductMutation,
  useDeleteProductsMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "../services/apiSlice";
import toast from "react-hot-toast";
import { BsTrash, BsPencilFill } from "react-icons/bs";
import Tooltip from "@mui/material/Tooltip";
import { Button } from "@mui/material";
import { getNameCategory } from "../utils/commonFunction";

const ProductManagement = () => {
  const { t } = useTranslation();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openAddMulti, setOpenAddMulti] = useState(false);
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, refetch, isError, error } = useGetProductsQuery({
    page,
    limit: 100,
  });
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [deleteProducts, { isLoading: isDeletingMulti }] =
    useDeleteProductsMutation();
  const [updateProduct] = useUpdateProductMutation();

  let rows = [];
  let counter = 0;
  rows = data?.content.map((item) => {
    counter += 1;
    let no = data?.pageSize * (data?.currentPage - 1) + counter;
    return { ...item, no };
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

  const onCloseModalDelete = () => {
    setOpenModalDelete(false);
  };

  const handleOpenAddMulti = () => setOpenAddMulti(true);
  const handleCloseAddMulti = () => setOpenAddMulti(false);

  const onDelete = async (id) => {
    try {
      await deleteProduct(id);
      setOpenModalDelete(false);
    } catch (error) {
      toast.error(error);
    }
  };

  const onDeleteMulti = async () => {
    try {
      await deleteProducts(selectedProducts);
    } catch (error) {
      toast.error(error);
    }
  };

  const onUpdatePrice = async (props, event) => {
    if (props.row.price === props.value) {
      return;
    }

    try {
      await updateProduct({ id: props.id, price: props.value });
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { field: "no", headerName: t("no"), width: 50 },
    { field: "productCode", headerName: t("productCode"), minWidth: 120 },
    {
      field: "name",
      headerName: t("productName"),
      flex: 1,
      renderCell: (params) => (
        <div className="flex items-center gap-2">
          <img
            src={`${import.meta.env.VITE_API_URL}/${
              params.row.productImage[0]
            }`}
            alt={data.name}
            className="h-14 w-14"
            loading="lazy"
          />
          <p>{params.row.name}</p>
        </div>
      ),
    },
    {
      field: "mainCategory",
      headerName: t("mainCategory"),
      valueGetter: (params) => getNameCategory(params.row.mainCategory),
      minWidth: 200,
    },
    {
      field: "category",
      headerName: t("category"),
      valueGetter: (params) => getNameCategory(params.row.category),
      minWidth: 200,
    },
    {
      field: "subCategory",
      headerName: t("subCategory"),
      valueGetter: (params) => getNameCategory(params.row.subCategory),
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
        <div className="flex gap-2">
          <Tooltip title={t("edit")} placement="right-start" arrow>
            <a
              className="group cursor-pointer rounded-lg border border-gray-200 p-1 transition duration-300 ease-in-out hover:bg-red-500"
              onClick={() => setSelectedProduct(params.row)}
            >
              <BsPencilFill className="h-4 w-4 text-indigo-500 transition duration-300 ease-in-out group-hover:text-white" />
            </a>
          </Tooltip>
          <Tooltip title={t("delete")} placement="right-start" arrow>
            <a
              className="group cursor-pointer rounded-lg border border-gray-200 p-1 transition duration-300 ease-in-out hover:bg-red-500"
              onClick={() => onShowModalDelete(params.row._id)}
            >
              <BsTrash className="h-4 w-4 text-red-500 transition duration-300 ease-in-out group-hover:text-white" />
            </a>
          </Tooltip>
        </div>
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
          <LoadingButton onClick={onDeleteMulti}>Delete</LoadingButton>
        </div>
        <div className="mt-4 flex gap-2 sm:mt-0 sm:ml-16">
          <AddProduct
            product={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            refetch={refetch}
          />
          <Button variant="outlined" onClick={handleOpenAddMulti}>
            Thêm nhiều
          </Button>
          {openAddMulti && (
            <AddMultiProduct
              open={openAddMulti}
              onClose={handleCloseAddMulti}
            />
          )}
        </div>
      </div>
      <div className="mt-6 h-[calc(100vh_-_200px)] w-full">
        <DataGrid
          components={{
            LoadingOverlay: LinearProgress,
          }}
          loading={isLoading || isFetching}
          rows={rows || []}
          getRowId={(row) => row._id}
          columns={columns}
          rowCount={data?.total || 0}
          pageSize={data?.pageSize || 50}
          paginationMode="server"
          onPageChange={onPageChange}
          rowsPerPageOptions={[25, 50, 100]}
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={onRowSelected}
          onCellEditCommit={onUpdatePrice}
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
