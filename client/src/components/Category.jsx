import React from "react";
import { Link } from "react-router-dom";
import { formatMoney, removeAccents } from "../utils/commonFunction";
import { addToCart } from "../features/cart/cartSlice";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import Skeleton from "@mui/material/Skeleton";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Category = ({ name, products, icon, link, loading, image, reverse }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <div className="rounded-lg bg-white p-6 pt-6 shadow">
      <div className="mb-6 px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
        <div className="flex items-center justify-center gap-2">
          <div className="rounded-lg border border-gray-200 p-1">
            <img src={`/images/${icon}.png`} alt="icon" className="h-5 w-5" />
          </div>
          <h2
            id="category-heading"
            className="text-xl font-semibold tracking-tight text-gray-900"
          >
            {t(name)}
          </h2>
        </div>
        <Link
          to={link}
          className="hidden text-sm font-semibold text-indigo-600 hover:scale-110 hover:text-indigo-500 sm:block"
        >
          {t("viewAll")}
          <span aria-hidden="true"> →</span>
        </Link>
      </div>

      {loading ? (
        <Box className="flex items-center justify-center">
          <CircularProgress />
        </Box>
      ) : (
        <div className={`w-full flex gap-2 ${reverse ? "flex-row-reverse" : ""}`}>
          <div className="grid-cols grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-4/6">
            {products?.map((product) => (
              <div
                key={product._id}
                className="group overflow-hidden rounded-lg border border-solid border-gray-200 bg-white transition-all duration-200 ease-in-out hover:shadow-xl"
              >
                <div className="relative p-5">
                  <Link
                    to={`/${product.mainCategory}/${product.category}/${
                      product.subCategory
                    }/${removeAccents(product.name)}?id=${product._id}`}
                    onClick={() => {
                      window.scrollTo(0, 0);
                    }}
                  >
                    <img
                      src={`${import.meta.env.VITE_API_URL}/${
                        product.productImage[0]
                      }`}
                      alt={product.name}
                      className="product-img default"
                    />
                  </Link>
                </div>

                <div className="p-5">
                  <Link
                    to={`/${product.mainCategory}/${product.category}/${
                      product.subCategory
                    }/${removeAccents(product.name)}?id=${product._id}`}
                    className="block text-base font-medium uppercase text-red-500"
                    onClick={() => {
                      window.scrollTo(0, 0);
                    }}
                  >
                    {product?.typeChildName}
                  </Link>

                  <Link
                    to={`/${product.mainCategory}/${product.category}/${
                      product.subCategory
                    }/${removeAccents(product.name)}?id=${product._id}`}
                    className="line-clamp-2"
                  >
                    <h3 className="text-sm text-gray-600">{product.name}</h3>
                  </Link>

                  <div className="mt-2 flex flex-col gap-2">
                    <p className="mb-0 text-xl font-semibold">
                      {formatMoney(product.price)}₫
                    </p>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => dispatch(addToCart(product))}
                    >
                      {t("buyNow")}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-2/6 relative overflow-hidden">
            <img className="absolute inset-0 w-full h-full object-cover object-center rounded-lg" src={`/images/${image}.png`} alt={image}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
