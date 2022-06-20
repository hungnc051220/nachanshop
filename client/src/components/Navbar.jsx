import { Link } from "react-router-dom";
import { Fragment, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
  UserIcon,
  XIcon,
} from "@heroicons/react/outline";
import { useTranslation } from "react-i18next";
import Search from "./Search";
import { formatMoney } from "../utils/commonFunction";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { BsCart3 } from "react-icons/bs";
import { useSelector } from "react-redux";

const categories = [
  {
    code: "cssd",
    name: "Chăm sóc sắc đẹp",
    route: "/products?type=cssd",
    subItems: [
      {
        name: "Chăm sóc da",
        subItems: [
          { name: "Kem dưỡng da", href: "#" },
          { name: "Rửa mặt", href: "#" },
          { name: "Mặt nạ dưỡng mặt", href: "#" },
          { name: "Nước hoa hồng", href: "#" },
          { name: "Tẩy da chết", href: "#" },
          { name: "Tẩy trang", href: "#" },
          { name: "Tinh chất dưỡng da", href: "#" },
          { name: "Phụ kiện chăm sóc da", href: "#" },
        ],
      },
      {
        name: "Chăm sóc tóc",
        subItems: [
          { name: "Dưỡng tóc", href: "#" },
          { name: "Dầu gội, dầu xả", href: "#" },
          { name: "Nhuộm tóc", href: "#" },
          { name: "Dụng cụ chăm sóc tóc", href: "#" },
        ],
      },
      {
        name: "Chăm sóc cơ thể",
        subItems: [
          { name: "Chống nắng", href: "#" },
          { name: "Dưỡng môi", href: "#" },
          { name: "Dưỡng thể", href: "#" },
          { name: "Khử mùi mồ hôi", href: "#" },
          { name: "Sữa tắm", href: "#" },
          { name: "Tẩy lông", href: "#" },
          { name: "Dao cạo, bấm móng", href: "#" },
        ],
      },
      {
        name: "Thực phẩm làm đẹp",
        subItems: [
          { name: "Chống lão hoá", href: "#" },
          { name: "Collagen", href: "#" },
          { name: "Làm đẹp da", href: "#" },
          { name: "Giảm cân", href: "#" },
        ],
      },
      {
        name: "Trang điểm",
        subItems: [
          { name: "Kem nền", href: "#" },
          { name: "Phấn", href: "#" },
          { name: "Son môi", href: "#" },
          { name: "Trang điểm mắt", href: "#" },
          { name: "Dụng cụ trang điểm", href: "#" },
        ],
      },
    ],
  },
  {
    code: "cssk",
    name: "Chăm sóc sức khoẻ",
    route: "/products?type=cssk",
    subItems: [
      {
        name: "Thực phẩm chức năng",
        subItems: [
          { name: "Bổ sung canxi", href: "#" },
          { name: "Bổ sung DHA", href: "#" },
          { name: "Bổ sung Glocosamin", href: "#" },
          { name: "Bổ sung Vitamin", href: "#" },
          { name: "Ổn định huyết áp", href: "#" },
          { name: "Tảo", href: "#" },
          { name: "Chống lão hóa", href: "#" },
          { name: "Collagen", href: "#" },
          { name: "Làm đẹp da", href: "#" },
          { name: "Giảm cân", href: "#" },
        ],
      },
      {
        name: "Chăm sóc răng miệng",
        subItems: [
          { name: "Bàn chải đánh răng", href: "#" },
          { name: "Kem đánh răng", href: "#" },
          { name: "Khử mùi răng miệng", href: "#" },
          { name: "Vật dụng nha khoa", href: "#" },
        ],
      },
      {
        name: "Chăm sóc tai, mắt, mũi",
        subItems: [
          { name: "Chăm sóc tai", href: "#" },
          { name: "Chăm sóc mắt", href: "#" },
          { name: "Chăm sóc mũi", href: "#" },
        ],
      },
    ],
  },
  {
    code: "mvb",
    name: "Mẹ và Bé",
    route: "/products?type=mvb",
    subItems: [
      {
        name: "Thực phẩm cho bé",
        subItems: [
          { name: "Bánh ăn dặm", href: "#" },
          { name: "Bột ăn dặm", href: "#" },
          { name: "Cháo soup ăn dặm", href: "#" },
          { name: "Cơm trộn", href: "#" },
          { name: "Mỳ ăn dặm", href: "#" },
          { name: "Nước ép cho bé", href: "#" },
          { name: "Sốt ăn dặm", href: "#" },
          { name: "Thạch bổ sung vitamin", href: "#" },
          { name: "Trà lúa mạch", href: "#" },
        ],
      },
      {
        name: "Chăm sóc cơ thể bé",
        subItems: [
          { name: "Chống muỗi, chống côn trùng", href: "#" },
          { name: "Chống nắng cho bé", href: "#" },
          { name: "Hạ sốt, trị ho, sổ mũi", href: "#" },
          { name: "Kem dưỡng massage cho bé", href: "#" },
          { name: "Bịt ổ điện, chặn cửa", href: "#" },
        ],
      },
      {
        name: "Dành cho mẹ bầu",
        subItems: [
          { name: "Thực phẩm chức năng", href: "#" },
          { name: "Sữa bầu", href: "#" },
          { name: "Thấm sữa", href: "#" },
        ],
      },
    ],
  },
  {
    code: "tp",
    name: "Thực phẩm",
    route: "/products?type=tp",
    subItems: [
      {
        name: "Đồ uống, pha chế",
        subItems: [
          { name: "Đồ uống có ga", href: "#" },
          { name: "Nguyên liệu pha chế", href: "#" },
          { name: "Nước hoa quả", href: "#" },
          { name: "Thức uống từ sữa", href: "#" },
          { name: "Trà gói, hộp", href: "#" },
          { name: "Trà, cà phê đóng sẵn", href: "#" },
        ],
      },
      {
        name: "Bánh kẹo, đồ ăn vặt",
        subItems: [
          { name: "Bánh", href: "#" },
          { name: "Bánh kẹo cho trẻ em", href: "#" },
          { name: "Hoa quả hạt khô", href: "#" },
          { name: "Ngũ cốc", href: "#" },
          { name: "Thạch", href: "#" },
        ],
      },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const { t } = useTranslation();
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
                    <a href="#">
                      <span className="sr-only">Workflow</span>
                      <img
                        className="h-auto w-40"
                        src="/images/logo.png"
                        alt="logo"
                      />
                    </a>
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
                              {({ open }) => (
                                <>
                                  <div className="relative flex">
                                    <Popover.Button
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
                                              {category.subItems.map(
                                                (item, index) => (
                                                  <div key={index}>
                                                    <p
                                                      id={`desktop-featured-heading-${categoryIdx}`}
                                                      className="font-medium text-gray-900"
                                                    >
                                                      {item.name}
                                                    </p>
                                                    <ul
                                                      role="list"
                                                      aria-labelledby={`desktop-featured-heading-${categoryIdx}`}
                                                      className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                    >
                                                      {item.subItems.map(
                                                        (item) => (
                                                          <li
                                                            key={item.name}
                                                            className="flex"
                                                          >
                                                            <a
                                                              href={item.href}
                                                              className="hover:text-gray-800"
                                                            >
                                                              {item.name}
                                                            </a>
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
    // <nav className="z-20 mx-auto hidden max-w-7xl px-4 sm:px-6 lg:block lg:px-8">
    //   <ul className="relative flex justify-center gap-5">
    //     {categories.map((item) => (
    //       <li key={item.title} className="group relative">
    //         <Link
    //           to={item.route}
    //           className="relative block py-4 text-sm font-semibold uppercase transition duration-300 ease-in-out hover:text-red-500"
    //         >
    //           {item.title}
    //         </Link>
    //         {item?.sub_items && (
    //           <ul className="pointer-events-none invisible absolute top-full left-0 z-20 w-[200px] translate-y-12 rounded-lg border border-gray-200 bg-white py-2 opacity-0 shadow-md transition duration-300 ease-in-out group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
    //             {item.sub_items.map((subItem) => (
    //               <li key={subItem.title}>
    //                 <Link
    //                   to={subItem.route}
    //                   className="block cursor-pointer py-1 px-5 text-base capitalize transition duration-300 ease-in-out hover:text-red-500"
    //                 >
    //                   {subItem.title}
    //                 </Link>
    //               </li>
    //             ))}
    //           </ul>
    //         )}
    //       </li>
    //     ))}
    //   </ul>
    // </nav>
  );
};

export default Navbar;
