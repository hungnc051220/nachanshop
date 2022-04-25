import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { BsCart3, BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";
import { formatMoney } from "../utils/commonFunction";

const MainHeader = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const getCartSubTotal = () => {
    return cartItems.reduce(
      (price, item) => item.price * item.quantity + price,
      0
    );
  };

  return (
    <div className="shadow">
      <div className="mx-auto flex max-w-7xl items-center justify-between space-x-4 py-4">
        <Link to="/">
          <img src="/images/logo.png" alt="logo" className="h-auto w-48" />
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
          className="flex items-center justify-center gap-3"
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
            <h5 className="text-base font-semibold">
              {formatMoney(getCartSubTotal())}₫
            </h5>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MainHeader;
