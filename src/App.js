// src/App.js

import React from "react";
import { Home } from "./views/home/Home";
import { Checkout, SignUp } from "./components";
import SignIn from "./components/signIn/SignIn";
import { Header } from "./views";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <>
      <Header />
      {/* <SignUp /> */}
      <Home />

      {/* FOOTER   */}

      <Footer />

      {/* <Checkout /> */}
    </>
  );
}

export default App;
