import { Popover, Transition } from "@headlessui/react";
import {
  MenuIcon,
  SearchIcon
} from "@heroicons/react/outline";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsCart3 } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { categories } from '../data/categories';
import { formatMoney } from "../utils/commonFunction";
import Search from "./Search";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);
  const [isShowing, setIsShowing] = useState(false);
  const { cartItems, total } = useSelector((state) => state.cart);

  return (
    <div>
      <header className="relative z-10">
        <nav aria-label="Top">
          {/* Top navigation */}
          <div className="bg-gray-900">
            <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
              <p className="flex-1 text-center text-sm font-medium text-white lg:flex-none">
                Miễn phí vận chuyển cho đơn hàng trên 1,000,000đ
              </p>

              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                <a
                  href="#"
                  className="text-sm font-medium text-white hover:text-gray-100"
                >
                  Tạo tài khoản
                </a>
                <span className="h-6 w-px bg-gray-600" aria-hidden="true" />
                <Link
                  to="/login"
                  className="text-sm font-medium text-white hover:text-gray-100"
                >
                  Đăng nhập
                </Link>
              </div>
            </div>
          </div>

          {/* Secondary navigation */}
          <div className="bg-white">
            <div className="border-b border-gray-200">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  {/* Logo (lg+) */}
                  <div className="hidden lg:flex lg:items-center">
                    <Link to="/">
                      <span className="sr-only">Workflow</span>
                      <img
                        className="h-auto w-40"
                        src="/images/logo.png"
                        alt="logo"
                      />
                    </Link>
                  </div>

                  <div className="hidden h-full lg:flex">
                    {/* Mega menus */}
                    <Popover.Group className="ml-8">
                      <div className="flex h-full justify-center space-x-8">
                        {categories.map((category, categoryIdx) => {
                          return (
                            <Popover
                              key={category.name}
                              className="flex"
                              onMouseEnter={() => {
                                setMenuOpen(categoryIdx);
                                setIsShowing(true);
                              }}
                              onMouseLeave={() => {
                                setMenuOpen(null);
                                setIsShowing(false);
                              }}
                            >
                              {() => (
                                <>
                                  <div className="relative flex">
                                    <Popover.Button
                                      onClick={() => navigate(`/${category.route}`)}
                                      className={classNames(
                                        menuOpen === categoryIdx
                                          ? "border-red-600 text-red-600"
                                          : "border-transparent text-gray-700 hover:text-gray-800",
                                        "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out focus:outline-none"
                                      )}
                                    >
                                      {category.name}
                                    </Popover.Button>
                                  </div>

                                  <Transition
                                    as={Fragment}
                                    show={isShowing && menuOpen === categoryIdx}
                                    onMouseEnter={() => {
                                      setMenuOpen(categoryIdx);
                                      setIsShowing(true);
                                    }}
                                    onMouseLeave={() => {
                                      setMenuOpen(null);
                                      setIsShowing(false);
                                    }}
                                    enter="transition ease-out duration-200"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="transition ease-in duration-150"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                  >
                                    <Popover.Panel className="absolute inset-x-0 top-full text-gray-500 sm:text-sm">
                                      <div
                                        className="absolute inset-0 top-1/2 bg-white shadow"
                                        aria-hidden="true"
                                      />

                                      <div className="relative bg-white">
                                        <div className="mx-auto max-w-7xl px-8">
                                          <div className="grid grid-cols-1 items-start gap-y-10 gap-x-8 pt-10 pb-12">
                                            <div className="grid grid-cols-5 gap-y-10 gap-x-8">
                                              {category.subCategories.map(
                                                (item, index) => (
                                                  <div key={index}>
                                                    <Link to={`/${category.route}/${item.route}`}
                                                      className="font-medium text-gray-900"
                                                    >
                                                      {item.name}
                                                    </Link>
                                                    <ul
                                                      role="list"
                                                      aria-labelledby={`desktop-featured-heading-${categoryIdx}`}
                                                      className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                    >
                                                      {item.subCategories.map(
                                                        (subCategory) => (
                                                          <li
                                                            key={subCategory.name}
                                                            className="flex"
                                                          >
                                                            <Link
                                                              to={`/${category.route}/${item.route}/${subCategory.href}`}
                                                              className="hover:text-gray-800"
                                                            >
                                                              {subCategory.name}
                                                            </Link>
                                                          </li>
                                                        )
                                                      )}
                                                    </ul>
                                                  </div>
                                                )
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </Popover.Panel>
                                  </Transition>
                                </>
                              )}
                            </Popover>
                          );
                        })}
                      </div>
                    </Popover.Group>
                  </div>

                  {/* Mobile menu and search (lg-) */}
                  <div className="flex flex-1 items-center lg:hidden">
                    <button
                      type="button"
                      className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileMenuOpen(true)}
                    >
                      <span className="sr-only">Open menu</span>
                      <MenuIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Search */}
                    <a
                      href="#"
                      className="ml-2 p-2 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Search</span>
                      <SearchIcon className="h-6 w-6" aria-hidden="true" />
                    </a>
                  </div>

                  {/* Logo (lg-) */}
                  <a href="#" className="lg:hidden">
                    <span className="sr-only">Workflow</span>
                    <img
                      src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                      alt=""
                      className="h-8 w-auto"
                    />
                  </a>

                  <div className="flex flex-1 items-center justify-end">
                    <div className="flex items-center lg:ml-8">
                      <div className="flex space-x-8">
                        <div className="hidden lg:flex">
                          <button
                            type="button"
                            className="dark:hightligh-white/5 hidden w-52 items-center rounded-md py-1.5 pl-2 pr-3 text-sm leading-6 text-slate-400 shadow-sm ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none dark:bg-slate-800 dark:hover:bg-slate-700 lg:flex lg:gap-1.5"
                            onClick={() => setIsOpen(true)}
                          >
                            <SearchIcon className="h-6 w-6" />
                            {t("search")}
                            <span className="ml-auto flex-none pl-3 text-xs font-semibold">
                              Ctrl Z
                            </span>
                          </button>
                        </div>
                      </div>

                      <span
                        className="ml-4 h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      />

                      <div className="flow-root">
                        <Link
                          to="/shopping-cart"
                          className="flex items-center justify-center gap-1"
                        >
                          <IconButton
                            size="large"
                            aria-label="Sản phẩm trong giỏ"
                            color="inherit"
                          >
                            <Badge
                              badgeContent={cartItems.length}
                              color="error"
                              invisible={cartItems.length === 0}
                            >
                              <BsCart3 className="h-6 w-6" />
                            </Badge>
                          </IconButton>
                          <div>
                            <span className="whitespace-nowrap text-sm text-gray-500">
                              {t("total")}
                            </span>
                            <h5 className="whitespace-nowrap text-sm font-semibold">
                              {formatMoney(total)}₫
                            </h5>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <Search isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Navbar;
