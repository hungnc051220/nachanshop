import React from "react";
import { Outlet } from "react-router-dom";
import { Footer, MainHeader, Navbar, TopHeader } from "../components";

const WebLayout = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="bg-pink-50 relative">
        <img src="/images/shape-bg.png" alt="shape background" className="absolute inset-0 w-full h-full object-cover mix-blend-soft-light" />
        <Outlet/>
      </main>
      <Footer />
    </>
  );
};

export default WebLayout;
