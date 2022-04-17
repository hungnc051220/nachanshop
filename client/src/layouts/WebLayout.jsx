import React from "react";
import { Outlet } from "react-router-dom";
import { Footer, MainHeader, Navbar, TopHeader } from "../components";

const WebLayout = () => {
  return (
    <>
      <TopHeader />
      <MainHeader />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default WebLayout;
