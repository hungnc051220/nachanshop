import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../redux/actions/auth";

const TopHeader = () => {
  //   const user = useSelector((state) => state.auth.authData?.user);
  const user = null;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900">
      <div className="mx-auto flex h-10 max-w-7xl items-center justify-between">
        <p className="mb-0 flex-1 text-center text-sm font-medium text-white lg:flex-none">
          Miễn phí vận chuyển cho đơn hàng trên 1,000,000đ
        </p>

        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
          {user ? (
            <div className="flex items-center justify-center gap-2 text-white">
              <span className="border-r border-gray-300 pr-3 text-sm">
                Xin chào, <b>{user.name}</b>
              </span>
              <a
                onClick={() => dispatch(logOut(navigate))}
                className="text-sm font-medium text-white hover:text-gray-100"
              >
                Đăng xuất
              </a>
            </div>
          ) : (
            <>
              <a
                href="#"
                className="text-sm font-medium text-white hover:text-gray-100"
              >
                Đăng ký tài khoản
              </a>
              <span className="h-6 w-px bg-gray-600" aria-hidden="true" />
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
