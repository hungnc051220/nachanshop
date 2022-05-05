import React from "react";
import { Link } from "react-router-dom";
import categories from "../data/categories.json";

const Navbar = () => {
  return (
    <nav className="z-20 mx-auto hidden max-w-7xl px-4 sm:px-6 lg:block lg:px-8">
      <ul className="relative flex justify-center gap-5">
        {categories.map((item) => (
          <li key={item.title} className="group relative">
            <Link
              to={item.route}
              className="relative block py-4 font-semibold transition duration-300 ease-in-out hover:text-red-500"
            >
              {item.title}
            </Link>
            {item?.sub_items && (
              <ul className="pointer-events-none invisible absolute top-full left-0 z-20 w-[200px] translate-y-12 rounded-lg border border-gray-200 bg-white py-2 opacity-0 shadow-md transition duration-300 ease-in-out group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                {item.sub_items.map((subItem) => (
                  <li key={subItem.title}>
                    <Link
                      to={subItem.route}
                      className="block cursor-pointer py-1 px-5 text-base capitalize transition duration-300 ease-in-out hover:text-red-500"
                    >
                      {subItem.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
