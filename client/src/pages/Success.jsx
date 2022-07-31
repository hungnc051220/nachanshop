import React, { useEffect } from "react";
import { BsFillCartCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { runConfetti } from "../utils/commonFunction";

const Success = () => {
  useEffect(() => {
    runConfetti();
  }, []);
  return (
    <div className="mx-auto flex max-w-2xl items-center justify-center px-4 pt-10 pb-10 md:px-6 md:pb-24 lg:max-w-7xl lg:px-0 relative">
      <div className="flex flex-col items-start rounded-xl bg-white p-10 shadow md:items-center md:p-16">
        <BsFillCartCheckFill className="h-20 w-20 text-green-500" />
        <h2 className="mt-6 text-2xl font-semibold">Đặt hàng thành công!</h2>
        <p className="mt-6 md:mt-10">
          Cảm ơn bạn đã đặt hàng tại{" "}
          <span className="font-bold text-red-500">NachanShop!</span>
        </p>
        <p>
          Chúng tôi sẽ liên hệ lại với bạn để xác nhận đơn hàng trong thời gian
          sớm nhất.
        </p>
        <p>Xin chân thành cảm ơn!</p>
        <Link to="/" className="mt-10">
          <Button variant="contained" color="error" size="large">
            Tiếp tục mua hàng
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
