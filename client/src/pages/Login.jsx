import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import { useAuth } from "../utils/commonFunction";
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import toast from "react-hot-toast";

const Login = () => {
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  let isAuth = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
  };

  return (
      <div className="relative flex min-h-screen flex-col items-center justify-center bg-gray-900">
        <div className="relative w-1/2 self-center">
          <div className="mx-auto flex min-h-[500px] w-[350px] flex-col justify-center rounded-lg px-10 shadow-lg bg-white">
            <div className="mr-3 flex items-center justify-center gap-4">
              <img src="/images/icon.png" alt="logo" className="h-10 w-10" />
              <h2 className="mt-4 text-center text-4xl font-medium">
                Đăng nhập
              </h2>
            </div>

            <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
              <FormControl variant="standard" fullWidth color="warning">
                <InputLabel>Tên đăng nhập</InputLabel>
                <Input
                  type="text"
                  name="username"
                  onChange={handleChange}
                  required
                  autoFocus
                />
              </FormControl>

              <FormControl variant="standard" fullWidth color="warning">
                <InputLabel>Mật khẩu</InputLabel>
                <Input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  required
                />
              </FormControl>

              <LoadingButton
                variant="outlined"
                type="submit"
                color="warning"
                fullWidth
                loading={isLoading}
              >
                Đăng nhập
              </LoadingButton>
            </form>
          </div>
        </div>
      </div>
  );
};

export default Login;
