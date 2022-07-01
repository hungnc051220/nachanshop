import { Link, useNavigate } from "react-router-dom";
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
    route: "/products/cham-soc-sac-dep",
    subCategories: [
      {
        name: "Chăm sóc da",
        route: "/products/cham-soc-sac-dep/cham-soc-da",
        subCategories: [
          { name: "Kem dưỡng da", href: "/products/cham-soc-sac-dep/cham-soc-da/kem-duong" },
          { name: "Rửa mặt", href: "/products/cham-soc-sac-dep/cham-soc-da/rua-mat" },
          { name: "Mặt nạ dưỡng mặt", href: "/products/cham-soc-sac-dep/cham-soc-da/mat-na-duong-da" },
          { name: "Nước hoa hồng", href: "/products/cham-soc-sac-dep/cham-soc-da/nuoc-hoa-hong" },
          { name: "Tẩy da chết", href: "/products/cham-soc-sac-dep/cham-soc-da/tay-da-chet" },
          { name: "Tẩy trang", href: "/products/cham-soc-sac-dep/cham-soc-da/tay-trang" },
          { name: "Tinh chất dưỡng da", href: "/products/cham-soc-sac-dep/cham-soc-da/tinh-chat-duong-da" },
          { name: "Phụ kiện chăm sóc da", href: "/products/cham-soc-sac-dep/cham-soc-da/phu-kien-cham-soc-da" },
        ],
      },
      {
        name: "Chăm sóc tóc",
        route: "/products/cham-soc-sac-dep/cham-soc-toc",
        subCategories: [
          { name: "Dưỡng tóc", href: "/products/cham-soc-sac-dep/cham-soc-toc/duong-toc" },
          { name: "Dầu gội, dầu xả", href: "/products/cham-soc-sac-dep/cham-soc-toc/dau-goi-dau-xa" },
          { name: "Nhuộm tóc", href: "/products/cham-soc-sac-dep/cham-soc-toc/nhuom-toc" },
          { name: "Dụng cụ chăm sóc tóc", href: "/products/cham-soc-sac-dep/cham-soc-toc/dung-cu-cham-soc-toc" },
        ],
      },
      {
        name: "Chăm sóc cơ thể",
        route: "/products/cham-soc-sac-dep/cham-soc-co-the",
        subCategories: [
          { name: "Chống nắng", href: "/products/cham-soc-sac-dep/cham-soc-co-the/chong-nang" },
          { name: "Dưỡng môi", href: "/products/cham-soc-sac-dep/cham-soc-co-the/duong-moi" },
          { name: "Dưỡng thể", href: "/products/cham-soc-sac-dep/cham-soc-co-the/duong-the" },
          { name: "Khử mùi mồ hôi", href: "/products/cham-soc-sac-dep/cham-soc-co-the/khu-mui-mo-hoi" },
          { name: "Sữa tắm", href: "/products/cham-soc-sac-dep/cham-soc-co-the/sua-tam" },
          { name: "Tẩy lông", href: "/products/cham-soc-sac-dep/cham-soc-co-the/tay-long" },
          { name: "Dao cạo, bấm móng", href: "/products/cham-soc-sac-dep/cham-soc-co-the/dao-cao-bam-mong" },
        ],
      },
      {
        name: "Thực phẩm làm đẹp",
        route: "/products/cham-soc-sac-dep/thuc-pham-lam-dep",
        subCategories: [
          { name: "Chống lão hoá", href: "/products/cham-soc-sac-dep/thuc-pham-lam-dep/chong-lao-hoa" },
          { name: "Collagen", href: "/products/cham-soc-sac-dep/thuc-pham-lam-dep/collagen" },
          { name: "Làm đẹp da", href: "/products/cham-soc-sac-dep/thuc-pham-lam-dep/lam-dep-da" },
          { name: "Giảm cân", href: "/products/cham-soc-sac-dep/thuc-pham-lam-dep/giam-can" },
        ],
      },
      {
        name: "Trang điểm",
        route: "/products/cham-soc-sac-dep/trang-diem",
        subCategories: [
          { name: "Kem nền", href: "/products/cham-soc-sac-dep/trang-diem/kem-nen" },
          { name: "Phấn", href: "/products/cham-soc-sac-dep/trang-diem/phan" },
          { name: "Son môi", href: "/products/cham-soc-sac-dep/trang-diem/son-moi" },
          { name: "Trang điểm mắt", href: "/products/cham-soc-sac-dep/trang-diem/trang-diem-mat" },
          { name: "Dụng cụ trang điểm", href: "/products/cham-soc-sac-dep/trang-diem/dung-cu-trang-diem" },
        ],
      },
    ],
  },
  {
    code: "cssk",
    name: "Chăm sóc sức khoẻ",
    route: "/products/cham-soc-suc-khoe",
    subCategories: [
      {
        name: "Thực phẩm chức năng",
        route: "/products/cham-soc-suc-khoe/thuc-pham-chuc-nang",
        subCategories: [
          { name: "Bổ sung canxi", href: "/products/cham-soc-suc-khoe/thuc-pham-chuc-nang/bo-xung-canxi" },
          { name: "Bổ sung DHA", href: "/products/cham-soc-suc-khoe/thuc-pham-chuc-nang/bo-sung-dha" },
          { name: "Bổ sung Glocosamin", href: "/products/cham-soc-suc-khoe/thuc-pham-chuc-nang/bo-sung-glocosamin" },
          { name: "Bổ sung Vitamin", href: "/products/cham-soc-suc-khoe/thuc-pham-chuc-nang/bo-sung-vitamin" },
          { name: "Ổn định huyết áp", href: "/products/cham-soc-suc-khoe/thuc-pham-chuc-nang/on-dinh-huyet-ap" },
          { name: "Tảo", href: "/products/cham-soc-suc-khoe/thuc-pham-chuc-nang/tao" },
          { name: "Chống lão hóa", href: "/products/cham-soc-suc-khoe/thuc-pham-chuc-nang/chong-lao-hoa" },
          { name: "Collagen", href: "/products/cham-soc-suc-khoe/thuc-pham-chuc-nang/collagen" },
          { name: "Làm đẹp da", href: "/products/cham-soc-suc-khoe/thuc-pham-chuc-nang/lam-dep-da" },
          { name: "Giảm cân", href: "/products/cham-soc-suc-khoe/thuc-pham-chuc-nang/giam-can" },
        ],
      },
      {
        name: "Chăm sóc răng miệng",
        route: "/products/cham-soc-suc-khoe/cham-soc-rang-mieng",
        subCategories: [
          { name: "Bàn chải đánh răng", href: "/products/cham-soc-suc-khoe/cham-soc-rang-mieng/ban-chai-danh-rang" },
          { name: "Kem đánh răng", href: "/products/cham-soc-suc-khoe/cham-soc-rang-mieng/kem-danh-rang" },
          { name: "Khử mùi răng miệng", href: "/products/cham-soc-suc-khoe/cham-soc-rang-mieng/khu-mui-rang-mieng" },
          { name: "Vật dụng nha khoa", href: "/products/cham-soc-suc-khoe/cham-soc-rang-mieng/vat-dung-nha-khoa" },
        ],
      },
      {
        name: "Chăm sóc tai, mắt, mũi",
        route: "/products/cham-soc-suc-khoe/cham-soc-tai-mat-mui",
        subCategories: [
          { name: "Chăm sóc tai", href: "/products/cham-soc-suc-khoe/cham-soc-tai-mat-mui/cham-soc-tai" },
          { name: "Chăm sóc mắt", href: "/products/cham-soc-suc-khoe/cham-soc-tai-mat-mui/cham-soc-mat" },
          { name: "Chăm sóc mũi", href: "/products/cham-soc-suc-khoe/cham-soc-tai-mat-mui/cham-soc-mui" },
        ],
      },
    ],
  },
  {
    code: "mvb",
    name: "Mẹ và Bé",
    route: "/products/me-va-be",
    subCategories: [
      {
        name: "Thực phẩm cho bé",
        route: "/products/me-va-be/thuc-pham-cho-be",
        subCategories: [
          { name: "Bánh ăn dặm", href: "/products/me-va-be/thuc-pham-cho-be/banh-an-dam" },
          { name: "Bột ăn dặm", href: "/products/me-va-be/thuc-pham-cho-be/bot-an-dam" },
          { name: "Cháo soup ăn dặm", href: "/products/me-va-be/thuc-pham-cho-be/chao-soup-an-dam" },
          { name: "Cơm trộn", href: "/products/me-va-be/thuc-pham-cho-be/com-tron" },
          { name: "Mỳ ăn dặm", href: "/products/me-va-be/thuc-pham-cho-be/my-an-dam" },
          { name: "Nước ép cho bé", href: "/products/me-va-be/thuc-pham-cho-be/nuoc-ep-cho-be" },
          { name: "Sốt ăn dặm", href: "/products/me-va-be/thuc-pham-cho-be/sot-an-dam" },
          { name: "Thạch bổ sung vitamin", href: "/products/me-va-be/thuc-pham-cho-be/thach-bo-sung-vitamin" },
          { name: "Trà lúa mạch", href: "/products/me-va-be/thuc-pham-cho-be/tra-lua-mach" },
        ],
      },
      {
        name: "Chăm sóc cơ thể bé",
        route: "/products/me-va-be/cham-soc-co-the-be",
        subCategories: [
          { name: "Chống muỗi, chống côn trùng", href: "/products/me-va-be/cham-soc-co-the-be/chong-muoi-chong-con-trung" },
          { name: "Chống nắng cho bé", href: "/products/me-va-be/cham-soc-co-the-be/chong-nang-cho-be" },
          { name: "Hạ sốt, trị ho, sổ mũi", href: "/products/me-va-be/cham-soc-co-the-be/ha-sot-tri-ho-so-mui" },
          { name: "Kem dưỡng massage cho bé", href: "/products/me-va-be/cham-soc-co-the-be/kem-duong-massage-cho-be" },
          { name: "Bịt ổ điện, chặn cửa", href: "/products/me-va-be/cham-soc-co-the-be/bit-o-dien-chan-cua" },
        ],
      },
      {
        name: "Dành cho mẹ bầu",
        route: "/products/me-va-be/danh-cho-me-bau",
        subCategories: [
          { name: "Thực phẩm chức năng", href: "/products/me-va-be/danh-cho-me-bau/thuc-pham-chuc-nang" },
          { name: "Sữa bầu", href: "/products/me-va-be/danh-cho-me-bau/sua-bau" },
          { name: "Thấm sữa", href: "/products/me-va-be/danh-cho-me-bau/tham-sua" },
        ],
      },
    ],
  },
  {
    code: "tp",
    name: "Thực phẩm",
    route: "/products/thuc-pham",
    subCategories: [
      {
        name: "Đồ uống, pha chế",
        route: "/products/thuc-pham/do-uong-pha-che",
        subCategories: [
          { name: "Đồ uống có ga", href: "/products/thuc-pham/do-uong-pha-che/do-uong-co-ga" },
          { name: "Nguyên liệu pha chế", href: "/products/thuc-pham/do-uong-pha-che/nguyen-lieu-pha-che" },
          { name: "Nước hoa quả", href: "/products/thuc-pham/do-uong-pha-che/nuoc-hoa-qua" },
          { name: "Thức uống từ sữa", href: "/products/thuc-pham/do-uong-pha-che/thuc-uong-tu-sua" },
          { name: "Trà gói, hộp", href: "/products/thuc-pham/do-uong-pha-che/tra-goi-hop" },
          { name: "Trà, cà phê đóng sẵn", href: "/products/thuc-pham/do-uong-pha-che/tra-ca-phe-dong-san" },
        ],
      },
      {
        name: "Bánh kẹo, đồ ăn vặt",
        route: "/products/thuc-pham/banh-keo-do-an",
        subCategories: [
          { name: "Bánh", href: "/products/thuc-pham/banh-keo-do-an/banh" },
          { name: "Bánh kẹo cho trẻ em", href: "/products/thuc-pham/banh-keo-do-an/banh-keo-cho-tre-em" },
          { name: "Hoa quả hạt khô", href: "/products/thuc-pham/banh-keo-do-an/hoa-qua-hat-kho" },
          { name: "Ngũ cốc", href: "/products/thuc-pham/banh-keo-do-an/ngu-coc" },
          { name: "Thạch", href: "/products/thuc-pham/banh-keo-do-an/thach" },
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
                                      onClick={() => navigate(category.route)}
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
                                                    <Link to={item.route}
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
                                                        (item) => (
                                                          <li
                                                            key={item.name}
                                                            className="flex"
                                                          >
                                                            <Link
                                                              to={item.href}
                                                              className="hover:text-gray-800"
                                                            >
                                                              {item.name}
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
