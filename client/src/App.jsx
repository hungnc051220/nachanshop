import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Toaster } from "react-hot-toast";
import { calculateTotals } from "./features/cart/cartSlice";
import Routers from "./routers/Routers";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-perfect-scrollbar/dist/css/styles.css";

const queryClient = new QueryClient();

const App = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Routers />
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
};

export default App;
