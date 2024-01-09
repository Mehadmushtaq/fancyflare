import React from "react";
import { Route, Routes as Router } from "react-router-dom";
import { Home } from "../home/Home";
import SignUp from "../../components/singUp/SignUp";
import SignIn from "../../components/signIn/SignIn";
import SignInSide from "../../components/LoginAside";

const Routes = () => {
  return (
    <Router>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/login-aside" element={<SignInSide />} />

      <Route path="*" element={<p>Missing Route</p>} />
    </Router>
  );
};

export default Routes;
