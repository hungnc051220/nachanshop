import { Dialog, Menu, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import {
  ChevronDownIcon,
  FilterIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Breadcrumbs } from "../components";
import { typeParent } from "../data/categoriesSelect";
import { addToCart } from "../features/cart/cartSlice";
import { useGetProductsQuery } from "../services/apiSlice";
import { formatMoney } from "../utils/commonFunction";
import { removeAccents } from "../utils/commonFunction";
import Pagination from "@mui/material/Pagination";

const sortOptions = [
  { name: "Phổ biến nhất", href: "#", current: true },
  { name: "Đánh giá tốt nhất", href: "#", current: false },
  { name: "Mới nhất", href: "#", current: false },
  { name: "Giá từ thấp đến cao", href: "#", current: false },
  { name: "Giá từ cao đến thấp", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Products = () => {
  let { mainCategory, category, subCategory } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetProductsQuery({
    page,
    mainCategory,
    category,
    subCategory,
    limit: 20,
  });

  const handleChangePagination = (event, value) => {
    setPage(value);
  }

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl py-2 pb-16">
        <Breadcrumbs />

        <div className="mt-2 rounded-xl bg-white shadow">
          <div>
            {/* Mobile filter dialog */}
            <Transition.Root show={mobileFiltersOpen} as={Fragment}>
              <Dialog
                as="div"
                className="fixed inset-0 z-40 flex lg:hidden"
                onClose={setMobileFiltersOpen}
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
                  <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">
                        Filters
                      </h2>
                      <button
                        type="button"
                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </Transition.Child>
              </Dialog>
            </Transition.Root>

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-baseline justify-between border-b border-gray-200 pt-6 pb-6">
                <h1 className="text-2xl font-semibold tracking-tight text-gray-900"></h1>

                <div className="flex items-center">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        Sắp xếp
                        <ChevronDownIcon
                          className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
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
                      <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {sortOptions.map((option) => (
                            <Menu.Item key={option.name}>
                              {({ active }) => (
                                <a
                                  href={option.href}
                                  className={classNames(
                                    option.current
                                      ? "font-medium text-gray-900"
                                      : "text-gray-500",
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm"
                                  )}
                                >
                                  {option.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>

                  <button
                    type="button"
                    className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                  >
                    <span className="sr-only">View grid</span>
                    <ViewGridIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                    onClick={() => setMobileFiltersOpen(true)}
                  >
                    <span className="sr-only">Filters</span>
                    <FilterIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <section
                aria-labelledby="products-heading"
                className="pt-6 pb-24"
              >
                <h2 id="products-heading" className="sr-only">
                  Products
                </h2>

                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                  {/* Filters */}
                  <form className="hidden lg:block">
                    <h3 className="sr-only">Categories</h3>
                    {subCategories.length > 0 && (
                      <ul
                        role="list"
                        className="space-y-4 pb-6 text-sm font-medium text-gray-900"
                      >
                        {subCategories.map((category) => (
                          <li key={category.title}>
                            <Link
                              to={category.route}
                              className="hover:text-red-500"
                            >
                              {category.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </form>

                  {/* Product grid */}
                  <div className="lg:col-span-4">
                    {isLoading ? (
                      <Box className="flex items-center justify-center">
                        <CircularProgress />
                      </Box>
                    ) : (
                      <div className="mb-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {data?.content?.length > 0 &&
                          data?.content?.map((product) => {
                            return (
                              <div
                                className="group overflow-hidden rounded-lg border border-solid border-gray-200 bg-white transition-all duration-200 ease-in-out hover:shadow-xl"
                                key={product._id}
                              >
                                <div className="p-5">
                                  <Link
                                    to={`/${product.mainCategory}/${
                                      product.category
                                    }/${product.subCategory}/${removeAccents(
                                      product.name
                                    )}?id=${product._id}`}
                                    onClick={() => {
                                      window.scrollTo(0, 0);
                                    }}
                                  >
                                    <img
                                      src={`${import.meta.env.VITE_API_URL}/${
                                        product.productImage[0]
                                      }`}
                                      alt={product.name}
                                    />
                                  </Link>
                                </div>

                                <div className="p-5">
                                  <Link
                                    to={`/${mainCategory}/${category}/${subCategory}/${product._id}`}
                                    className="block text-base font-medium uppercase text-red-500"
                                    onClick={() => {
                                      window.scrollTo(0, 0);
                                    }}
                                  >
                                    {product?.typeChildName}
                                  </Link>

                                  <Link
                                    to={`/${mainCategory}/${category}/${subCategory}/${product._id}`}
                                    className="inline-block h-24 py-2"
                                    onClick={() => {
                                      window.scrollTo(0, 0);
                                    }}
                                  >
                                    <h3 className="text-sm text-gray-600 line-clamp-2">
                                      {product.name}
                                    </h3>
                                  </Link>

                                  <div className="flex flex-col gap-2">
                                    <p className="mb-0 text-xl font-semibold">
                                      {formatMoney(product.price)}₫
                                    </p>
                                    <Button
                                      variant="contained"
                                      color="error"
                                      size="small"
                                      onClick={() =>
                                        dispatch(addToCart(product))
                                      }
                                    >
                                      {t("buyNow")}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    )}
                  </div>
                </div>
                <div className="float-right">
                  <Pagination
                    count={Math.ceil(data?.total / 20)}
                    shape="rounded"
                    onChange={handleChangePagination}
                  />
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
