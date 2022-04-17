import React from "react";
import { Routes, Route } from "react-router-dom";
import { WebLayout } from "../layouts";
import { Home, Products, ProductDetail, ShoppingCart, Login } from "../pages";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<WebLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="shopping-cart" element={<ShoppingCart />} />
        {/*<Route path="checkout" element={<Checkout />} />
        <Route path="checkout-success" element={<CheckoutSuccess />} /> */}
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Routers;
