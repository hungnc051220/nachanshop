import React from "react";
import Modal from "@mui/material/Modal";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";

const DeleteProduct = ({
  open,
  handleClose,
  productId,
  onDelete,
  isDeleting,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="flex h-full items-center justify-center shadow-xl">
        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg
                className="h-6 w-6 text-red-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                className="text-lg font-medium leading-6 text-gray-900"
                id="modal-title"
              >
                {t("delete")}
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete this product? All of your
                  data will be permanently removed from our servers forever.
                  This action cannot be undone.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 gap-2 sm:mt-4 sm:flex sm:flex-row-reverse">
            <LoadingButton
              variant="contained"
              color="error"
              loading={isDeleting}
              onClick={() => onDelete(productId)}
            >
              {t("confirm")}
            </LoadingButton>
            <Button variant="outlined" onClick={handleClose} className="text-gray-500 border-gray-200">
              {t("cancel")}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteProduct;
