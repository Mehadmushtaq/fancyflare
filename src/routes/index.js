import React from "react";
import { Route, Routes as Router } from "react-router-dom";
import {
  Home,
  SignUp,
  SignIn,
  Product,
  Products,
  Cart,
  PageNotFound,
} from "../views";
import { Checkout, AuthRedirect, RequireAuth } from "../components"; //update this

const Routes = () => {
  return (
    <Router>
      {/* public routes */}
      <Route element={<AuthRedirect />}>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/product" element={<Product />} />
        <Route path="/products" element={<Products />} />
      </Route>

      {/* Protected routes */}
      {/* <Route element={<RequireAuth />}> */}
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      {/* <Route path="/checkout-dummy" element={<CheckoutDummy />} /> */}
      {/* </Route> */}

      {/* catch all */}
      <Route path="*" element={<PageNotFound />} />
    </Router>
  );
};

export default Routes;
