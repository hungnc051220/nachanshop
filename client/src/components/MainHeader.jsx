import React, { useState } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { BsCart3, BsSearch } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { formatMoney } from "../utils/commonFunction";
import { useTranslation } from "react-i18next";
import Search from "./Search";

const MainHeader = () => {
  const { t } = useTranslation();
  const { cartItems, total } = useSelector((state) => state.cart);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="shadow">
      <Search isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="mx-auto flex max-w-7xl items-center justify-between space-x-2 px-4 py-4 sm:px-6 md:space-x-4 lg:px-8">
        <Link to="/" className="hidden md:block">
          <img src="/images/logo.png" alt="logo" className="h-auto w-48" />
        </Link>
        <Link to="/" className="block md:hidden">
          <img src="/images/favicon.ico" alt="logo" className="h-auto" />
        </Link>
        <TextField
          onClick={() => setIsOpen(true)}
          placeholder={t("searchByProductName")}
          sx={{ m: 1 }}
          size="small"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BsSearch />
              </InputAdornment>
            ),
          }}
        />

        <Link
          to="/shopping-cart"
          className="flex items-center justify-center gap-1 md:gap-3"
        >
          <IconButton
            size="large"
            aria-label="Sản phẩm trong giỏ"
            color="inherit"
          >
            <Badge
              badgeContent={cartItems.length}
              color="error"
              invisible={cartItems.length === 0}
            >
              <BsCart3 />
            </Badge>
          </IconButton>
          <div>
            <span className="text-sm text-gray-500">Tổng tiền</span>
            <h5 className="text-base font-semibold">{formatMoney(total)}₫</h5>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MainHeader;
