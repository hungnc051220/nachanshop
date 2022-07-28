import React from "react";
import { Outlet } from "react-router-dom";
import { Footer, MainHeader, Navbar, TopHeader } from "../components";

const WebLayout = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="bg-gray-50">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default WebLayout;
