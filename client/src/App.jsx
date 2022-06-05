import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { calculateTotals } from "./features/cart/cartSlice";
import Routers from "./routers/Routers";
import "react-perfect-scrollbar/dist/css/styles.css";
import dayjs from "dayjs";
import vi from "dayjs/locale/vi";
dayjs.locale(vi);
import { ThemeProvider } from "@mui/material/styles";
import { muiTheme } from "./themes/muiTheme";

const App = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  return (
    <ThemeProvider theme={muiTheme}>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Routers />
    </ThemeProvider>
  );
};

export default App;
