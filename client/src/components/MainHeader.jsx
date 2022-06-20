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
import { SearchIcon } from "@heroicons/react/outline";

const MainHeader = () => {
  const { t } = useTranslation();
  const { cartItems, total } = useSelector((state) => state.cart);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="shadow">
      <Search isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="mx-auto flex max-w-7xl items-center justify-between space-x-2 px-4 py-4 sm:px-6 md:space-x-4 lg:px-8">
        <Link to="/" className="hidden md:block">
          <img src="/images/logo.png" alt="logo" className="h-auto w-60" />
        </Link>
        <Link to="/" className="block md:hidden">
          <img src="/images/favicon.ico" alt="logo" className="h-auto" />
        </Link>
        <div className="flex items-center gap-2">
        <button
          type="button"
          className="dark:hightligh-white/5 hidden w-72 items-center rounded-md py-1.5 pl-2 pr-3 text-sm leading-6 text-slate-400 shadow-sm ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none dark:bg-slate-800 dark:hover:bg-slate-700 lg:flex lg:gap-1.5"
          onClick={() => setIsOpen(true)}
        >
          <SearchIcon className="h-6 w-6" />
          {t("searchByProductName")}
          <span className="ml-auto flex-none pl-3 text-xs font-semibold">
            Ctrl Z
          </span>
        </button>
        <Link
          to="/shopping-cart"
          className="flex items-center justify-center gap-1 md:gap-2"
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
            <span className="whitespace-nowrap text-gray-500">
              {t("total")}
            </span>
            <h5 className="whitespace-nowrap text-base font-semibold">
              {formatMoney(total)}₫
            </h5>
          </div>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
