import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";
import { HomeIcon } from "@heroicons/react/solid";
import {
  typeParent,
  typeChild as typeChildData,
} from "../data/categoriesSelect";

const Breadcrumbs = ({ product }) => {
  const location = useLocation();
  let { type, typeChild } = queryString.parse(location.search);

  if (product) {
    type = product.typeParent;
    typeChild = product.typeChild;
  }

  const [pages, setPages] = useState([]);

  const getNameType = (value) => {
    return typeParent.find((x) => x.id === value).name;
  };

  const getNameChildType = (value) => {
    return typeChildData[type].find((x) => x.id === value).name;
  };

  useEffect(() => {
    if (type) setPages([{ name: getNameType(type), href: `?type=${type}` }]);

    if (typeChild)
      setPages([
        { name: getNameType(type), href: `/products?type=${type}` },
        {
          name: getNameChildType(typeChild),
          href: `/products?type=${type}&typeChild=${typeChild}`,
        },
      ]);
  }, [type, typeChild]);

  return (
    <nav className="flex py-2 px-4 sm:px-6" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <Link to="/" className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
            </Link>
          </div>
        </li>
        {pages.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <svg
                className="h-5 w-5 flex-shrink-0 text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
              <Link
                to={page.href}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                aria-current={page.current ? "page" : undefined}
              >
                {page.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
