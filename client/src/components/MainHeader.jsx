import React from "react";
import { Link } from "react-router-dom";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { BsCart3, BsSearch } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { formatMoney } from "../utils/commonFunction";

const MainHeader = () => {
  const { cartItems, total } = useSelector((state) => state.cart);

  return (
    <div className="shadow">
      <div className="mx-auto flex max-w-7xl items-center justify-between space-x-2 px-4 py-4 sm:px-6 md:space-x-4 lg:px-8">
        <Link to="/" className="hidden md:block">
          <img src="/images/logo.png" alt="logo" className="h-auto w-48" />
        </Link>
        <Link to="/" className="block md:hidden">
          <img src="/images/favicon.ico" alt="logo" className="h-auto" />
        </Link>
        <OutlinedInput
          className="flex-1 rounded-lg"
          placeholder="Nhập tên sản phẩm"
          color="warning"
          size="small"
          endAdornment={
            <InputAdornment position="end">
              <BsSearch />
            </InputAdornment>
          }
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
