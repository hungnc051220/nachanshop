import React from "react";
import { Link } from "react-router-dom";
import navbarItems from "../data/navbar.json";

const Navbar = () => {
  return (
    <nav className="z-10 mx-auto max-w-7xl">
      <ul className="flex items-center justify-between">
        {navbarItems.map((item) => (
          <li key={item.title} className="group relative">
            <Link
              to={item.route}
              className="inline-block cursor-pointer border-b-2 border-transparent py-3 font-medium group-hover:border-red-500 group-hover:text-red-500"
            >
              {item.title}
            </Link>
            {item?.sub_items && (
              <ul className="custom-shadow invisible absolute top-full z-50 mt-14 min-w-[200px] overflow-hidden rounded-lg bg-white opacity-0 transition-all duration-500 group-hover:visible group-hover:mt-0 group-hover:opacity-100">
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
    // <div className="hidden mx-auto lg:flex max-w-7xl items-center justify-between py-4 space-x-4">
    //   {navbarItems.map((item) => {
    //     const subMenu = item.sub_items ? (
    //       <Menu className="rounded-lg mt-2">
    //         {item.sub_items.map((sub) => (
    //           <Menu.Item>
    //             <Link to={sub.route}>{sub.title}</Link>
    //           </Menu.Item>
    //         ))}
    //       </Menu>
    //     ) : (
    //       <></>
    //     );
    //     return (
    //       <Dropdown overlay={subMenu} placement="bottomLeft">
    //         <Link
    //           to={item.route}
    //           className="ant-dropdown-link uppercase font-semibold text-gray-900 hover:text-red-500"
    //         >
    //           {item.title}
    //         </Link>
    //       </Dropdown>
    //     );
    //   })}
    // </div>
  );
};

export default Navbar;
