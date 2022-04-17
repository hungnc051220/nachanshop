import React from "react";
import { Menu, Dropdown } from "antd";
import { Link } from "react-router-dom";
import navbarItems from "../data/navbar.json";

const Navbar = () => {
  return (
    <div className="tw-hidden tw-mx-auto lg:tw-flex tw-max-w-7xl tw-items-center tw-justify-between tw-py-4 tw-space-x-4">
      {navbarItems.map((item) => {
        const subMenu = item.sub_items ? (
          <Menu className="tw-rounded-lg tw-mt-2">
            {item.sub_items.map((sub) => (
              <Menu.Item>
                <Link to={sub.route}>{sub.title}</Link>
              </Menu.Item>
            ))}
          </Menu>
        ) : (
          <></>
        );
        return (
          <Dropdown overlay={subMenu} placement="bottomLeft">
            <Link
              to={item.route}
              className="ant-dropdown-link tw-uppercase tw-font-semibold tw-text-gray-900 hover:tw-text-red-500"
            >
              {item.title}
            </Link>
          </Dropdown>
        );
      })}
    </div>
  );
};

export default Navbar;
