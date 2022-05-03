import React from "react";
import { Link } from "react-router-dom";
import categories from "../data/categories.json";

const Navbar = () => {
  return (
    <nav className="z-10 mx-auto hidden max-w-7xl px-4 sm:px-6 lg:block lg:px-8">
      <ul className="flex items-center justify-between">
        {categories.map((item) => (
          <li key={item.title} className="group relative">
            <Link
              to={item.route}
              className="inline-block cursor-pointer border-b-2 border-transparent py-3 font-medium group-hover:border-red-500 group-hover:text-red-500"
            >
              {item.title}
            </Link>
            {item?.sub_items && (
              <ul className="custom-shadow invisible absolute top-full z-50 mt-14 min-w-[200px] overflow-hidden rounded-lg bg-white opacity-0 transition-all duration-300 group-hover:visible group-hover:mt-0 group-hover:opacity-100">
                {item.sub_items.map((subItem) => (
                  <li key={subItem.title}>
                    <Link
                      to={subItem.route}
                      className="block cursor-pointer py-2 px-4 hover:bg-gray-100"
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
