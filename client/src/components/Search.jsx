import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Combobox, Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import { fetchProductsBySearch } from "../api";
import { Trans, useTranslation } from "react-i18next";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { typeParent } from "../data/categoriesSelect";

const Search = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const abortController = useRef(null);

  useEffect(() => {
    const getProducts = async () => {
      if (!query || query.trim() === "") {
        return;
      }
      setLoading(true);

      if (abortController.current) abortController.current.abort();
      abortController.current = new AbortController();
      const { signal } = abortController.current;

      const response = await fetchProductsBySearch(query, signal).catch(
        (error) => console.log(error)
      );

      if (response) {
        setProducts(response.data);
      }
      setLoading(false);
    };

    getProducts();
  }, [query]);

  const getNameType = (type) => {
    return typeParent.find((x) => x.id === type).name;
  };

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "z" && (event.metaKey || event.ctrlKey)) {
        setIsOpen(!isOpen);
      }
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <Transition.Root
      show={isOpen}
      as={Fragment}
      afterLeave={() => {
        setQuery("");
        setProducts([]);
      }}
    >
      <Dialog onClose={setIsOpen} className="fixed inset-0 z-10 p-4 pt-[25vh]">
        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500/75" />
        </Transition.Child>
        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            onChange={(id) => {
              setIsOpen(false);
              navigate(`products/${id}`);
            }}
            as="div"
            className="relative mx-auto max-w-xl divide-y divide-gray-100 rounded-xl bg-white shadow-2xl ring-1 ring-black/5"
          >
            <div className="flex items-center px-4">
              <SearchIcon className="h-6 w-6 text-gray-500" />
              <Combobox.Input
                onChange={(event) => {
                  setQuery(event.target.value);
                }}
                className="h-12 w-full border-0 bg-transparent p-4 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-0"
                placeholder="Search..."
              />
            </div>
            {!loading && products.length > 0 && (
              <Combobox.Options className="max-h-96 overflow-y-auto p-4 text-sm">
                {loading ? (
                  <Box className="flex items-center justify-center">
                    <CircularProgress />
                  </Box>
                ) : (
                  products?.map((item) => (
                    <Combobox.Option value={item._id} key={item._id}>
                      {({ active }) => (
                        <div
                          className={`flex cursor-pointer items-center gap-2 rounded-lg p-4 ${
                            active
                              ? "bg-indigo-500 text-white"
                              : "bg-white text-gray-900"
                          }`}
                        >
                          <img
                            className="h-10 w-10 rounded-lg"
                            src={`${import.meta.env.VITE_API_URL}/${
                              item.productImage[0]
                            }`}
                            alt=""
                          />
                          <div>
                            <p className="font-medium">
                              {getNameType(item.typeParent)}
                            </p>
                            <span>{item.name}</span>
                          </div>
                        </div>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            )}
            {query && products.length === 0 && (
              <p className="p-4 text-sm text-gray-500">{t("noResult")}</p>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default Search;
