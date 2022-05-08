import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  BellIcon,
  ClockIcon,
  CogIcon,
  CreditCardIcon,
  DocumentReportIcon,
  HomeIcon,
  MenuAlt1Icon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  XIcon,
  GiftIcon,
  UserIcon,
} from "@heroicons/react/outline";
import {
  CashIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  OfficeBuildingIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import { BsCurrencyDollar } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDashboard } from "../hooks/useDashboard";
import { useOrders } from "../hooks/useOrders";
import { CardStat, ChartLine, OrderList } from "../components";
import { formatMoney } from "../utils/commonFunction";

const people = [
  {
    name: "Calvin Hawkins",
    email: "calvin.hawkins@example.com",
    image:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Kristen Ramos",
    email: "kristen.ramos@example.com",
    image:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Ted Fox",
    email: "ted.fox@example.com",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

const Dashboard = () => {
  const { data } = useDashboard();
  const { data: orders } = useOrders();

  return (
    <div className="bg-gray-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <h2 className="pt-2 text-xl font-semibold leading-6 text-gray-900">
          Bảng điều khiển
        </h2>
        <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {/* Card */}
          <CardStat
            name="Doanh thu"
            amount={`${formatMoney(data?.total)}₫`}
            icon={BsCurrencyDollar}
            color="from-indigo-500 to-indigo-600"
            href="#!"
          />
          <CardStat
            name="Đơn hàng"
            amount={formatMoney(data?.orderCount)}
            icon={AiOutlineShoppingCart}
            color="from-orange-500 to-orange-600"
            href="/order-management"
          />
          <CardStat
            name="Sản phẩm"
            amount={formatMoney(data?.productCount)}
            icon={GiftIcon}
            color="from-teal-500 to-teal-600"
            href="/product-management"
          />
          <CardStat
            name="Người dùng"
            amount={formatMoney(data?.userCount)}
            icon={UserIcon}
            color="from-yellow-400 to-yellow-500"
            href="/user-management"
          />
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8">
        <div className="my-4 rounded-2xl bg-white p-4 shadow">
          <h2 className="mb-2 px-4 text-lg font-medium leading-6 text-gray-900">
            Biểu đồ thống kê
          </h2>
          <ChartLine report={data?.report} />
        </div>
      </div>

      <div className="lg:flex">
        <div className="w-full px-4 sm:pl-6 lg:w-2/3 lg:pl-8">
          <div className="my-4 rounded-2xl bg-white py-4 shadow">
            <h2 className="mb-2 px-8 text-lg font-medium leading-6 text-gray-900">
              Đơn hàng mới nhất
            </h2>
            <OrderList orders={orders} />
          </div>
        </div>
        <div className="w-full px-4 sm:pr-6 lg:w-1/3 lg:pr-8">
          <div className="my-4 rounded-2xl bg-white p-4 shadow">
            <h2 className="mb-2 px-4 text-lg font-medium leading-6 text-gray-900">
              Sản phẩm được mua nhiều nhất
            </h2>
            <ul role="list" className="divide-y divide-gray-200">
              {people.map((person) => (
                <li key={person.email} className="flex py-4">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={person.image}
                    alt=""
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {person.name}
                    </p>
                    <p className="text-sm text-gray-500">{person.email}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
