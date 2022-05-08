import React from "react";
import { CheckCircleIcon } from "@heroicons/react/outline";
import { formatMoney } from "../../utils/commonFunction";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const ToastNotification = ({ t, name, total, createdAt }) => {
  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } pointer-events-auto flex w-full max-w-md rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
    >
      <div className="w-0 flex-1 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <CheckCircleIcon
              className="h-6 w-6 text-green-400"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3 flex-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">
                Bạn có 1 đơn hàng mới!
              </p>
              <p className="text-xs text-gray-500">
                {dayjs(createdAt).fromNow()}
              </p>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Khách hàng{" "}
              <span className="font-semibold text-indigo-500">{name}</span> đã
              đặt hàng với tổng hoá đơn là{" "}
              <span className="font-semibold text-red-500">
                {formatMoney(total)}₫
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToastNotification;
