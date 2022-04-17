import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { useAuth } from "../utils/commonFunction";
import { signIn } from "../redux/actions/auth";

const Login = () => {
  let isAuth = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signIn(form, navigate));
  };

  return (
    <div className="tw-relative tw-flex tw-min-h-screen tw-flex-col tw-items-center tw-justify-center">
      <video
        src="/videos/backdrop.mp4"
        muted
        loop
        autoPlay
        className="tw-absolute tw-inset-0 tw-h-full tw-w-full tw-object-cover"
      />
      <div className="tw-relative tw-w-1/2 tw-self-end">
        <div className="tw-mx-auto tw-flex tw-min-h-[550px] tw-w-[350px] tw-flex-col tw-justify-center">
          <div className="tw-mr-3 tw-flex tw-items-center tw-justify-center tw-gap-4">
            <img
              src="/images/icon.png"
              alt="logo"
              className="tw-h-10 tw-w-10"
            />
            <h2 className="tw-mt-4 tw-text-center tw-text-4xl tw-font-medium tw-text-white">
              Đăng nhập
            </h2>
          </div>

          <form className="tw-mt-6 tw-space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="tw-block tw-text-lg tw-font-medium tw-text-white"
              >
                Tên đăng nhập
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Tên đăng nhập"
                className="tw-mt-2 tw-w-full tw-rounded-lg tw-border tw-border-gray-200 tw-bg-gray-200 tw-px-5 tw-py-3 tw-text-base focus:tw-outline-none"
                onChange={handleChange}
                required
                autoFocus
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="tw-block tw-text-lg tw-font-medium tw-text-white"
              >
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Mật khẩu"
                className="tw-mt-2 tw-w-full tw-rounded-lg tw-border tw-border-gray-200 tw-bg-gray-200 tw-px-5 tw-py-3 tw-text-base focus:tw-outline-none"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Button
                type="primary"
                htmlType="submit"
                className="tw-mt-10 tw-flex tw-w-full tw-items-center tw-justify-center tw-rounded-lg tw-py-6 tw-text-lg tw-font-medium"
              >
                Đăng nhập
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
