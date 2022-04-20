import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuth } from "../utils/commonFunction";
import { signIn } from "../redux/actions/auth";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

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
    <ThemeProvider theme={darkTheme}>
      <div className="relative flex min-h-screen flex-col items-center justify-center">
        <video
          src="/videos/backdrop.mp4"
          muted
          loop
          autoPlay
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="relative w-1/2 self-center">
          <div className="mx-auto flex min-h-[500px] w-[350px] flex-col justify-center rounded-lg px-10 shadow-lg backdrop-blur-lg backdrop-filter">
            <div className="mr-3 flex items-center justify-center gap-4">
              <img src="/images/icon.png" alt="logo" className="h-10 w-10" />
              <h2 className="mt-4 text-center text-4xl font-medium text-white">
                Đăng nhập
              </h2>
            </div>

            <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
              <FormControl variant="standard" fullWidth color="warning">
                <InputLabel>Tên đăng nhập</InputLabel>
                <Input
                  type="text"
                  name="email"
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

              <Button
                variant="outlined"
                type="submit"
                color="warning"
                fullWidth
              >
                Đăng nhập
              </Button>
            </form>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Login;
