import React from 'react';
import { Route, Routes as Router } from 'react-router-dom';
import {
  Home,
  SignUp,
  SignIn,
  Product,
  Products,
  Cart,
  PageNotFound,
  PrivacyPolicy,
} from '../views';
import { Checkout, RequireAuth, ForgetPassword } from '../components'; //update this
import { Box } from '@mui/material';

const Routes = () => {
  return (
    <Box sx={{ minHeight: '60vh' }}>
      <Router>
        {/* public routes */}
        <Route path='' element={<Home />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='login' element={<SignIn />} />
        <Route path='product/:id' element={<Product />} />
        <Route path='products' element={<Products />} />
        <Route path='products/:category' element={<Products />} />
        <Route path='cart' element={<Cart />} />
        <Route path='forget-password' element={<ForgetPassword />} />

        <Route path='privacy-policy' element={<PrivacyPolicy />} />

        {/* Protected routes */}
        <Route element={<RequireAuth />}>
          <Route path='/checkout' element={<Checkout />} />
          {/* <Route path='/checkout-dummy' element={<CheckoutDummy />} /> */}
        </Route>

        {/* catch all */}
        <Route path='*' element={<PageNotFound />} />
      </Router>
    </Box>
  );
};

export default Routes;
