import { Fragment, useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  BellIcon,
  ClockIcon,
  CogIcon,
  DesktopComputerIcon,
  DocumentReportIcon,
  GiftIcon,
  MenuAlt1Icon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  ShoppingCartIcon,
  UserIcon,
  XIcon,
} from "@heroicons/react/outline";
import { ChevronDownIcon, SearchIcon } from "@heroicons/react/solid";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import toast from "react-hot-toast";
import { ToastNotification } from "../components";
import { CheckCircleIcon } from "@heroicons/react/outline";
import Badge from "@mui/material/Badge";
import PerfectScrollbar from "react-perfect-scrollbar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { formatMoney } from "../utils/commonFunction";
import { updateNotification } from "../api/notificationsApi";
dayjs.extend(relativeTime);

const navigation = [
  {
    name: "Bảng điều khiển",
    href: "/dashboard",
    icon: DesktopComputerIcon,
  },
  {
    name: "Đơn hàng",
    href: "/order-management",
    icon: ShoppingCartIcon,
  },
  {
    name: "Sản phẩm",
    href: "/product-management",
    icon: GiftIcon,
  },
  {
    name: "Người dùng",
    href: "/user-management",
    icon: UserIcon,
  },
  { name: "Lịch sử", href: "/history", icon: ClockIcon },
  {
    name: "Báo cáo",
    href: "/report",
    icon: DocumentReportIcon,
  },
  { name: "Cài đặt", href: "/setting", icon: CogIcon },
  { name: "Hỗ trợ", href: "/support", icon: QuestionMarkCircleIcon },
  { name: "Bảo mật", href: "/security", icon: ShieldCheckIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [socket, setSocket] = useState(null);
  const { user } = useSelector((state) => state?.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    setSocket(io(import.meta.env.VITE_SOCKET_URL));
  }, []);

  useEffect(() => {
    socket?.on("getAllNotification", (result) => {
      setNotifications(result);
    });
  }, [socket]);

  useEffect(() => {
    socket?.on("getNotification", (notification) => {
      const { name, total, createdAt } = notification;
      setNotifications((prev) => [notification, ...prev]);
      toast.custom(
        (t) => (
          <ToastNotification
            t={t}
            name={name}
            total={total}
            createdAt={createdAt}
          />
        ),
        {
          position: "bottom-left",
        }
      );
    });
  }, [socket]);

  const onLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const onMarkAndGo = async (notification) => {
    const { _id, mark } = notification;

    if (mark === false) {
      const response = await updateNotification(_id);
      setNotifications(
        notifications.map((item) =>
          item._id === _id ? { ...item, mark: response.mark } : item
        )
      );
    }
    navigate("/order-management");
  };

  return (
    <>
      <div className="min-h-full">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-40 flex lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex w-full max-w-xs flex-1 flex-col bg-indigo-700 pt-5 pb-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div
                  className="flex flex-shrink-0 cursor-pointer items-center space-x-4 px-4"
                  onClick={() => navigate("/")}
                >
                  <img
                    className="h-8 w-auto"
                    src="/images/icon.png"
                    alt="logo"
                  />
                  <span className="text-2xl text-white">Nachanshop</span>
                </div>
                <nav
                  className="mt-5 h-full flex-shrink-0 divide-y divide-indigo-800 overflow-y-auto"
                  aria-label="Sidebar"
                >
                  <div className="space-y-1 px-2">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? "bg-indigo-800 text-white"
                            : "text-indigo-100 hover:bg-indigo-600 hover:text-white",
                          "group flex items-center rounded-md px-2 py-2 text-base font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        <item.icon
                          className="mr-4 h-6 w-6 flex-shrink-0 text-indigo-200"
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </nav>
              </div>
            </Transition.Child>
            <div className="w-14 flex-shrink-0" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-grow flex-col overflow-y-auto bg-indigo-700 pt-5 pb-4">
            <div
              className="flex flex-shrink-0 cursor-pointer items-center space-x-4 px-4"
              onClick={() => navigate("/")}
            >
              <img className="h-8 w-auto" src="/images/icon.png" alt="logo" />
              <span className="text-2xl text-white">Nachanshop</span>
            </div>
            <nav
              className="mt-5 flex flex-1 flex-col divide-y divide-indigo-800 overflow-y-auto"
              aria-label="Sidebar"
            >
              <div className="space-y-1 px-2">
                {navigation.map((item) => {
                  const current = item.href === location.pathname;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        current
                          ? "bg-indigo-800 text-white"
                          : "text-indigo-100 hover:bg-indigo-600 hover:text-white",
                        "group flex items-center rounded-md px-2 py-2 text-sm font-medium leading-6"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      <item.icon
                        className="mr-4 h-6 w-6 flex-shrink-0 text-indigo-200"
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </nav>
          </div>
        </div>

        <div className="flex flex-1 flex-col lg:pl-64">
          <div className="relative z-20 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white lg:border-none">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            {/* Search bar */}
            <div className="flex flex-1 justify-between px-4 sm:px-6 lg:px-8">
              <div className="flex flex-1">
                <form className="flex w-full md:ml-0" action="#" method="GET">
                  <label htmlFor="search-field" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                    <div
                      className="pointer-events-none absolute inset-y-0 left-0 flex items-center"
                      aria-hidden="true"
                    >
                      <SearchIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <input
                      id="search-field"
                      name="search-field"
                      className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                      placeholder="Tìm kiếm"
                      type="search"
                    />
                  </div>
                </form>
              </div>
              <div className="ml-4 flex items-center gap-2 md:ml-6 lg:gap-0">
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none lg:rounded-md lg:p-2">
                      <Badge
                        color="error"
                        badgeContent={
                          notifications?.filter((x) => !x.mark).length
                        }
                      >
                        <BellIcon
                          className="h-6 w-6 text-gray-400"
                          aria-hidden="true"
                        />
                      </Badge>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 h-[500px] w-96 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <PerfectScrollbar>
                        <div className="divide-y divide-gray-200">
                          {notifications?.map((item) => (
                            <Menu.Item key={item._id}>
                              {({ active }) => (
                                <div
                                  className={`flex cursor-pointer space-x-3 p-4 ${
                                    item.mark ? "opacity-60" : "opacity-100"
                                  } hover:bg-gray-100`}
                                  onClick={() => onMarkAndGo(item)}
                                >
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
                                          {dayjs(item.createdAt).fromNow()}
                                        </p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        Khách hàng{" "}
                                        <span className="font-semibold text-indigo-500">
                                          {item.name}
                                        </span>{" "}
                                        đã đặt hàng với tổng hoá đơn là{" "}
                                        <span className="font-semibold text-red-500">
                                          {formatMoney(item.total)}₫
                                        </span>
                                      </p>
                                    </div>
                                    <div
                                      className={`ml-3 mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-indigo-600 ${
                                        item.mark ? "opacity-0" : "opacity-100"
                                      }`}
                                      aria-hidden="true"
                                    ></div>
                                  </div>
                                </div>
                              )}
                            </Menu.Item>
                          ))}
                        </div>
                      </PerfectScrollbar>
                    </Menu.Items>
                  </Transition>
                </Menu>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none lg:rounded-md lg:p-2 lg:hover:bg-gray-50">
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://timbanbonphuong.vn/upload/photos/2021/07/vrM6U7Wd2MNJMGIdLc4R_10_090587887f4428804e6180fc0f9033fa_avatar_full.jpg"
                        alt=""
                      />
                      <span className="ml-3 hidden text-sm font-medium text-gray-700 lg:block">
                        <span className="sr-only">Open user menu for </span>
                        {user.fullName}
                      </span>
                      <ChevronDownIcon
                        className="ml-1 hidden h-5 w-5 flex-shrink-0 text-gray-400 lg:block"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Tài khoản
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Cài đặt
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block cursor-pointer px-4 py-2 text-sm text-gray-700"
                            )}
                            onClick={onLogout}
                          >
                            Đăng xuất
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <main className="flex-1 pb-8">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
