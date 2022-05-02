import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const TopHeader = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { user } = auth;

  return (
    <div className="bg-gray-900">
      <div className="mx-auto flex h-10 px-4 sm:px-6 lg:px-8 max-w-7xl items-center justify-between">
        <p className="mb-0 flex-1 text-center text-sm font-medium text-white lg:flex-none">
          Miễn phí vận chuyển cho đơn hàng trên 1,000,000đ
        </p>

        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
          {user ? (
            <div className="flex items-center justify-center gap-2 text-white">
              <span className="border-r border-gray-300 pr-3 text-sm">
                Xin chào, <b>{user.fullName}</b>
              </span>
              <a
                onClick={() => dispatch(logout())}
                className="text-sm font-medium text-white hover:text-gray-100 cursor-pointer"
              >
                Đăng xuất
              </a>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-white hover:text-gray-100"
              >
                Đăng nhập
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
