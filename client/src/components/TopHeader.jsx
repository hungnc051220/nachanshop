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
    <div className="tw-bg-gray-900">
      <div className="tw-mx-auto tw-flex tw-h-10 tw-max-w-7xl tw-items-center tw-justify-between">
        <p className="tw-flex-1 tw-text-center tw-text-sm tw-font-medium tw-text-white lg:tw-flex-none tw-mb-0">
          Miễn phí vận chuyển cho đơn hàng trên 1,000,000đ
        </p>

        <div className="tw-hidden lg:tw-flex lg:tw-flex-1 lg:tw-items-center lg:tw-justify-end lg:tw-space-x-6">
          {user ? (
            <div className="tw-flex tw-items-center tw-justify-center tw-gap-2 tw-text-white">
              <span className="tw-text-sm tw-border-r tw-border-gray-300 tw-pr-3">
                Xin chào, <b>{user.name}</b>
              </span>
              <a
                onClick={() => dispatch(logOut(navigate))}
                className="tw-text-sm tw-font-medium tw-text-white hover:tw-text-gray-100"
              >
                Đăng xuất
              </a>
            </div>
          ) : (
            <>
              <a
                href="#"
                className="tw-text-sm tw-font-medium tw-text-white hover:tw-text-gray-100"
              >
                Đăng ký tài khoản
              </a>
              <span
                className="tw-h-6 tw-w-px tw-bg-gray-600"
                aria-hidden="true"
              />
              <Link
                to="/login"
                className="tw-text-sm tw-font-medium tw-text-white hover:tw-text-gray-100"
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
