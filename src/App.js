// src/App.js

import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./views/routes/Routes";
import { Header } from "./views";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
