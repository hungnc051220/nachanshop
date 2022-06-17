import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { XIcon } from "@heroicons/react/outline";
import { TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { DataGrid } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
const AddMultiProduct = ({ open, onClose }) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");

  const columns = [
    { field: "no", headerName: t("no"), width: 50 },
    {
      field: "name",
      headerName: t("productName"),
      flex: 1,
    },
    {
      field: "description",
      headerName: t("description"),
      flex: 1,
    },
  ];

  return (
    <Modal open={open} onClose={onClose}>
      <div className="absolute inset-0 flex min-h-screen w-full items-center justify-center">
        <div className="relative w-[1200px] max-w-7xl rounded-md bg-white py-8 px-6 shadow-md">
          <div
            className="absolute right-3 top-3 cursor-pointer text-gray-500"
            onClick={onClose}
          >
            <XIcon className="h-6 w-6" />
          </div>
          <h2 className="text-semibold mb-5 text-xl">Thêm nhiều sản phẩm</h2>
          <div className="flex gap-2">
            <TextField
              label="Link sản phẩm"
              variant="outlined"
              className="flex-1"
              size="small"
            />
            <LoadingButton size="small" variant="outlined">
              Lấy thông tin
            </LoadingButton>
          </div>
          <div className="mt-4">
            <DataGrid
              sx={{ minHeight: 500 }}
              rows={[]}
              getRowId={(row) => row._id}
              columns={columns}
              //loading={isLoading || isFetching}
              //rowCount={data?.total || 0}
              //pageSize={data?.pageSize || 50}
              paginationMode="server"
              //onPageChange={onPageChange}
              rowsPerPageOptions={[25, 50, 100]}
              checkboxSelection
              disableSelectionOnClick
              //onSelectionModelChange={onRowSelected}
            />
            <div className="flex justify-end pt-4">
              <LoadingButton variant="contained" color="primary">
                {t("save")}
              </LoadingButton>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddMultiProduct;
