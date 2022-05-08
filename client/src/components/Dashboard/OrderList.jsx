import React from "react";
import {
  CalendarIcon,
  LocationMarkerIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import { formatMoney } from "../../utils/commonFunction";
import dayjs from "dayjs";

const positions = [
  {
    id: 1,
    title: "Back End Developer",
    type: "Full-time",
    location: "Remote",
    department: "Engineering",
    closeDate: "2020-01-07",
    closeDateFull: "January 7, 2020",
  },
  {
    id: 2,
    title: "Front End Developer",
    type: "Full-time",
    location: "Remote",
    department: "Engineering",
    closeDate: "2020-01-07",
    closeDateFull: "January 7, 2020",
  },
  {
    id: 3,
    title: "User Interface Designer",
    type: "Full-time",
    location: "Remote",
    department: "Design",
    closeDate: "2020-01-14",
    closeDateFull: "January 14, 2020",
  },
];

const OrderList = ({ orders }) => {
  return (
    <div>
      <ul role="list" className="divide-y divide-gray-200">
        {orders?.map((order) => (
          <li key={order._id}>
            <a href="#" className="block hover:bg-gray-50">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="truncate text-sm font-medium text-indigo-600">
                    {`${order?.name} - ${order.phone}`}
                  </p>
                  <div className="ml-2 flex flex-shrink-0">
                    <p className="inline-flex rounded-full bg-green-100 px-2 text-xs leading-5 text-green-800">
                      {dayjs(order.createdAt).format("HH:mm DD/MM/YYYY")}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      {`${order?.address}, ${order?.ward}, ${order?.district}, ${order?.province}`}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm font-semibold text-red-500 sm:mt-0">
                    <p>{formatMoney(order.total)}₫</p>
                  </div>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
