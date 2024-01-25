// src/App.js

import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Routes from "./routes";
import { Header, Footer } from "./components";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Header />
      <Routes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
