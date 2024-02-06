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
      <Route path="" element={<Home />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="login" element={<SignIn />} />
      <Route path="product/:id" element={<Product />} />
      <Route path="products" element={<Products />} />
      <Route path="/cart" element={<Cart />} />

      {/* Protected routes */}
      <Route element={<RequireAuth />}>
        <Route path="/checkout" element={<Checkout />} />
        {/* <Route path="/checkout-dummy" element={<CheckoutDummy />} /> */}
      </Route>

      {/* catch all */}
      <Route path="*" element={<PageNotFound />} />
    </Router>
  );
};

export default Routes;
