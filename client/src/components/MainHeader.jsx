import React from "react";
import { Link } from "react-router-dom";
import { Badge, Avatar } from "antd";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { Input } from "antd";

const MainHeader = () => {
  return (
    <div className="tw-shadow">
      <div className="tw-mx-auto tw-flex tw-max-w-7xl tw-items-center tw-justify-between tw-py-4 tw-space-x-4">
        <Link to="/">
          <img
            src="/images/logo.png"
            alt="logo"
            className="tw-w-48 tw-h-auto"
          />
        </Link>
        <Input
          placeholder="Tìm kiếm sản phẩm"
          size="large"
          prefix={<FaSearch />}
          className="tw-rounded-lg tw-text-gray-300"
        />

        <Link
          to="/shopping-cart"
          className="tw-flex tw-justify-center tw-items-center tw-gap-4"
        >
          <Badge count={5}>
            <Avatar
              className="tw-bg-gray-200 tw-text-red-500 tw-text-lg tw-flex tw-items-center tw-justify-center"
              shape="round"
              size="large"
              icon={<FaShoppingCart />}
            />
          </Badge>
          <div>
            <span className="tw-text-sm tw-text-gray-500">Tổng tiền</span>
            <h5 className="tw-text-base tw-font-semibold">9,000,000₫</h5>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MainHeader;
