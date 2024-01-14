import React from "react";
import { Route, Routes as Router } from "react-router-dom";
import { Home } from "../views/home/Home";
import SignUp from "../views/singUp";
import SignIn from "../views/signIn";
import Product from "../views/single-product/Product";
import Cart from "../views/cart/Cart";
import { Checkout } from "../components/checkout/Checkout";

const Routes = () => {
  return (
    <Router>
      {/* public routes */}
      {/* <Route element={<AuthRedirect />}> */}
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/product" element={<Product />} />
      {/* <Route /> */}

      {/* Protected routes */}
      {/* <Route element={<RequireAuth />}> */}
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout-dummy" element={<Checkout />} />
      {/* <Route /> */}

      {/* catch all */}
      <Route path="*" element={<p>Missing Route</p>} />
    </Router>
  );
};

export default Routes;
