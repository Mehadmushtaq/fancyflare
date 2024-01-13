import React from "react";
import { Route, Routes as Router } from "react-router-dom";
import { Home } from "../views/home/Home";
import SignUp from "../components/singUp";
import SignIn from "../components/signIn";
import Product from "../views/single-product/Product";
import Cart from "../views/cart/Cart";

const Routes = () => {
  return (
    <Router>
      {/* public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/product" element={<Product />} />

      {/* Protected routes */}
      <Route path="/cart" element={<Cart />} />

      {/* catch all */}
      <Route path="*" element={<p>Missing Route</p>} />
    </Router>
  );
};

export default Routes;
