import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { XIcon } from "@heroicons/react/outline";
import { TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { DataGrid } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { addMultiProduct, generateLink, generateMultiLink } from "../../api/productsApi";

const AddMultiProduct = ({ open, onClose }) => {
  const { t } = useTranslation();
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const columns = [
    {
      field: "images",
      headerName: t("image"),
      minWidth: 100,
      renderCell: (params) => <img src={params.row.productImages[0]} className="h-16 w-16"/>,
    },
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

  const getInfo = async () => {
    setLoading(true);
    try {
      const response = await generateMultiLink(link);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const addMulti = async () => {
    try {
      const response = await addMultiProduct(products);
      console.log(response.data);
    } catch (error) {
      
    }
  }

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
              onChange={(e) => setLink(e.target.value)}
            />
            <LoadingButton
              size="small"
              variant="outlined"
              onClick={getInfo}
              loading={loading}
            >
              Lấy thông tin
            </LoadingButton>
          </div>
          <div className="mt-4">
            <DataGrid
              sx={{ minHeight: 500 }}
              rows={products || []}
              getRowId={(row) => row.name}
              columns={columns}
              loading={loading}
              rowCount={products?.length || 0}
              pageSize={25}
              paginationMode="server"
              //onPageChange={onPageChange}
              rowsPerPageOptions={[25, 50, 100]}
              checkboxSelection
              disableSelectionOnClick
              //onSelectionModelChange={onRowSelected}
            />
            <div className="flex justify-end pt-4">
              <LoadingButton variant="contained" color="primary" onClick={addMulti}>
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
