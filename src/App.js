// src/App.js

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Routes from './routes';
import { Header, Footer } from './components';
import { AuthContextContainer, CartContextContainer } from './context';

function App() {
  return (
    <BrowserRouter>
      <Toaster position='top-right' />
      <AuthContextContainer>
        <CartContextContainer>
          <Header />
          <Routes />
          <Footer />
        </CartContextContainer>
      </AuthContextContainer>
    </BrowserRouter>
  );
}

export default App;
