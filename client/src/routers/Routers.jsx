import React from "react";
import { Routes, Route } from "react-router-dom";
import { WebLayout, AdminLayout } from "../layouts";
import {
  Home,
  Products,
  ProductDetail,
  ShoppingCart,
  Login,
  Dashboard,
  UserManagement,
  ProductManagement,
  OrderManagement,
  History,
  Report,
  Setting,
  Support,
  Security,
  Checkout,
  Success,
} from "../pages";
import ProtectedRoutes from "./ProtectedRoutes";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<WebLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="shopping-cart" element={<ShoppingCart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="success" element={<Success />} />
      </Route>
      <Route element={<ProtectedRoutes />}>
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/product-management" element={<ProductManagement />} />
          <Route path="/order-management" element={<OrderManagement />} />
          <Route path="/history" element={<History />} />
          <Route path="/report" element={<Report />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/support" element={<Support />} />
          <Route path="/security" element={<Security />} />
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Routers;
